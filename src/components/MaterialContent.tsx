// src/components/MaterialContent.tsx
import React, { useMemo, useState, useEffect } from 'react';
import {
  Copy,
  Check,
  WrapText,
  AlignLeft,
  Terminal,
  ExternalLink,
  ChevronRight,
  Info,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MaterialContentProps {
  content: string;
}

type Part = { type: 'text' | 'code'; content: string; language?: string };

// ================= Inline Code Component =================
interface InlineCodeProps extends React.HTMLAttributes<HTMLElement> {
  inline?: boolean;
}

const InlineCode = ({ inline, children, ...rest }: InlineCodeProps) => {
  if (inline) {
    return (
      <code
        {...rest}
        className="inline-flex items-center rounded-md bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-[0.875em] font-mono font-medium text-pink-600 dark:text-pink-400 border border-slate-200 dark:border-slate-700 mx-0.5 align-middle"
      >
        {children}
      </code>
    );
  }
  return <code {...rest}>{children}</code>;
};

export default function MaterialContent({ content }: MaterialContentProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [wrapMap, setWrapMap] = useState<Record<number, boolean>>({});

  useEffect(() => {
    // Optional: Update title dynamically if needed
    // document.title = 'Materi Belajar';
  }, []);

  const parts = useMemo(() => parseContent(content), [content]);

  const copyToClipboard = async (code: string, index: number) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      }
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const toggleWrap = (index: number) =>
    setWrapMap((m) => ({ ...m, [index]: !m[index] }));

  // ================= Markdown Components Config =================
  const mdComponents: Components = {
    // --- Layout Elements ---
    table: ({ children }) => (
      <div className="my-8 w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">{children}</table>
        </div>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
        {children}
      </thead>
    ),
    tbody: ({ children }) => (
      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
        {children}
      </tbody>
    ),
    tr: ({ children }) => (
      <tr className="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/30">
        {children}
      </tr>
    ),
    th: ({ children, ...props }) => (
      <th
        {...props}
        className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100 whitespace-nowrap"
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td {...props} className="px-6 py-4 text-slate-600 dark:text-slate-400">
        {children}
      </td>
    ),

    // --- Typography & Links ---
    a: ({ href, children }) => (
      <a
        href={href as string}
        target="_blank"
        rel="noreferrer noopener"
        className="group inline-flex items-center gap-0.5 font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline decoration-blue-300/50 underline-offset-4 transition-colors"
      >
        {children}
        <ExternalLink className="h-3 w-3 opacity-70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    ),
    h1: ({ children }) => (
      <h1 className="mt-10 mb-6 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="group mt-10 mb-4 flex items-center gap-2 text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
        <span className="hidden lg:block -ml-6 opacity-0 transition-opacity group-hover:opacity-100 text-blue-500">
          #
        </span>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-xl font-bold text-slate-800 dark:text-slate-200">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="my-5 leading-relaxed text-slate-600 dark:text-slate-300 text-base sm:text-lg">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="my-6 space-y-2 pl-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="my-6 list-decimal space-y-2 pl-6 text-slate-600 dark:text-slate-300">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
        <span className="flex-1 leading-relaxed">{children}</span>
      </li>
    ),
    
    // --- Special Components ---
    blockquote: ({ children }) => (
      <blockquote className="my-8 relative overflow-hidden rounded-r-lg border-l-4 border-blue-500 bg-blue-50/50 dark:bg-blue-900/10 p-4 sm:p-6">
        <div className="relative z-10 flex gap-4">
          <Info className="h-6 w-6 flex-shrink-0 text-blue-500 mt-1" />
          <div className="text-slate-700 dark:text-slate-200 italic">
            {children}
          </div>
        </div>
      </blockquote>
    ),
    code: InlineCode,
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 animate-fade-in">
      {parts.map((part, index) => {
        // --- RENDERING CODE BLOCK ---
        if (part.type === 'code') {
          const isWrapped = !!wrapMap[index];
          const lines = part.content.split('\n');
          const language = part.language || 'text';

          return (
            <div
              key={index}
              className="group relative my-8 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-[#0F1117] shadow-xl transition-all hover:shadow-2xl"
            >
              {/* Code Header (Mac Style) */}
              <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
                <div className="flex items-center gap-4">
                  {/* Window Controls Decoration */}
                  <div className="flex gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                  
                  {/* Language Badge */}
                  <div className="flex items-center gap-2 rounded px-2 py-0.5 text-xs font-medium text-slate-400 bg-white/5 border border-white/5 uppercase tracking-wider">
                    <Terminal className="h-3 w-3" />
                    {language}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Wrap Toggle */}
                  <button
                    onClick={() => toggleWrap(index)}
                    className={`flex h-8 items-center gap-2 rounded-lg px-3 text-xs font-medium transition-all ${
                        isWrapped 
                        ? 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/50' 
                        : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
                    }`}
                    title="Toggle Word Wrap"
                  >
                    {isWrapped ? <WrapText className="h-3.5 w-3.5" /> : <AlignLeft className="h-3.5 w-3.5" />}
                    <span className="hidden sm:block">{isWrapped ? 'Wrapped' : 'No Wrap'}</span>
                  </button>

                  {/* Copy Button */}
                  <button
                    onClick={() => copyToClipboard(part.content, index)}
                    className="flex h-8 items-center gap-2 rounded-lg bg-white/5 px-3 text-xs font-medium text-slate-400 transition-all hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-green-400" />
                        <span className="hidden sm:block text-green-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span className="hidden sm:block">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Code Body */}
              <div className="relative overflow-hidden">
                <pre
                  className={`
                    scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700
                    max-h-[600px] overflow-auto p-4 text-[13px] sm:text-sm font-mono leading-6 text-slate-300
                    ${isWrapped ? 'whitespace-pre-wrap break-words' : 'whitespace-pre'}
                  `}
                >
                  <code className="block min-w-full">
                    {lines.map((line, i) => (
                      <div key={i} className="table-row hover:bg-white/5 transition-colors w-full">
                        <span className="table-cell select-none pr-4 text-right text-slate-600 w-[40px] align-top">
                          {i + 1}
                        </span>
                        <span className="table-cell w-full">{line || ' '}</span>
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>
          );
        }

        // --- RENDERING TEXT (Markdown) ---
        return (
          <article
            key={index}
            className="prose prose-slate prose-lg max-w-none dark:prose-invert"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
              {normalizeTables(part.content)}
            </ReactMarkdown>
          </article>
        );
      })}

      {/* Global Styles Injection */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        /* Custom Scrollbar for Code Blocks */
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}

/* ================= Helper Functions ================= */

function parseContent(text: string): Part[] {
  const parts: Part[] = [];
  // Regex untuk menangkap block code ```lang ... ```
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    const [full, lang, code] = match;
    const start = match.index;

    // Push text sebelum code block
    if (start > lastIndex) {
      parts.push({
        type: 'text',
        content: text.substring(lastIndex, start),
      });
    }

    // Push code block
    parts.push({
      type: 'code',
      content: code.replace(/\n$/, ''), // Hapus newline trailing
      language: (lang || 'text').trim(),
    });

    lastIndex = start + full.length;
  }

  // Push sisa text setelah code block terakhir
  if (lastIndex < text.length) {
    parts.push({
      type: 'text',
      content: text.substring(lastIndex),
    });
  }

  return parts;
}

// Fungsi untuk memperbaiki format tabel markdown yang mungkin berantakan spacing-nya
function normalizeTables(src: string): string {
  const lines = src.replace(/\r\n?/g, '\n').split('\n');
  const isPipeRow = (s: string) => s.trim().startsWith('|') || s.trim().endsWith('|');
  
  // Deteksi separator row (e.g., |---|---|)
  const isSeparator = (s: string) => {
    const t = s.trim();
    if (!isPipeRow(t)) return false;
    // Hapus pipa awal/akhir, split, cek isi sel hanya - atau :
    const cells = t.replace(/^\|/, '').replace(/\|$/, '').split('|');
    return cells.length > 0 && cells.every((c) => /^[\s:-]+$/.test(c));
  };

  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (isPipeRow(line)) {
      // Cek apakah ini bagian dari struktur tabel valid (Header + Separator)
      let j = i + 1;
      // Skip empty lines between header and separator (sometimes happens)
      while (j < lines.length && lines[j].trim() === '') j++;

      if (j < lines.length && isSeparator(lines[j])) {
        // Ini adalah tabel valid, push header dan separator
        out.push(lines[i].trim());
        out.push(lines[j].trim());
        j++;

        // Push sisa body tabel
        while (j < lines.length) {
          const t = lines[j].trim();
          if (t === '') { j++; continue; } // skip empty lines inside table structure
          if (!isPipeRow(t)) break; // stop if not a pipe row
          out.push(t);
          j++;
        }
        
        out.push(''); // add spacer after table
        i = j;
        continue;
      }
    }

    out.push(line);
    i++;
  }

  return out.join('\n');
}