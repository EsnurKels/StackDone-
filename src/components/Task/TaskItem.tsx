import { Check, Trash2, Clock } from 'lucide-react';
import type { Task } from '../../types/todo';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  themeText: string;
  isDark: boolean;
}

export const TaskItem = ({ task, onToggle, onDelete, themeText, isDark }: TaskItemProps) => {
  // Öncelik renklerini belirleyelim
  const priorityColors = {
    low: 'bg-blue-400',
    medium: 'bg-yellow-500',
    high: 'bg-red-500',
  };

    const priorityLabels = {
        low: 'Düşük',
        medium: 'Orta',
        high: 'Yüksek',
    };

  return (
    <div className={`group flex items-center gap-4 p-4 rounded-3xl border transition-all duration-300 ${
      isDark 
        ? 'bg-slate-800 border-slate-700 hover:border-slate-600' 
        : 'bg-white border-slate-100 shadow-sm hover:shadow-md'
    } ${task.completed ? 'opacity-60' : 'opacity-100'}`}>
      
      {/* Tamamlama Butonu (Daire) */}
      <button
        onClick={() => onToggle(task.id)}
        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
          task.completed 
            ? `${themeText.replace('text', 'bg')} border-transparent text-white` 
            : `border-slate-300 dark:border-slate-600 hover:border-slate-400`
        }`}
      >
        {task.completed && <Check size={16} strokeWidth={4} />}
      </button>

      {/* Görev Metni ve Bilgiler */}
      <div className="flex-1 min-w-0">
        <p className={`font-bold text-sm sm:text-base truncate transition-all ${
          task.completed ? 'line-through text-slate-400' : isDark ? 'text-white' : 'text-slate-700'
        }`}>
          {task.text}
        </p>
        
        <div className="flex items-center gap-3 mt-1">
          {/* Kategori Etiketi */}
          <span className={`text-[10px] font-black uppercase tracking-widest opacity-50`}>
            {task.category}
          </span>
          
          {/* Öncelik Noktası */}
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${priorityColors[task.priority]}`} />
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                {priorityLabels[task.priority]}
            </span>
            </div>

          {/* Tarih */}
          <div className="flex items-center gap-1 text-slate-400">
            <Clock size={10} />
            <span className="text-[9px] font-medium">
              {new Date(task.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>

      {/* Silme Butonu */}
      <button
        onClick={() => onDelete(task.id)}
        className="p-2.5 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};