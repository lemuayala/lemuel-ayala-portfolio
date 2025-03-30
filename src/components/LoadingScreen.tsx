import { useEffect, useState } from 'react';

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [text, setText] = useState('');
  const fullText = '<Hello World/>';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;

      if (index > fullText.length) {
        clearInterval(interval);

        setTimeout(() => {
          onComplete();
        }, 1000);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-black text-gray-600 dark:text-gray-100 flex flex-col items-center justify-center">
      <div className="mb-4 text-4xl font-mono font-bold">
        {text} <span className="animate-blink ml-1">|</span>
      </div>
      <div className="w-[200px] h-[2px] bg-amber-50 dark:bg-gray-800 rounded realative overflow-hidden">
        <div className="w-[40%] h-full bg-purple-500/80 dark:bg-blue-500 shadow-[0_0_15px_#3b8] animate-loading-bar"></div>
      </div>
    </div>
  );
};
