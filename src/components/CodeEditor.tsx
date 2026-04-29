import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Copy, Check, Terminal } from 'lucide-react';

/**
 * CodeEditor — editor de código interactivo premium estilo glass iOS.
 * Tabs reactivas, line numbers, syntax highlighting básico,
 * efecto de "typing" en cambio de tab y botón copiar.
 */

type Token = { type: TokenType; value: string };
type TokenType =
  | 'keyword'
  | 'string'
  | 'number'
  | 'comment'
  | 'property'
  | 'function'
  | 'punct'
  | 'plain'
  | 'tag';

const KEYWORDS = new Set([
  'const',
  'let',
  'var',
  'function',
  'return',
  'export',
  'import',
  'from',
  'as',
  'interface',
  'type',
  'class',
  'new',
  'extends',
  'public',
  'private',
  'async',
  'await',
  'if',
  'else',
  'true',
  'false',
  'null',
  'undefined',
]);

/** Tokenizador minimalista para mostrar resaltado bonito sin pesar libs. */
function tokenize(line: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  // Línea de comentario
  if (line.trimStart().startsWith('//')) {
    return [{ type: 'comment', value: line }];
  }

  while (i < line.length) {
    const ch = line[i];

    // Espacio
    if (/\s/.test(ch)) {
      let j = i;
      while (j < line.length && /\s/.test(line[j])) j++;
      tokens.push({ type: 'plain', value: line.slice(i, j) });
      i = j;
      continue;
    }

    // Strings
    if (ch === "'" || ch === '"' || ch === '`') {
      const quote = ch;
      let j = i + 1;
      while (j < line.length && line[j] !== quote) {
        if (line[j] === '\\') j++;
        j++;
      }
      tokens.push({ type: 'string', value: line.slice(i, Math.min(j + 1, line.length)) });
      i = Math.min(j + 1, line.length);
      continue;
    }

    // Números
    if (/[0-9]/.test(ch)) {
      let j = i;
      while (j < line.length && /[0-9.]/.test(line[j])) j++;
      tokens.push({ type: 'number', value: line.slice(i, j) });
      i = j;
      continue;
    }

    // Identificadores / keywords / propiedades / funciones
    if (/[A-Za-z_$]/.test(ch)) {
      let j = i;
      while (j < line.length && /[A-Za-z0-9_$]/.test(line[j])) j++;
      const word = line.slice(i, j);
      const next = line[j];
      if (KEYWORDS.has(word)) {
        tokens.push({ type: 'keyword', value: word });
      } else if (next === '(') {
        tokens.push({ type: 'function', value: word });
      } else if (next === ':') {
        tokens.push({ type: 'property', value: word });
      } else {
        // Tipos PascalCase
        if (/^[A-Z]/.test(word)) {
          tokens.push({ type: 'tag', value: word });
        } else {
          tokens.push({ type: 'plain', value: word });
        }
      }
      i = j;
      continue;
    }

    // Puntuación
    if (/[{}()\[\];,.<>+\-*/=:?!|&]/.test(ch)) {
      tokens.push({ type: 'punct', value: ch });
      i++;
      continue;
    }

    tokens.push({ type: 'plain', value: ch });
    i++;
  }

  return tokens;
}

const TOKEN_CLASS: Record<TokenType, string> = {
  keyword: 'text-fuchsia-400',
  string: 'text-emerald-300',
  number: 'text-amber-300',
  comment: 'text-zinc-500 italic',
  property: 'text-sky-300',
  function: 'text-yellow-300',
  punct: 'text-zinc-400',
  plain: 'text-zinc-200',
  tag: 'text-cyan-300',
};

interface Tab {
  id: string;
  filename: string;
  language: string;
  code: string;
}

