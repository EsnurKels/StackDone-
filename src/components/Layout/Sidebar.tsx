import { ChevronLeft, ChevronRight, ListTodo, BarChart3, ShieldCheck, Timer } from 'lucide-react';

interface SidebarProps {
  activeTab: 'tasks' | 'stats';
  setActiveTab: (tab: 'tasks' | 'stats') => void;
  isDark: boolean;
  themeColor: string;
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
}

export const Sidebar = ({ 
  activeTab, 
  setActiveTab, 
  isDark, 
  themeColor, 
  isCollapsed, 
  setIsCollapsed 
}: SidebarProps) => {
  
  const menuItems = [
    { id: 'tasks', label: 'Yapılacaklar', icon: ListTodo },
    { id: 'pomodoro', label: 'Odaklan (Pomodoro)', icon: Timer },
    { id: 'stats', label: 'Verimlilik', icon: BarChart3 },
  ];

  return (
    <aside className={`fixed left-0 top-0 h-screen border-r transition-all duration-300 z-50 flex flex-col ${
      isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
    } ${isCollapsed ? 'w-20' : 'w-64'}`}>
      
      {/* Daraltma Butonu - Logonun altına, sağ kenara hizalandı */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`absolute -right-3 top-24 w-6 h-6 rounded-full border flex items-center justify-center transition-all z-[60] ${
          isDark ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
        } hover:scale-110 shadow-md`}
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Üst Kısım: Logo */}
      <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} mb-8`}>
        <div className={`min-w-[40px] h-10 rounded-2xl ${themeColor} flex items-center justify-center text-white font-black shadow-lg shadow-current/20`}>
          S
        </div>
        {!isCollapsed && (
          <span className={`font-black text-xl tracking-tighter italic whitespace-nowrap animate-in fade-in duration-300 ${isDark ? 'text-white' : 'text-slate-800'}`}>
            STACKDONE
          </span>
        )}
      </div>

      {/* Orta Kısım: Menü */}
      <nav className="flex-1 px-3 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as any)}
            className={`w-full flex items-center rounded-2xl transition-all group relative ${
              isCollapsed ? 'justify-center p-4' : 'p-4 gap-4'
            } ${
              activeTab === item.id 
                ? `${themeColor} text-white shadow-lg shadow-current/20` 
                : `hover:bg-slate-500/10 ${isDark ? 'text-slate-400' : 'text-slate-500'}`
            }`}
          >
            <item.icon size={22} strokeWidth={activeTab === item.id ? 3 : 2} />
            
            {!isCollapsed && (
              <span className="font-bold text-sm whitespace-nowrap animate-in slide-in-from-left-2 duration-300 text-left flex-1">
                {item.label}
              </span>
            )}

            {/* Tooltip - Sadece Sidebar kapalıyken üzerine gelince çıkar */}
            {isCollapsed && (
              <div className="absolute left-full ml-4 px-3 py-2 bg-slate-800 text-white text-[10px] font-bold rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all translate-x-[-10px] group-hover:translate-x-0 shadow-xl whitespace-nowrap z-50">
                {item.label}
              </div>
            )}
          </button>
        ))}
      </nav>

      {/* Alt Kısım: Versiyon Bilgisi */}
      <div className={`p-6 border-t border-slate-500/10 flex items-center ${isCollapsed ? 'justify-center' : 'gap-2'} opacity-30`}>
        <ShieldCheck size={18} />
        {!isCollapsed && (
          <span className={`text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${isDark ? 'text-white' : 'text-slate-800'}`}>
            V2.1 Stable
          </span>
        )}
      </div>
    </aside>
  );
};