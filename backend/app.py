from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os
from flask_cors import CORS 
from sqlalchemy.exc import OperationalError

# --- Konfigurasi Aplikasi dan Database ---
app = Flask(__name__)
# 1. Pastikan CORS diaktifkan. Vite berjalan di 5173.
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}}) 

# Konfigurasi koneksi MySQL (GANTI DENGAN KREDENSIAL ASLI ANDA)
DB_USER = os.environ.get("DB_USER", "root")
DB_PASS = os.environ.get("DB_PASS", "") 
DB_HOST = os.environ.get("DB_HOST", "localhost")
DB_NAME = os.environ.get("DB_NAME", "newcoreline")

DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASS}@{DB_HOST}/{DB_NAME}"
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# --- Definisi Model SQLAlchemy (User dan Subscription) ---

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.String(255), primary_key=True)
    access_code = db.Column(db.String(255), unique=True, nullable=False)
    user_type = db.Column(db.Enum('student', 'umum', 'pro', 'game'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    username = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    phone = db.Column(db.String(20))
    subscription_type = db.Column(db.Enum('free', 'plus', 'pro'), default='free', nullable=False)
    subscription_period = db.Column(db.Enum('monthly', 'yearly'))
    subscription_start = db.Column(db.DateTime)
    subscription_end = db.Column(db.DateTime)
    subscription_status = db.Column(db.Enum('active', 'expired', 'cancelled'), default='active', nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    last_login = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    subscriptions = db.relationship('Subscription', backref='user', lazy=True)

    def to_dict(self):
        dt_to_iso = lambda dt: dt.isoformat() if dt else None
        return {
            'id': self.id,
            'access_code': self.access_code,
            'user_type': self.user_type,
            'name': self.name,
            'username': self.username,
            'email': self.email,
            'phone': self.phone,
            'subscription_type': self.subscription_type,
            'subscription_period': self.subscription_period,
            'subscription_start': dt_to_iso(self.subscription_start),
            'subscription_end': dt_to_iso(self.subscription_end),
            'subscription_status': self.subscription_status,
            'created_at': dt_to_iso(self.created_at),
            'last_login': dt_to_iso(self.last_login),
        }

class Subscription(db.Model):
    __tablename__ = 'subscriptions'
    id = db.Column(db.String(255), primary_key=True)
    user_id = db.Column(db.String(255), db.ForeignKey('users.id'), nullable=False)
    subscription_type = db.Column(db.Enum('plus', 'pro'), nullable=False)
    period = db.Column(db.Enum('monthly', 'yearly'), nullable=False)
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    currency = db.Column(db.String(10), nullable=False)
    status = db.Column(db.Enum('pending', 'paid', 'failed', 'cancelled'), nullable=False)
    start_date = db.Column(db.DateTime)
    end_date = db.Column(db.DateTime)
    payment_date = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def to_dict(self):
        dt_to_iso = lambda dt: dt.isoformat() if dt else None
        
        return {
            'id': self.id,
            'user_id': self.user_id,
            'subscription_type': self.subscription_type,
            'period': self.period,
            'amount': float(self.amount),
            'currency': self.currency,
            'status': self.status,
            'start_date': dt_to_iso(self.start_date),
            'end_date': dt_to_iso(self.end_date),
            'payment_date': dt_to_iso(self.payment_date),
            'created_at': dt_to_iso(self.created_at),
        }

# --- Endpoint API Pengguna (User) ---

@app.route('/api/users', methods=['GET'])
def get_users():
    """Mengambil semua pengguna."""
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

# --- Endpoint Autentikasi ---

@app.route('/api/auth/login', methods=['POST'])
def login_user():
    """Mencari pengguna berdasarkan access_code."""
    
    # Perbaikan: Menggunakan try-except untuk menangkap error saat parsing JSON
    try:
        data = request.get_json() 
    except Exception as e:
        # Jika request body bukan JSON yang valid
        print(f"ERROR JSON PARSING: {e}")
        return jsonify({"message": "Invalid JSON format"}), 400
        
    if not data or 'access_code' not in data:
        return jsonify({"message": "Access code is required in request body"}), 400
        
    access_code = data.get('access_code')

    # Cari pengguna berdasarkan access_code
    user = User.query.filter_by(access_code=access_code).first()

    if user:
        # Update last_login
        user.last_login = datetime.utcnow()
        db.session.commit()
        # Mengembalikan data pengguna lengkap
        return jsonify(user.to_dict()), 200 
    else:
        # Mengembalikan 401 Unauthorized jika kode tidak ditemukan
        return jsonify({"message": "Invalid access code"}), 401


# --- Menjalankan Aplikasi ---

if __name__ == '__main__':
    with app.app_context():
        print(f"Connecting to DB: {DB_HOST}/{DB_NAME}...")
        try:
            db.create_all()
            print("Database tables created (or already exist).")
        except OperationalError as e:
            print("--- KESALAHAN KONEKSI DATABASE ---")
            print(f"ERROR: Cek layanan MySQL dan kredensial Anda.")
            print(f"Details: {e}")
            print("----------------------------------")
            exit()
        except Exception as e:
            print(f"ERROR: An unexpected error occurred: {e}")
            exit()
            
    app.run(debug=True, port=5000)
