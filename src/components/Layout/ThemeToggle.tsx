import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

export const ThemeToggle = ({ isDark, setIsDark }: ThemeToggleProps) => {
  return (
    <button 
      onClick={() => setIsDark(!isDark)}
      className={`
        relative p-2.5 rounded-2xl transition-all duration-500 border-2 flex items-center justify-center overflow-hidden
        ${isDark 
          ? 'bg-slate-800 border-slate-700 text-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.2)]' 
          : 'bg-white border-slate-200 text-slate-500 shadow-sm'}
        hover:scale-110 active:scale-95 group
      `}
      title={isDark ? "Aydınlık Mod" : "Karanlık Mod"}
    >
      {/* İkonlar arasında geçiş animasyonu */}
      <div className="relative w-5 h-5">
        <div className={`absolute inset-0 transform transition-all duration-500 ${isDark ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'}`}>
          <Sun size={20} strokeWidth={2.5} />
        </div>
        <div className={`absolute inset-0 transform transition-all duration-500 ${!isDark ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`}>
          <Moon size={20} strokeWidth={2.5} />
        </div>
      </div>
    </button>
  );
};