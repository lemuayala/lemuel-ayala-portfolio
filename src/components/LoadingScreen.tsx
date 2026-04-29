import { useEffect, useState } from 'react';

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [text, setText] = useState('');
  const fullText = '<HelloWorld />';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;

      if (index > fullText.length) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 700);
      }
    }, 70);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 flex flex-col items-center justify-center">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-blue-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] rounded-full bg-purple-500/10 blur-[100px]" />

      <div className="relative flex flex-col items-center gap-8">
        <div className="font-mono text-2xl sm:text-3xl font-bold tracking-tight">
          <span className="text-gradient">{text}</span>
          <span className="animate-blink ml-1 text-blue-500 dark:text-blue-400">
            |
          </span>
        </div>

        <div className="w-[220px] h-[2px] bg-zinc-200 dark:bg-white/5 rounded-full overflow-hidden">
          <div className="w-[40%] h-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-[0_0_15px_rgba(96,165,250,0.6)] animate-loading-bar" />
        </div>
      </div>
    </div>
  );
};
