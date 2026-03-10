import { useState } from 'react';
import { Plus, Tag, Flag } from 'lucide-react';
import type { Priority } from '../../types/todo';

interface TaskInputProps {
  onAdd: (text: string, priority: Priority, category: string) => void;
  themeColor: string; // App.tsx'den gelen currentTheme.color (örn: bg-emerald-500)
  isDark: boolean;
}

const priorities: { id: Priority; label: string; color: string }[] = [
  { id: 'low', label: 'Düşük', color: 'bg-blue-400' },
  { id: 'medium', label: 'Orta', color: 'bg-yellow-500' },
  { id: 'high', label: 'Yüksek', color: 'bg-red-500' },
];

const categories = ['Genel', 'İş', 'Kişisel', 'Yazılım', 'Alışveriş'];

export const TaskInput = ({ onAdd, themeColor, isDark }: TaskInputProps) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState('Genel');

  const handleAdd = () => {
    if (text.trim()) {
      onAdd(text, priority, category);
      setText(''); // Inputu temizle
      setPriority('medium'); // Önceliği sıfırla
    }
  };

  return (
    <div className={`w-full p-6 rounded-[2.5rem] border transition-all duration-500 shadow-2xl ${
      isDark ? 'bg-slate-800 border-slate-700 shadow-black/20' : 'bg-white border-slate-100 shadow-slate-200'
    }`}>
      <div className="flex flex-col gap-5">
        
        {/* Giriş Alanı ve Ekle Butonu */}
        <div className="relative group">
          <input
            type="text"
            placeholder="Bugün neyi bitireceksin?"
            className={`w-full p-5 pr-16 rounded-2xl outline-none transition-all font-bold text-lg ${
              isDark 
                ? 'bg-slate-700 text-white focus:bg-slate-600 placeholder:text-slate-500' 
                : 'bg-slate-50 text-slate-700 focus:bg-white border-2 border-transparent focus:border-slate-100'
            }`}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />
          <button
            onClick={handleAdd}
            disabled={!text.trim()}
            className={`absolute right-2.5 top-2.5 bottom-2.5 px-5 rounded-xl text-white shadow-lg transition-all active:scale-90 flex items-center justify-center ${
              text.trim() ? `${themeColor} hover:brightness-110` : 'bg-slate-300 cursor-not-allowed'
            }`}
          >
            <Plus size={24} strokeWidth={3} />
          </button>
        </div>

        {/* Seçenekler Paneli */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-1">
          
          {/* Kategori Seçimi (Sola Kaydırılabilir) */}
          <div className="flex items-center gap-2 max-w-full overflow-x-auto pb-1 scrollbar-hide">
            <Tag size={14} className="text-slate-400 flex-shrink-0" />
            <div className="flex gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap border-2 ${
                    category === cat
                      ? `${themeColor} text-white border-transparent shadow-md scale-105`
                      : `${isDark ? 'bg-slate-700 text-slate-400 border-transparent hover:bg-slate-600' : 'bg-slate-100 text-slate-500 border-transparent hover:bg-slate-200'}`
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {/* Kategori butonları */}
            </div>
          </div>

          {/* Öncelik Seçimi */}
          <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-700/50 p-1.5 rounded-2xl border border-transparent dark:border-slate-700">
            <Flag size={14} className="text-slate-400 ml-1" />
            <div className="flex gap-1">
              {priorities.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPriority(p.id)}
                  className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase transition-all ${
                    priority === p.id
                      ? `${p.color} text-white shadow-md scale-105`
                      : 'text-slate-400 hover:text-slate-500'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};