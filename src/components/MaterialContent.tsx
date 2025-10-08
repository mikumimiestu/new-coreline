import React, { useMemo, useState } from 'react';
import { Copy, Check, WrapText, AlignLeft } from 'lucide-react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MaterialContentProps {
  content: string;
}

type Part = { type: 'text' | 'code'; content: string; language?: string };

export default function MaterialContent({ content }: MaterialContentProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [wrapMap, setWrapMap] = useState<Record<number, boolean>>({});

  const parts = useMemo(() => parseContent(content), [content]);

  const copyToClipboard = async (code: string, index: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1800);
    } catch {
      /* noop */
    }
  };

  const toggleWrap = (index: number) =>
    setWrapMap((m) => ({ ...m, [index]: !m[index] }));

  // --------- Markdown components (typed) ----------
  const mdComponents: Components = {
    table: ({ children }) => (
      <div className="my-4 overflow-x-auto rounded-xl ring-1 ring-black/5 dark:ring-white/10">
        <table className="w-full border-collapse bg-white dark:bg-slate-900">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-gray-100/70 dark:bg-slate-800/80">{children}</thead>
    ),
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => (
      <tr className="border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition">
        {children}
      </tr>
    ),
    th: ({ children, ...props }) => (
      <th
        {...props}
        className="px-4 py-2 text-sm font-semibold text-left [&[align=center]]:text-center [&[align=right]]:text-right"
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td
        {...props}
        className="px-4 py-2 text-sm text-left [&[align=center]]:text-center [&[align=right]]:text-right"
      >
        {children}
      </td>
    ),
    a: ({ href, children }) => (
      <a
        href={href as string}
        className="underline decoration-dotted underline-offset-2 text-blue-600 dark:text-cyan-300 hover:opacity-90"
        target="_blank"
        rel="noreferrer noopener"
      >
        {children}
      </a>
    ),
    code: (props) => {
  const inline = (props as any).inline; // ← solusi universal
  const { children } = props as any;
  if (inline) {
    return (
      <code className="rounded bg-gray-100 dark:bg-slate-800 px-1.5 py-0.5 text-[0.85em] font-mono text-slate-800 dark:text-slate-200">
        {children}
      </code>
    );
  }
  return <code>{children}</code>;
},
  };

  return (
    <div className="space-y-5">
      {parts.map((part, index) => {
        if (part.type === 'code') {
          const isWrapped = !!wrapMap[index];
          const lines = part.content.split('\n');
          return (
            <section
              key={index}
              className="relative group overflow-hidden rounded-2xl ring-1 ring-black/5 dark:ring-white/10"
            >
              {/* Header */}
              <div
                className={`${getLanguageColor(
                  part.language || 'code'
                )} flex items-center justify-between px-3 sm:px-4 py-2`}
              >
                <span className="text-[10px] sm:text-xs font-semibold text-white uppercase tracking-widest">
                  {part.language || 'code'}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => toggleWrap(index)}
                    className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-[10px] sm:text-xs text-white/90 hover:bg-white/15"
                    title={isWrapped ? 'Nonaktifkan bungkus baris' : 'Bungkus baris'}
                  >
                    {isWrapped ? (
                      <AlignLeft className="h-3.5 w-3.5" />
                    ) : (
                      <WrapText className="h-3.5 w-3.5" />
                    )}
                    <span className="hidden sm:inline">{isWrapped ? 'No-wrap' : 'Wrap'}</span>
                  </button>
                  <button
                    onClick={() => copyToClipboard(part.content, index)}
                    className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-[10px] sm:text-xs text-white/90 hover:bg-white/15"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="h-3.5 w-3.5" /> Disalin
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Salin
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Code area */}
              <div className="bg-gray-950 dark:bg-[#0b0f17]">
                <pre
                  className={`relative text-[12.5px] sm:text-sm text-gray-100 font-mono leading-relaxed p-3 sm:p-4 overflow-x-auto ${
                    isWrapped ? 'whitespace-pre-wrap break-words' : 'whitespace-pre'
                  }`}
                >
                  <code>
                    {lines.map((line, i) => (
                      <div key={i} className="tabular-nums">
                        <span className="select-none mr-3 inline-block w-8 text-right text-gray-500 dark:text-slate-500">
                          {i + 1}
                        </span>
                        <span>{line}</span>
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </section>
          );
        }

        // TEXT pakai ReactMarkdown + GFM (tables, checklist, dsb)
        return (
          <article
            key={index}
            className="
              prose prose-slate max-w-none dark:prose-invert prose-headings:scroll-mt-20
              prose-a:text-blue-600 dark:prose-a:text-cyan-300
              prose-strong:text-slate-900 dark:prose-strong:text-white
              prose-code:text-slate-800 dark:prose-code:text-slate-200
              prose-code:bg-slate-100 dark:prose-code:bg-slate-800/80
              prose-li:text-slate-700 dark:prose-li:text-slate-300
              prose-p:text-slate-700 dark:prose-p:text-slate-300
              prose-h1:text-slate-900 dark:prose-h1:text-slate-100
              prose-h2:text-slate-900 dark:prose-h2:text-slate-100
              prose-h3:text-slate-900 dark:prose-h3:text-slate-100
            "
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={mdComponents}
            >
              {normalizeTables(part.content)}
            </ReactMarkdown>
          </article>
        );
      })}
    </div>
  );
}

/* ================= helpers ================= */

function parseContent(text: string): Part[] {
  const parts: Part[] = [];
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: text.substring(lastIndex, match.index) });
    }
    parts.push({
      type: 'code',
      content: match[2].replace(/\n$/, ''),
      language: (match[1] || 'code').trim(),
    });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push({ type: 'text', content: text.substring(lastIndex) });
  return parts;
}

// Normalisasi blok tabel: hapus baris kosong di dalam tabel biar GFM selalu deteksi
function normalizeTables(src: string): string {
  const lines = src.replace(/\r\n?/g, '\n').split('\n');

  const isPipeRow = (s: string) => {
    const t = s.trim();
    return t.includes('|') && /[^|\s]/.test(t.replace(/^\|/, '').replace(/\|$/, ''));
  };
  const isSeparator = (s: string) => {
    const t = s.trim();
    if (!isPipeRow(t)) return false;
    const cells = t.replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());
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
            j++; // skip blank di dalam blok tabel
            continue;
          }
          if (!isPipeRow(t)) break;
          out.push(t);
          j++;
        }
        out.push(''); // spacer sesudah tabel
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
    python: 'bg-[#3572A5]',
    javascript: 'bg-[#f0db4f] text-gray-900',
    typescript: 'bg-[#3178c6]',
    ts: 'bg-[#3178c6]',
    php: 'bg-[#4F5B93]',
    java: 'bg-[#b07219]',
    csharp: 'bg-[#178600]',
    go: 'bg-[#00ADD8]',
    rust: 'bg-[#dea584] text-gray-900',
    html: 'bg-[#e34c26]',
    css: 'bg-[#563d7c]',
    sql: 'bg-[#e38c00]',
    bash: 'bg-[#3e3e3e]',
    shell: 'bg-[#3e3e3e]',
    json: 'bg-gray-800',
    code: 'bg-gray-800',
  };
  return map[language.toLowerCase()] || 'bg-gray-800';
}
