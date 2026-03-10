import { CheckCircle2, PieChart, TrendingUp } from 'lucide-react';
import type { Task } from '../../types/todo';

interface StatsCardProps {
  tasks: Task[];
  isDark: boolean;
  themeColor: string;
}

export const StatsCard = ({ tasks, isDark, themeColor }: StatsCardProps) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {/* Toplam Görev Kartı */}
      <div className={`p-6 rounded-[2rem] border transition-all ${
        isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-sm'
      }`}>
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl ${isDark ? 'bg-slate-700' : 'bg-slate-50'} text-slate-400`}>
            <PieChart size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Toplam</p>
            <p className="text-2xl font-black">{total}</p>
          </div>
        </div>
      </div>

      {/* Tamamlanan Kartı */}
      <div className={`p-6 rounded-[2rem] border transition-all ${
        isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-sm'
      }`}>
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl ${isDark ? 'bg-slate-700' : 'bg-slate-50'} text-emerald-500`}>
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Biten</p>
            <p className="text-2xl font-black">{completed}</p>
          </div>
        </div>
      </div>

      {/* Verimlilik Yüzdesi Kartı */}
      <div className={`p-6 rounded-[2rem] border transition-all ${
        isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-sm'
      }`}>
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl ${themeColor} text-white shadow-lg shadow-current/20`}>
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-40 text-current">Verimlilik</p>
            <p className="text-2xl font-black">%{percentage}</p>
          </div>
        </div>
      </div>
    </div>
  );
};