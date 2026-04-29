import { useEffect, useRef, useState } from 'react';

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [text, setText] = useState('');
  const [fadeOut, setFadeOut] = useState(false);
  const onCompleteRef = useRef(onComplete);
  const finishedRef = useRef(false);
  onCompleteRef.current = onComplete;

  const fullText = '<HelloWorld />';

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onCompleteRef.current();
  };

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;

      if (index > fullText.length) {
        clearInterval(interval);
        setTimeout(() => setFadeOut(true), 700);
      }
    }, 70);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!fadeOut) return;
    const backup = window.setTimeout(finish, 650);
    return () => clearTimeout(backup);
  }, [fadeOut]);

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (!fadeOut || e.propertyName !== 'opacity') return;
    finish();
  };

  return (
    <div
      onTransitionEnd={handleTransitionEnd}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-50 text-zinc-900 transition-opacity duration-500 ease-out dark:bg-[#09090b] dark:text-zinc-100 ${
        fadeOut ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[100px]" />

      <div className="relative flex flex-col items-center gap-8">
        <div className="font-mono text-2xl font-bold tracking-tight text-black dark:text-white sm:text-3xl">
          <span>{text}</span>
          <span className="animate-blink ml-1">|</span>
        </div>

        <div className="h-[2px] w-[220px] overflow-hidden rounded-full bg-zinc-200 dark:bg-white/5">
          <div className="animate-loading-bar h-full w-[40%] bg-gradient-to-r from-blue-500 to-purple-500 shadow-[0_0_15px_rgba(96,165,250,0.6)]" />
        </div>
      </div>
    </div>
  );
};
