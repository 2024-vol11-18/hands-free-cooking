import React, { useState, useEffect } from 'react';

const Timer = ({
  handleStart,
  handleStop,
  handleRestart,
  hours,
  minutes,
  seconds,
  isRunning
}: {
  handleStart: any,
  handleStop: any,
  handleRestart: any,
  hours: number
  minutes: number
  seconds: number
  isRunning: boolean
}) => {
    const [timerMinutes, setTimerMinutes] = useState(3)
    return (
      <div className="flex flex-col items-center">
        <div className="flex flex-col bg-xanthous border border-babypowder shadow-sm rounded-xl p-4 md:p-5 ">
          <div className="text-center">
            <div style={{ fontSize: '30px' }} className="text-smokyblack">
              <span>{String(hours).padStart(2, '0')}</span>:
              <span>{String(minutes).padStart(2, '0')}</span>:
              <span>{String(seconds).padStart(2, '0')}</span>
            </div>
            <p>{isRunning ? 'Running' : 'Not running'}</p>
            <button onClick={handleStop} type="button" className="mx-2 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-full bg-princetonorange text-babypowder shadow-sm hover:orangewheel focus:outline-none focus:orangewheel disabled:opacity-50 disabled:pointer-events-none">
              ストップ
            </button>
            <button onClick={handleStart} type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-full bg-princetonorange text-babypowder shadow-sm hover:orangewheel focus:outline-none focus:orangewheel disabled:opacity-50 disabled:pointer-events-none">
              スタート
            </button>
            {/* <button onClick={() => handleRestart(timerMinutes)} type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
              リスタート
            </button> */}
          </div>
        </div>
      </div>
    );
};

export default Timer;