export const CodeEditor = () => {
  const { t, i18n } = useLanguage();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'es';

  const tabs: Tab[] = useMemo(
    () => [
      {
        id: 'profile',
        filename: 'profile.ts',
        language: 'typescript',
        code:
          lang === 'en'
            ? `// Software Engineer · Full Stack
const lemuel: Engineer = {
  name: "Lemuel Ayala",
  role: "Full Stack Software Engineer",
  location: "Argentina",
  experience: 6,
  available: true,
  passions: ["clean code", "scalable systems", "fluid UX"],
};`
            : `// Ingeniero de Software · Full Stack
const lemuel: Engineer = {
  name: "Lemuel Ayala",
  role: "Ingeniero de Software Full Stack",
  location: "Argentina",
  experience: 6,
  available: true,
  passions: ["código limpio", "sistemas escalables", "UX fluida"],
};`,
      },
      {
        id: 'stack',
        filename: 'stack.ts',
        language: 'typescript',
        code: `export const stack = {
  frontend: ["Angular", "React", "TypeScript", "TailwindCSS"],
  backend: [".NET 8", ".NET Core", "ASP.NET MVC", "Web API"],
  database: ["SQL Server", "Entity Framework", "LINQ", "Dapper"],
  cloud: ["Azure", "Azure DevOps", "Azure Blob Storage"],
  ai: ["Semantic Kernel", "Azure OpenAI"],
  tooling: ["Git", "Docker", "Postman", "CI/CD"],
};`,
      },
      {
        id: 'experience',
        filename: 'experience.ts',
        language: 'typescript',
        code:
          lang === 'en'
            ? `const journey = [
  { company: "CETAP SA", role: "Sr Developer", since: 2024 },
  { company: "ATIO Group", role: "Software Engineer", year: 2024 },
  { company: "13:e Protein Import", role: "Frontend", year: 2023 },
  { company: "Teleperformance", role: "Semi Sr Fullstack", year: 2021 },
  { company: "Openix IT", role: "Mobile/Web Fullstack", year: 2018 },
];

// Clients: YPF · Uber · Mercado Libre · Ficohsa`
            : `const trayectoria = [
  { empresa: "CETAP SA", rol: "Desarrollador Sr", desde: 2024 },
  { empresa: "ATIO Group", rol: "Software Engineer", año: 2024 },
  { empresa: "13:e Protein Import", rol: "Frontend", año: 2023 },
  { empresa: "Teleperformance", rol: "Semi Sr Fullstack", año: 2021 },
  { empresa: "Openix IT", rol: "Mobile/Web Fullstack", año: 2018 },
];

// Clientes: YPF · Uber · Mercado Libre · Ficohsa`,
      },
      {
        id: 'contact',
        filename: 'contact.ts',
        language: 'typescript',
        code:
          lang === 'en'
            ? `async function reachOut(): Promise<Connection> {
  return {
    email: "lemuayala@gmail.com",
    github: "github.com/lemuayala",
    linkedin: "linkedin.com/in/lemuayala",
    open: ["full-time", "freelance", "consulting"],
  };
}

// Let's build something great together.`
            : `async function contactar(): Promise<Conexion> {
  return {
    email: "lemuayala@gmail.com",
    github: "github.com/lemuayala",
    linkedin: "linkedin.com/in/lemuayala",
    abierto: ["full-time", "freelance", "consultoría"],
  };
}

// Construyamos algo grandioso juntos.`,
      },
    ],
    [lang]
  );

  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset copiado al cambiar tab
  useEffect(() => {
    setCopied(false);
  }, [active]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(tabs[active].code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  const lines = tabs[active].code.split('\n');

  return (
    <div
      ref={containerRef}
      className="glass-panel rounded-3xl overflow-hidden shadow-2xl shadow-black/40 border-white/10 dark:border-white/10 relative"
    >
      {/* Reflejo superior */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      {/* Header */}
      <div className="flex items-center gap-4 px-4 sm:px-5 py-3 border-b border-white/5 dark:border-white/5 bg-black/20 backdrop-blur-md">
        {/* Mac dots */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-3 h-3 rounded-full bg-red-400/80 border border-red-500/30" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/80 border border-yellow-500/30" />
          <span className="w-3 h-3 rounded-full bg-green-400/80 border border-green-500/30" />
        </div>

        {/* Tabs */}
        <div className="flex-1 flex items-center gap-1 overflow-x-auto no-scrollbar">
          {tabs.map((tab, idx) => {
            const isActive = idx === active;
            return (
              <button
                key={tab.id}
                onClick={() => setActive(idx)}
                className={`relative shrink-0 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors duration-200 ${
                  isActive
                    ? 'text-white bg-white/10'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400/80" />
                  {tab.filename}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="codeTabIndicator"
                    className="absolute inset-x-2 -bottom-px h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-zinc-500 font-mono">
            <Terminal className="w-3 h-3" /> {tabs[active].language}
          </span>
          <button
            onClick={handleCopy}
            aria-label="Copy code"
            className="flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">
                  {t('codeEditor.copied')}
                </span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {t('codeEditor.copy')}
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code body */}
      <div className="relative bg-zinc-950/60 dark:bg-zinc-950/60 backdrop-blur-md">
        {/* Background grid pattern */}
        <div
          aria-hidden
          className="absolute inset-0 grid-pattern opacity-50 pointer-events-none"
        />

        <AnimatePresence mode="wait">
          <motion.pre
            key={tabs[active].id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative font-mono text-[13px] leading-7 px-2 sm:px-4 py-5 overflow-x-auto"
          >
            <code className="block min-w-max">
              {lines.map((line, idx) => {
                const tokens = tokenize(line);
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-4 group rounded-md px-2 hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="select-none text-zinc-600 text-right w-6 shrink-0 tabular-nums">
                      {idx + 1}
                    </span>
                    <span className="flex-1">
                      {tokens.length === 0 ? (
                        <span>&nbsp;</span>
                      ) : (
                        tokens.map((tok, ti) => (
                          <span key={ti} className={TOKEN_CLASS[tok.type]}>
                            {tok.value}
                          </span>
                        ))
                      )}
                    </span>
                  </div>
                );
              })}

              {/* Cursor */}
              <div className="flex items-start gap-4 px-2">
                <span className="select-none text-zinc-700 text-right w-6 shrink-0 tabular-nums">
                  {lines.length + 1}
                </span>
                <span className="inline-block w-2 h-[18px] -mb-1 bg-blue-400 animate-blink translate-y-1" />
              </div>
            </code>
          </motion.pre>
        </AnimatePresence>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-2 border-t border-white/5 bg-black/30 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {t('codeEditor.ready')}
          </span>
          <span className="hidden sm:inline">UTF-8</span>
          <span className="hidden md:inline">LF</span>
        </div>
        <div className="flex items-center gap-3">
          <span>{tabs[active].filename}</span>
          <span className="hidden sm:inline">{lines.length} {t('codeEditor.lines')}</span>
        </div>
      </div>
    </div>
  );
};
