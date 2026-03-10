import { User } from 'lucide-react';
import { ThemeToggle } from '../Layout/ThemeToggle';
import type { UserProfile, ThemeColor } from '../../types/user';

interface OnboardingProps {
  user: UserProfile;
  setUser: (user: UserProfile) => void;
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

const themeOptions = [
  { id: 'emerald', color: 'bg-emerald-500', hover: 'hover:bg-emerald-600', text: 'text-emerald-600', name: 'Zümrüt' },
  { id: 'ocean', color: 'bg-sky-500', hover: 'hover:bg-sky-600', text: 'text-sky-600', name: 'Okyanus' },
  { id: 'sunset', color: 'bg-orange-500', hover: 'hover:bg-orange-600', text: 'text-orange-600', name: 'Gün Batımı' },
  { id: 'royal', color: 'bg-purple-500', hover: 'hover:bg-purple-600', text: 'text-purple-600', name: 'Asil' },
  { id: 'slate', color: 'bg-slate-700', hover: 'hover:bg-slate-800', text: 'text-slate-700', name: 'Modern' },
];

export const Onboarding = ({ user, setUser, isDark, setIsDark }: OnboardingProps) => {
  const currentTheme = themeOptions.find(t => t.id === user.theme) || themeOptions[0];

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 font-sans transition-colors duration-500 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      
      <div className="fixed top-8 right-8">
        <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
      </div>

      <div className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'} p-10 rounded-[2.5rem] shadow-2xl max-w-md w-full text-center border transition-colors duration-500`}>
        <div className="mb-8">
          <div className={`w-20 h-20 ${currentTheme.color} text-white rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
            <User size={40} strokeWidth={2.5} />
          </div>
          <h1 className={`text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>Hoşgeldiniz</h1>
          <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} mt-2 font-medium`}>Başlamak için profil oluşturunuz.</p>
        </div>
        
        <div className="space-y-6 text-left">
          <div>
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2 mb-2 block">
              Adın veya Takma Adın
            </label>
            <input 
              type="text" 
              placeholder="Örn: Blue..."
              className={`w-full p-4 border-2 border-transparent rounded-2xl outline-none transition-all duration-300 font-bold shadow-sm ${
                isDark ? 'bg-slate-700 text-white focus:border-slate-500' : 'bg-slate-50 text-slate-700 focus:border-slate-200 focus:bg-white'
              }`}
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>

        <div>
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2 mb-3 block">
            Renk Temanı Seç
        </label>
        <div className={`flex justify-between gap-2 p-3 rounded-3xl ${isDark ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
            {themeOptions.map((opt) => (
            <button
                key={opt.id}
                onClick={() => setUser({ ...user, theme: opt.id as ThemeColor })}
                className={`
                w-10 h-10 rounded-xl transition-all duration-300 transform shadow-md relative
                ${opt.color} 
                /* Her zaman ince beyaz bir çerçeve ekliyoruz */
                border-2 border-white/30 
                ${user.theme === opt.id 
                    ? 'scale-125 z-10 border-white shadow-lg ring-4 ring-white/10' 
                    : 'opacity-70 hover:opacity-100 hover:scale-110'
                }
                `}
                title={opt.name}
            >
                {/* Seçili olan rengin ortasına küçük bir beyaz nokta koyarak ekstra netlik sağlayalım */}
                {user.theme === opt.id && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full shadow-sm" />
                </div>
                )}
            </button>
            ))}
        </div>
        </div>

          <button 
            onClick={() => user.name.trim() && setUser({ ...user, isRegistered: true })}
            className={`w-full py-4 rounded-2xl font-bold tracking-widest uppercase text-xs text-white shadow-lg transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 ${
              user.name.trim() ? `${currentTheme.color} ${currentTheme.hover}` : 'bg-slate-300 cursor-not-allowed text-slate-500'
            }`}
            disabled={!user.name.trim()}
          >
            Maceraya Başla
          </button>
        </div>
      </div>
    </div>
  );
};