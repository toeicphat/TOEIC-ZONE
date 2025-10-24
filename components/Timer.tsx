import React, { useState, useEffect, useRef } from 'react';
import { ClockIcon } from './icons';

interface TimerProps {
  initialTime?: number; // in seconds
  onTimeUp?: () => void;
  isStopwatch?: boolean;
  isRunning?: boolean;
  onTimeUpdate?: (time: number) => void;
}

const Timer: React.FC<TimerProps> = ({ 
    initialTime = 0, 
    onTimeUp, 
    isStopwatch = false, 
    isRunning = true, 
    onTimeUpdate 
}) => {
  const [time, setTime] = useState(isStopwatch ? 0 : initialTime);
  const intervalRef = useRef<number | null>(null);
  
  const onTimeUpRef = useRef(onTimeUp);
  onTimeUpRef.current = onTimeUp;

  const onTimeUpdateRef = useRef(onTimeUpdate);
  onTimeUpdateRef.current = onTimeUpdate;

  useEffect(() => {
    if (!isStopwatch) {
        setTime(initialTime);
    } else {
        setTime(0); // Reset stopwatch if mode changes
    }
  }, [initialTime, isStopwatch]);


  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        if (isStopwatch) {
          setTime(prevTime => {
            const newTime = prevTime + 1;
            if (onTimeUpdateRef.current) {
              onTimeUpdateRef.current(newTime);
            }
            return newTime;
          });
        } else { // Countdown
          setTime(prevTime => {
            if (prevTime <= 1) {
              if (intervalRef.current) clearInterval(intervalRef.current);
              if (onTimeUpRef.current) onTimeUpRef.current();
              return 0;
            }
            return prevTime - 1;
          });
        }
      }, 1000);
    } else {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isStopwatch]);
  
  const timeLeft = time;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center justify-center p-2 rounded-lg">
      <ClockIcon className="h-6 w-6 text-slate-500 dark:text-slate-200" />
      <span className="ml-3 text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-wider">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
};

export default Timer;
