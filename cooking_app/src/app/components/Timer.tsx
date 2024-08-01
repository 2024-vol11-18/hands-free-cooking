import React, { useState, useEffect } from 'react';
import { useTimer } from 'react-timer-hook';

type TimerProps = {
    expiryTimestamp: Date;
};

const Timer: React.FC<TimerProps> = ({ expiryTimestamp }) => {
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({
        expiryTimestamp,
        onExpire: () => console.warn('onExpired called')
    })

    //[] = useState(false)

    const handleClickRestart = () => {
      const time = new Date();
      time.setSeconds(time.getSeconds() + 300);
      restart(time);
    }

    return (
      <div className="flex flex-col items-center">
        <div className="flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
          <div className="text-center">
            <div style={{ fontSize: '30px' }}>
              <span>{String(hours).padStart(2, '0')}</span>:
              <span>{String(minutes).padStart(2, '0')}</span>:
              <span>{String(seconds).padStart(2, '0')}</span>
            </div>
            <p>{isRunning ? 'Running' : 'Not running'}</p>
            <button onClick={start} type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
              スタート
            </button>
            <button onClick={pause} type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
              ストップ
            </button>
            <button onClick={handleClickRestart} type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
              Restart
            </button>
          </div>
        </div>
      </div>
    );
};

export default Timer;
