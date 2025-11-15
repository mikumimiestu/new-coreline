// src/components/MaterialContent.tsx
import React, { useMemo, useState, useEffect } from 'react';
import {
  Copy,
  Check,
  WrapText,
  AlignLeft,
  Sparkles,
  Code2,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MaterialContentProps {
  content: string;
}

type Part = { type: 'text' | 'code'; content: string; language?: string };

// ================= Inline code component (FIX TS error) =================
interface InlineCodeProps extends React.HTMLAttributes<HTMLElement> {
  inline?: boolean;
}

const InlineCode = ({ inline, children, ...rest }: InlineCodeProps) => {
  if (inline) {
    return (
      <code
        {...rest}
        className="relative inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-700 px-2 py-1 text-[0.875em] font-mono font-semibold text-slate-800 dark:text-slate-200 ring-1 ring-gray-300/50 dark:ring-slate-600/50 shadow-sm transition-all hover:scale-105 hover:shadow-md"
      >
        {children}
      </code>
    );
  }

  return (
    <code
      {...rest}
      className="font-mono text-[0.9em] bg-slate-900/80 text-slate-100 rounded-md px-1.5 py-0.5"
    >
      {children}
    </code>
  );
};

export default function MaterialContent({ content }: MaterialContentProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [wrapMap, setWrapMap] = useState<Record<number, boolean>>({});

  useEffect(() => {
    document.title = 'Materi | New Coreline by AstByte';
  }, []);

  const parts = useMemo(() => parseContent(content), [content]);

  const copyToClipboard = async (code: string, index: number) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 1800);
      }
    } catch {
      // noop
    }
  };

  const toggleWrap = (index: number) =>
    setWrapMap((m) => ({ ...m, [index]: !m[index] }));

  // --------- Markdown components ----------
  const mdComponents: Components = {
    table: ({ children }) => (
      <div className="animate-fade-in my-6 overflow-hidden rounded-xl ring-2 ring-gray-200/80 dark:ring-slate-700/80 shadow-xl transition-all hover:shadow-2xl hover:ring-blue-500/50 dark:hover:ring-cyan-400/50">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white dark:bg-slate-900">
            {children}
          </table>
        </div>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 dark:from-slate-800 dark:via-slate-800/80 dark:to-slate-800">
        {children}
      </thead>
    ),
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => (
      <tr className="border-b border-gray-200 dark:border-slate-700 transition-all hover:bg-blue-50/50 dark:hover:bg-slate-800/80 hover:scale-[1.01]">
        {children}
      </tr>
    ),
    th: ({ children, ...props }) => (
      <th
        {...props}
        className="px-5 py-3 text-sm font-bold text-gray-800 dark:text-white text-left [&[align=center]]:text-center [&[align=right]]:text-right"
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td
        {...props}
        className="px-5 py-3 text-sm text-gray-700 dark:text-slate-300 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
      >
        {children}
      </td>
    ),
    a: ({ href, children }) => (
      <a
        href={href as string}
        className="group relative inline-flex items-center gap-1 underline decoration-2 decoration-blue-400/50 underline-offset-2 text-blue-600 dark:text-cyan-300 transition-all hover:decoration-blue-600 dark:hover:decoration-cyan-400 hover:scale-105"
        target="_blank"
        rel="noreferrer noopener"
      >
        {children}
        <Sparkles className="inline h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100 group-hover:animate-pulse" />
      </a>
    ),
    code: InlineCode,
    h1: ({ children }) => (
      <h1 className="animate-fade-in group relative mt-8 mb-4 text-4xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3">
          <Sparkles className="h-5 w-5 text-white" />
        </span>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="animate-fade-in group relative mt-6 mb-3 text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg transition-all group-hover:w-3" />
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="animate-fade-in mt-5 mb-2 text-2xl font-bold text-gray-800 dark:text-white">
        {children}
      </h3>
    ),
    ul: ({ children }) => <ul className="space-y-2 my-4">{children}</ul>,
    ol: ({ children }) => (
      <ol className="space-y-2 my-4 list-decimal list-inside">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="animate-fade-in group flex items-start gap-3 text-slate-700 dark:text-slate-300 transition-all hover:translate-x-1">
        <span className="mt-2 flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg transition-all group-hover:h-2 group-hover:w-2" />
        <span className="flex-1">{children}</span>
      </li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="animate-fade-in my-6 border-l-4 border-blue-500 dark:border-cyan-400 bg-blue-50/50 dark:bg-slate-800/50 rounded-r-xl p-5 shadow-lg ring-1 ring-blue-200/50 dark:ring-cyan-800/50 transition-all hover:shadow-xl hover:scale-[1.01]">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-cyan-400" />
          <div className="flex-1 text-gray-700 dark:text-slate-300 font-medium">
            {children}
          </div>
        </div>
      </blockquote>
    ),
    p: ({ children }) => (
      <p className="animate-fade-in my-4 text-slate-700 dark:text-slate-300 leading-relaxed">
        {children}
      </p>
    ),
  };

  return (
    <div className="space-y-6 pb-4 sm:pb-6">
      {parts.map((part, index) => {
        if (part.type === 'code') {
          const isWrapped = !!wrapMap[index];
          const lines = part.content.split('\n');

          return (
            <section
              key={index}
              style={{ animationDelay: `${index * 50}ms` }}
              className="animate-slide-in-up group relative overflow-hidden rounded-2xl ring-2 ring-black/10 dark:ring-white/10 shadow-xl transition-all duration-300 hover:shadow-2xl hover:ring-blue-500/50 dark:hover:ring-cyan-400/50 hover:scale-[1.01]"
            >
              {/* Gradient overlay on hover */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/0 via-cyan-500/0 to-blue-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-10" />

              {/* Header */}
              <div
                className={`${getLanguageColor(
                  part.language || 'code'
                )} relative flex items-center justify-between px-4 sm:px-5 py-3 backdrop-blur-sm`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 shadow-lg backdrop-blur-sm transition-transform group-hover:scale-110 group-hover:rotate-3">
                    <Code2 className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <span className="block text-xs sm:text-sm font-bold text-white uppercase tracking-widest">
                      {part.language || 'code'}
                    </span>
                    <span className="text-[10px] text-white/70">
                      {lines.length} baris
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleWrap(index)}
                    className="group/btn inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90 ring-1 ring-white/20 transition-all hover:bg-white/20 hover:scale-105 hover:shadow-lg backdrop-blur-sm"
                    title={isWrapped ? 'Nonaktifkan bungkus baris' : 'Bungkus baris'}
                  >
                    {isWrapped ? (
                      <AlignLeft className="h-4 w-4 transition-transform group-hover/btn:rotate-12" />
                    ) : (
                      <WrapText className="h-4 w-4 transition-transform group-hover/btn:rotate-12" />
                    )}
                    <span className="hidden sm:inline">
                      {isWrapped ? 'No-wrap' : 'Wrap'}
                    </span>
                  </button>
                  <button
                    onClick={() => copyToClipboard(part.content, index)}
                    className="group/btn inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90 ring-1 ring-white/20 transition-all hover:bg-white/20 hover:scale-105 hover:shadow-lg backdrop-blur-sm"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="h-4 w-4 animate-bounce-in" />
                        <span className="hidden sm:inline">Disalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
                        <span className="hidden sm:inline">Salin</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Code area */}
              <div className="relative bg-[#0d1117] dark:bg-[#0b0f17]">
                {/* Subtle gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />

                <pre
                  className={`relative text-[13px] sm:text-[14px] text-gray-100 font-mono leading-relaxed p-4 sm:p-5 overflow-x-auto ${
                    isWrapped ? 'whitespace-pre-wrap break-words' : 'whitespace-pre'
                  }`}
                >
                  <code>
                    {lines.map((line, i) => (
                      <div
                        key={i}
                        style={{ animationDelay: `${i * 20}ms` }}
                        className="animate-fade-in-left group/line tabular-nums transition-all hover:bg-white/5"
                      >
                        <span className="select-none mr-4 inline-block w-10 text-right text-gray-500 dark:text-slate-600 font-semibold transition-colors group-hover/line:text-blue-400 dark:group-hover/line:text-cyan-400">
                          {i + 1}
                        </span>
                        <span className="transition-all group-hover/line:text-white">
                          {line || ' '}
                        </span>
                      </div>
                    ))}
                  </code>
                </pre>
              </div>

              {/* Bottom gradient bar */}
              <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 opacity-50 transition-opacity group-hover:opacity-100" />
            </section>
          );
        }

        // TEXT pakai ReactMarkdown + GFM
        return (
          <article
            key={index}
            style={{ animationDelay: `${index * 50}ms` }}
            className="
              animate-fade-in
              prose prose-slate max-w-none dark:prose-invert prose-headings:scroll-mt-20
              prose-a:text-blue-600 dark:prose-a:text-cyan-300
              prose-strong:font-bold prose-strong:text-slate-900 dark:prose-strong:text-white
              prose-code:text-slate-800 dark:prose-code:text-slate-200
              prose-code:bg-slate-100 dark:prose-code:bg-slate-800/80
              prose-li:text-slate-700 dark:prose-li:text-slate-300
              prose-p:text-slate-700 dark:prose-p:text-slate-300
              prose-h1:text-slate-900 dark:prose-h1:text-slate-100
              prose-h2:text-slate-900 dark:prose-h2:text-slate-100
              prose-h3:text-slate-900 dark:prose-h3:text-slate-100
            "
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
              {normalizeTables(part.content)}
            </ReactMarkdown>
          </article>
        );
      })}

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-in-left {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slide-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.3); }
          50% { transform: scale(1.1); }
          70% { transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-fade-in-left {
          animation: fade-in-left 0.3s ease-out;
        }
        .animate-slide-in-up {
          animation: slide-in-up 0.6s ease-out;
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        html {
          scroll-behavior: smooth;
        }

        /* scrollbar di dalam code block saja */
        pre::-webkit-scrollbar {
          height: 8px;
        }
        pre::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.2);
          border-radius: 4px;
        }
        pre::-webkit-scrollbar-thumb {
          background: linear-gradient(to right, #3b82f6, #06b6d4);
          border-radius: 4px;
        }
        pre::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to right, #2563eb, #0891b2);
        }
      `}</style>
    </div>
  );
}

/* ================= helpers ================= */

function parseContent(text: string): Part[] {
  const parts: Part[] = [];
  // Pattern: ```lang\n ...code... \n```
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    const [full, lang, code] = match;
    const start = match.index;

    if (start > lastIndex) {
      parts.push({
        type: 'text',
        content: text.substring(lastIndex, start),
      });
    }

    parts.push({
      type: 'code',
      content: code.replace(/\n$/, ''),
      language: (lang || 'code').trim(),
    });

    lastIndex = start + full.length;
  }

  if (lastIndex < text.length) {
    parts.push({
      type: 'text',
      content: text.substring(lastIndex),
    });
  }

  return parts;
}

function normalizeTables(src: string): string {
  const lines = src.replace(/\r\n?/g, '\n').split('\n');

  const isPipeRow = (s: string) => {
    const t = s.trim();
    return t.includes('|') && /[^|\s]/.test(t.replace(/^\|/, '').replace(/\|$/, ''));
  };
  const isSeparator = (s: string) => {
    const t = s.trim();
    if (!isPipeRow(t)) return false;
    const cells = t
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((c) => c.trim());
    return cells.length > 0 && cells.every((c) => /^:?-{3,}:?$/.test(c));
  };

  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (isPipeRow(line)) {
      let j = i + 1;
      while (j < lines.length && lines[j].trim() === '') j++;

      if (j < lines.length && isSeparator(lines[j])) {
        out.push(lines[i].trim());
        out.push(lines[j].trim());
        j++;

        while (j < lines.length) {
          const t = lines[j].trim();
          if (t === '') {
            j++;
            continue;
          }
          if (!isPipeRow(t)) break;
          out.push(t);
          j++;
        }

        out.push('');
        i = j;
        continue;
      }
    }

    out.push(line);
    i++;
  }

  return out.join('\n');
}

function getLanguageColor(language: string) {
  const map: Record<string, string> = {
    python: 'bg-gradient-to-r from-[#306998] to-[#FFD43B]',
    javascript: 'bg-gradient-to-r from-[#f0db4f] to-[#f7df1e] text-gray-900',
    typescript: 'bg-gradient-to-r from-[#3178c6] to-[#235a97]',
    ts: 'bg-gradient-to-r from-[#3178c6] to-[#235a97]',
    php: 'bg-gradient-to-r from-[#4F5B93] to-[#8892BF]',
    java: 'bg-gradient-to-r from-[#b07219] to-[#EA2D2E]',
    csharp: 'bg-gradient-to-r from-[#178600] to-[#239120]',
    go: 'bg-gradient-to-r from-[#00ADD8] to-[#00A29C]',
    rust: 'bg-gradient-to-r from-[#dea584] to-[#CE412B] text-gray-900',
    html: 'bg-gradient-to-r from-[#e34c26] to-[#f06529]',
    css: 'bg-gradient-to-r from-[#563d7c] to-[#264de4]',
    sql: 'bg-gradient-to-r from-[#e38c00] to-[#f29111]',
    bash: 'bg-gradient-to-r from-[#293138] to-[#4EAA25]',
    shell: 'bg-gradient-to-r from-[#293138] to-[#4EAA25]',
    json: 'bg-gradient-to-r from-gray-700 to-gray-900',
    code: 'bg-gradient-to-r from-gray-700 to-gray-900',
  };

  return map[language.toLowerCase()] || 'bg-gradient-to-r from-gray-700 to-gray-900';
}