import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getLoadingLogs, getLoadingPhases } from '../utils/i18nContent';

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const finishedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const phases = useMemo(() => getLoadingPhases(t), [t]);
  const logs = useMemo(() => getLoadingLogs(t), [t]);
  const activityTimes = ['1m ago', '8m ago', '2d ago', '1w ago'];
  const mascot = ['  /\\_/\\', ' ( o.o )', '  > ^ <'];

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onCompleteRef.current();
  };

  useEffect(() => {
    const minDuration = 1100;
    const startedAt = Date.now();

    const timer = window.setInterval(() => {
      setProgress((current) => {
        const next = Math.min(current + 1, 100);
        const shown = Math.max(1, Math.ceil((next / 100) * logs.length));
        setVisibleLogs(logs.slice(0, shown));

        if (next >= 100) {
          window.clearInterval(timer);
          const elapsed = Date.now() - startedAt;
          const wait = Math.max(0, minDuration - elapsed);
          window.setTimeout(() => setFadeOut(true), wait + 220);
        }

        return next;
      });
    }, 22);

    return () => clearInterval(timer);
  }, [logs]);

  useEffect(() => {
    if (!fadeOut) return;
    const backup = window.setTimeout(finish, 620);
    return () => clearTimeout(backup);
  }, [fadeOut]);

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (!fadeOut || e.propertyName !== 'opacity') return;
    finish();
  };

  return (
    <div
      onTransitionEnd={handleTransitionEnd}
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#0f1012] px-4 text-zinc-100 transition-opacity duration-500 ease-out ${
        fadeOut ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(244,114,83,0.06),transparent_50%),radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.03),transparent_50%)]" />

      <div className="relative w-full max-w-[860px] overflow-hidden rounded-xl border border-[#3a3a3a] bg-[#17181b] shadow-2xl shadow-black/60">
        <div className="flex h-10 items-center gap-2 border-b border-[#2f3136] bg-[#2a2b2f] px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-[#f97316]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
          <span className="ml-2 font-mono text-[11px] text-[#a1a1aa]">
            Claude Code v2.0.0
          </span>
        </div>

        <div className="p-4 sm:p-6">
          <div className="rounded-md border border-dashed border-[#f97316]/45 p-4">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_1.25fr]">
              <div className="space-y-3 font-mono">
                <p className="text-sm text-[#f3f4f6]">Welcome back Lemuel!</p>
                <pre className="text-[#fb923c] text-[13px] leading-4">
{mascot.join('\n')}
                </pre>
                <p className="text-xs text-[#a1a1aa]">Sonnet 4.5 · Max 20x</p>
                <p className="text-xs text-[#71717a]">/home/lemuayala/code/apps</p>
              </div>

              <div className="font-mono">
                <p className="mb-2 text-xs text-[#fb923c]">Recent activity</p>
                <div className="space-y-1.5">
                  {visibleLogs.slice(0, 4).map((line, idx) => (
                    <p key={`${line}-${idx}`} className="text-xs text-[#d4d4d8]">
                      <span className="mr-3 inline-block w-12 text-[#a1a1aa]">
                        {activityTimes[idx]}
                      </span>
                      {line.replace(/^\$\s*/, '')}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-[#f97316]/30 pt-4 font-mono">
              <p className="mb-2 text-xs text-[#fb923c]">What's new</p>
              <div className="space-y-1.5">
                {phases.slice(0, 3).map((phase) => (
                  <p key={phase} className="text-xs text-[#d4d4d8]">
                    {phase}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 h-px w-full bg-[#3f3f46]" />

          <div className="mt-4 font-mono text-sm text-[#e4e4e7]">
            <span className="text-[#a1a1aa]">&gt;</span>{' '}
            <span>
              {visibleLogs[Math.min(visibleLogs.length - 1, logs.length - 1)] ??
                '$ claude-code init portfolio-ui'}
            </span>
            <span className="animate-caret-pulse">_</span>
          </div>

          <p className="mt-3 font-mono text-xs text-[#a1a1aa]">
            Try "edit &lt;filepath&gt; to ..."
          </p>

          <div className="mt-5 flex items-center justify-between font-mono text-[10px] text-[#71717a]">
            <span>{t('loading.title')}</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>

      <div className="sr-only">{t('loading.subtitle')}</div>
    </div>
  );
};
