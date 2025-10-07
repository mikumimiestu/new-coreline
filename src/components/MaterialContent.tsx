import { Copy, Check, WrapText, AlignLeft } from 'lucide-react';
import { useMemo, useState } from 'react';

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
      // noop
    }
  };

  const toggleWrap = (index: number) =>
    setWrapMap((m) => ({ ...m, [index]: !m[index] }));

  return (
    <div className="space-y-5">
      {parts.map((part, index) => {
        if (part.type === 'code') {
          const isWrapped = !!wrapMap[index];
          const lines = part.content.split('\n');
          return (
            <section
              key={index}
              className="relative group overflow-hidden rounded-xl ring-1 ring-black/5 dark:ring-white/10"
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

        // text (markdown-lite) - tuned colors for dark mode
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
            {renderMarkdownLite(part.content)}
          </article>
        );
      })}
    </div>
  );
}

// --- helpers ---
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
      language: match[1] || 'code',
    });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push({ type: 'text', content: text.substring(lastIndex) });
  return parts;
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

// Lightweight markdown renderer with grouping for lists & basic inline styles
function renderMarkdownLite(raw: string) {
  const lines = raw.split('\n');
  const nodes: JSX.Element[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // headings
    if (/^#\s+/.test(line)) {
      nodes.push(
        <h1 key={`h1-${i}`} className="text-2xl sm:text-3xl font-bold mt-6 mb-3">
          {line.replace(/^#\s+/, '')}
        </h1>
      );
      i++;
      continue;
    }
    if (/^##\s+/.test(line)) {
      nodes.push(
        <h2 key={`h2-${i}`} className="text-xl sm:text-2xl font-bold mt-5 mb-3">
          {line.replace(/^##\s+/, '')}
        </h2>
      );
      i++;
      continue;
    }
    if (/^###\s+/.test(line)) {
      nodes.push(
        <h3 key={`h3-${i}`} className="text-lg sm:text-xl font-semibold mt-4 mb-2">
          {line.replace(/^###\s+/, '')}
        </h3>
      );
      i++;
      continue;
    }

    // unordered list block
    if (/^-\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^-\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^-\s+/, ''));
        i++;
      }
      nodes.push(
        <ul key={`ul-${i}`} className="my-2 list-disc pl-6">
          {items.map((it, idx) => (
            <li key={idx} className="leading-relaxed">
              {formatInline(it)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // ordered list block
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ''));
        i++;
      }
      nodes.push(
        <ol key={`ol-${i}`} className="my-2 list-decimal pl-6">
          {items.map((it, idx) => (
            <li key={idx} className="leading-relaxed">
              {formatInline(it)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // blockquote
    if (/^>\s?/.test(line)) {
      const quotes: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quotes.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      nodes.push(
        <blockquote className="border-l-4 border-blue-400/60 dark:border-cyan-400/60 pl-4 italic text-gray-700 dark:text-slate-300">
          {quotes.map((q, idx) => (
            <p key={idx} className="my-1">
              {formatInline(q)}
            </p>
          ))}
        </blockquote>
      );
      continue;
    }

    // horizontal rule
    if (/^---+$/.test(line.trim())) {
      nodes.push(<hr key={`hr-${i}`} className="my-4 border-gray-200 dark:border-slate-700" />);
      i++;
      continue;
    }

    // empty line -> spacer
    if (line.trim() === '') {
      nodes.push(<div key={`sp-${i}`} className="h-2" />);
      i++;
      continue;
    }

    // paragraph
    nodes.push(
      <p key={`p-${i}`} className="text-gray-700 dark:text-slate-300 leading-relaxed">
        {formatInline(line)}
      </p>
    );
    i++;
  }

  return nodes;
}

// Basic inline formatter: `code`, **bold**, *italic*, links [text](url)
function formatInline(text: string) {
  // split by backticks for inline code
  const chunks = text.split(/(`[^`]+`)/g);
  return (
    <>
      {chunks.map((ch, i) => {
        if (/^`[^`]+`$/.test(ch)) {
          return (
            <code
              key={i}
              className="rounded bg-gray-100 dark:bg-slate-800 px-1.5 py-0.5 text-[0.85em] font-mono text-slate-800 dark:text-slate-200"
            >
              {ch.slice(1, -1)}
            </code>
          );
        }
        // links [text](url)
        const linkMatch = ch.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          return (
            <a
              key={i}
              href={linkMatch[2]}
              className="underline decoration-dotted underline-offset-2 text-blue-600 dark:text-cyan-300 hover:opacity-90"
              target="_blank"
              rel="noreferrer noopener"
            >
              {linkMatch[1]}
            </a>
          );
        }
        // bold/italic (very lite)
        let node: JSX.Element | string = ch;
        node = Reactify(node)
          .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
          .replace(/\*([^*]+)\*/g, '<em>$1</em>');
        return <span key={i} dangerouslySetInnerHTML={{ __html: node }} />;
      })}
    </>
  );
}

// helper to keep TS happy when using string replace to HTML
function Reactify(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
