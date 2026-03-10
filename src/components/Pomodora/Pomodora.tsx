import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, Target, Bell } from 'lucide-react';

export const Pomodoro = ({ isDark, themeColor }: { isDark: boolean, themeColor: string }) => {
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [isActive, setIsActive] = useState(false);
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [timeLeft, setTimeLeft] = useState(workTime * 60);

  const totalTime = mode === 'work' ? workTime * 60 : breakTime * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      const nextMode = mode === 'work' ? 'break' : 'work';
      setMode(nextMode);
      setTimeLeft((nextMode === 'work' ? workTime : breakTime) * 60);
      setIsActive(false);
      new Audio('https://assets.mixkit.co/active_storage/sfx/951/951-preview.mp3').play().catch(() => {});
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, workTime, breakTime]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleReset = () => {
    setIsActive(false);
    setMode('work');
    setTimeLeft(workTime * 60);
  };

  return (
    <div className="flex flex-col items-center justify-between w-full h-full max-w-md mx-auto py-2 overflow-hidden">
      
      {/* MOD ETİKETİ */}
      <div className="flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-500/10">
        {mode === 'work' ? <Target size={12} className="text-emerald-500" /> : <Coffee size={12} className="text-orange-500" />}
        <span className={mode === 'work' ? 'text-emerald-500' : 'text-orange-500'}>
          {mode === 'work' ? 'Focus Session' : 'Break'}
        </span>
      </div>

      {/* SAYAÇ DAİRESİ - Esnek Yükseklik */}
      <div className="relative flex items-center justify-center flex-1 w-full min-h-0 scale-90">
        <svg className="h-full max-h-[300px] aspect-square transform -rotate-90">
          <circle cx="50%" cy="50%" r="42%" stroke="currentColor" strokeWidth="6" fill="transparent" className={isDark ? 'text-slate-800' : 'text-slate-100'} />
          <circle 
            cx="50%" cy="50%" r="42%" 
            stroke="currentColor" 
            strokeWidth="8" 
            fill="transparent" 
            strokeDasharray="800" 
            strokeDashoffset={800 - (800 * progress) / 100} 
            strokeLinecap="round" 
            className={`transition-all duration-1000 ${mode === 'work' ? themeColor.replace('bg-', 'text-') : 'text-orange-500'}`} 
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className={`text-6xl font-black tabular-nums tracking-tighter ${isDark ? 'text-white' : 'text-slate-800'}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* ALT PANEL (Butonlar + Ayarlar) */}
      <div className="w-full space-y-6">
        <div className="flex items-center justify-center gap-6">
          <button onClick={handleReset} className="p-3 rounded-2xl border border-slate-700/50 text-slate-500 hover:text-white transition-all"><RotateCcw size={20} /></button>
          <button 
            onClick={() => setIsActive(!isActive)} 
            className={`w-16 h-16 rounded-[2rem] flex items-center justify-center text-white shadow-xl transition-all active:scale-95 ${mode === 'work' ? themeColor : 'bg-orange-500'}`}
          >
            {isActive ? <Pause size={28} fill="white" /> : <Play size={28} fill="white" className="ml-1" />}
          </button>
          <button className="p-3 rounded-2xl border border-slate-700/50 text-slate-500"><Bell size={20} /></button>
        </div>

        <div className={`grid grid-cols-2 gap-4 w-full p-4 rounded-[2.5rem] border ${isDark ? 'bg-slate-800/40 border-slate-700/50' : 'bg-white border-slate-100 shadow-sm'}`}>
          <TimeAdjuster 
            label="FOCUS" 
            value={workTime} 
            onChange={(v: number) => { setWorkTime(v); if(!isActive && mode === 'work') setTimeLeft(v * 60); }} 
            isDark={isDark} 
          />
          <TimeAdjuster 
            label="BREAK" 
            value={breakTime} 
            onChange={(v: number) => { setBreakTime(v); if(!isActive && mode === 'break') setTimeLeft(v * 60); }} 
            isDark={isDark} 
          />
        </div>
      </div>
    </div>
  );
};

const TimeAdjuster = ({ label, value, onChange, isDark }: any) => (
  <div className="flex flex-col items-center gap-2">
    <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{label}</span>
    <div className="flex items-center gap-4">
      <button onClick={() => onChange(Math.max(1, value - 1))} className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold border ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>-</button>
      <span className="text-lg font-black w-6 text-center">{value}</span>
      <button onClick={() => onChange(Math.min(60, value + 1))} className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold border ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>+</button>
    </div>
  </div>
);