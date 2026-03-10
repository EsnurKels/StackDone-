import { useState, useRef, useEffect } from 'react';
import { User, Palette, Check, LogOut } from 'lucide-react';
import type { UserProfile, ThemeColor } from '../../types/user';

interface ProfileMenuProps {
  user: UserProfile;
  setUser: (user: UserProfile) => void;
  isDark: boolean;
  themeOptions: any[];
}

export const ProfileMenu = ({ user, setUser, isDark, themeOptions }: ProfileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState(user.name);
  const menuRef = useRef<HTMLDivElement>(null);

  const currentTheme = themeOptions.find(t => t.id === user.theme) || themeOptions[0];

  // Menü dışına tıklandığında kapatma mantığı
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUpdateName = () => {
    if (newName.trim()) {
      setUser({ ...user, name: newName.trim() });
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Profil Butonu (Navbar'daki ikon) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-11 h-11 ${currentTheme.color} text-white rounded-2xl flex items-center justify-center font-black shadow-xl hover:scale-105 transition-all border-2 border-white/10 active:scale-95`}
      >
        {user.name[0]?.toUpperCase()}
      </button>

      {/* Dropdown Menü */}
      {isOpen && (
        <div className={`absolute right-0 mt-4 w-72 rounded-[2rem] shadow-2xl border transition-all z-50 overflow-hidden ${
          isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'
        }`}>
          <div className="p-6 space-y-6">
            {/* Başlık */}
            <div className="flex items-center gap-2 opacity-50 uppercase text-[10px] font-black tracking-[0.2em]">
              <User size={14} />
              <span>Profil Ayarları</span>
            </div>

            {/* İsim Düzenleme */}
            <div className="space-y-2">
            <div className="relative flex items-center"> {/* flex ve items-center eklendi */}
                <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className={`w-full p-4 pr-12 rounded-2xl text-sm font-bold outline-none border-2 transition-all ${
                    isDark ? 'bg-slate-700 border-transparent focus:border-slate-500 text-white' : 'bg-slate-50 border-transparent focus:border-slate-200 text-slate-700'
                }`}
                />
                <button 
                onClick={handleUpdateName}
                className={`absolute right-2 w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-lg transition-all active:scale-90 ${currentTheme.color} hover:brightness-110`}
                >
                <Check size={18} strokeWidth={3} />
                </button>
            </div>
            </div>

            {/* Tema Değiştirme */}
            <div className="space-y-3">
            <div className="flex items-center gap-2 opacity-50 uppercase text-[10px] font-black tracking-[0.2em]">
                <Palette size={14} />
                <span>Renk Teması</span>
            </div>
            
            <div className={`flex justify-between p-3 rounded-2xl ${isDark ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
                {themeOptions.map((opt) => (
                <button
                    key={opt.id}
                    onClick={() => setUser({ ...user, theme: opt.id as ThemeColor })}
                    className={`
                    w-9 h-9 rounded-xl transition-all duration-300 transform shadow-md relative
                    ${opt.color} 
                    /* Onboarding stili: İnce beyaz çerçeve */
                    border-2 border-white/30 
                    ${user.theme === opt.id 
                        ? 'scale-110 z-10 border-white shadow-lg ring-4 ring-white/10' 
                        : 'opacity-70 hover:opacity-100 hover:scale-110'
                    }
                    `}
                    title={opt.name}
                >
                    {/* Seçili olan rengin ortasındaki beyaz nokta */}
                    {user.theme === opt.id && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full shadow-sm" />
                    </div>
                    )}
                </button>
                ))}
            </div>
            </div>

            {/* Çıkış Yap / Sıfırla (Opsiyonel) */}
            <button 
              onClick={() => { if(confirm("Tüm veriler silinecek, emin misiniz?")) { localStorage.clear(); window.location.reload(); } }}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-red-500/10 text-red-500 text-xs font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
            >
              <LogOut size={14} />
              <span>Sıfırla ve Çık</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};