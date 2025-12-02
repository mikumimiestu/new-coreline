import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

const AUTHX_BASE = 'https://authx.astbyte.com';

// KITA SAMAKAN KEY-NYA SUPAYA SINKRON DENGAN DASHBOARD
const TOKEN_KEY = 'astbyte_token'; 

export interface AuthUser {
  public_id: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
  phone?: string | null;
  is_verified?: boolean;
  phone_verified?: boolean;
  created_at?: string;
  updated_at?: string;

  // =========================
  // Subscription info dari AuthX
  // =========================
  subscription_type?: 'free' | 'pro' | 'plus';
  subscription_period?: 'monthly' | 'yearly' | null;
  subscription_start?: string | null;
  subscription_end?: string | null;
  subscription_status?: 'active' | 'expired' | 'inactive';
  
  // Opsional: simpan token di object user juga untuk backup akses
  token?: string; 
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null; // TAMBAHAN: Kita ekspos token biar bisa dipakai Dashboard
  login: (token: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function fetchMe(token: string): Promise<AuthUser | null> {
  try {
    const res = await fetch(`${AUTHX_BASE}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.error('authx /me error:', data);
      return null;
    }

    const user = data?.data?.user;
    if (!user) return null;

    // Normalisasi info subscription
    const subscription_type = (user.subscription_type ?? 'free') as 'free' | 'pro' | 'plus';
    const subscription_period = (user.subscription_period ?? null) as 'monthly' | 'yearly' | null;
    const subscription_start = (user.subscription_start ?? null) as string | null;
    const subscription_end = (user.subscription_end ?? null) as string | null;
    const subscription_status = (user.subscription_status ?? 'inactive') as 'active' | 'expired' | 'inactive';

    const authUser: AuthUser = {
      public_id: user.public_id,
      full_name: user.full_name || user.name || 'Pengguna Astbyte',
      email: user.email,
      avatar_url: user.avatar_url ?? null,
      phone: user.phone ?? null,
      is_verified: user.is_verified,
      phone_verified: user.phone_verified,
      created_at: user.created_at,
      updated_at: user.updated_at,
      subscription_type,
      subscription_period,
      subscription_start,
      subscription_end,
      subscription_status,
      token: token // Kita selipkan token di sini
    };

    return authUser;
  } catch (err) {
    console.error('fetchMe error:', err);
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null); // State untuk Token
  const [loading, setLoading] = useState(true);

  // Auto-login dari token yang tersimpan
  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      // Ganti key jadi TOKEN_KEY ('astbyte_token')
      const storedToken = localStorage.getItem(TOKEN_KEY); 
      
      if (!storedToken) {
        setLoading(false);
        return;
      }

      const me = await fetchMe(storedToken);
      if (!cancelled) {
        if (me) {
          setUser(me);
          setToken(storedToken); // Set state token
        } else {
          // Token invalid → bersihkan
          localStorage.removeItem(TOKEN_KEY);
          setUser(null);
          setToken(null);
        }
        setLoading(false);
      }
    };

    init();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = async (newToken: string): Promise<boolean> => {
    try {
      const me = await fetchMe(newToken);
      if (!me) {
        return false;
      }

      setUser(me);
      setToken(newToken);
      localStorage.setItem(TOKEN_KEY, newToken); // Simpan dengan key yang benar
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(TOKEN_KEY); // Hapus key yang benar
    // window.location.href = '/login';
  };

  return (
    // Kita passing 'token' juga ke provider
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}