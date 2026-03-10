import { useEffect, useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Onboarding } from './components/Onboarding/Onboarding';
import { ThemeToggle } from './components/Layout/ThemeToggle';
import { ProfileMenu } from './components/Layout/ProfileMenu';
import { Sidebar } from './components/Layout/Sidebar';
import { StatsCard } from './components/Stats/StatsCard';
import { TaskInput } from './components/Task/TaskInput';
import { TaskItem } from './components/Task/TaskItem';
import { Pomodoro } from './components/Pomodora/Pomodora';
import type { UserProfile, ThemeColor } from './types/user';
import type { Task, Priority } from './types/todo';
import confetti from 'canvas-confetti';
import { Rocket, BarChart3, Timer } from 'lucide-react';

const themeOptions: { id: ThemeColor; color: string; text: string; name: string }[] = [
  { id: 'emerald', color: 'bg-emerald-500', text: 'text-emerald-600', name: 'Zümrüt' },
  { id: 'ocean', color: 'bg-sky-500', text: 'text-sky-600', name: 'Okyanus' },
  { id: 'sunset', color: 'bg-orange-500', text: 'text-orange-600', name: 'Gün Batımı' },
  { id: 'royal', color: 'bg-purple-500', text: 'text-purple-600', name: 'Asil' },
  { id: 'slate', color: 'bg-slate-700', text: 'text-slate-700', name: 'Modern' },
];

function App() {
  const [user, setUser] = useLocalStorage<UserProfile>('stackdone-user', {
    name: '', theme: 'emerald', isRegistered: false
  });
  const [tasks, setTasks] = useLocalStorage<Task[]>('stackdone-tasks', []);
  const [isDark, setIsDark] = useLocalStorage('stackdone-dark', false);
  const [activeTab, setActiveTab] = useState<'tasks' | 'stats' | 'pomodoro'>('tasks');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    isDark ? root.classList.add('dark') : root.classList.remove('dark');
  }, [isDark]);

  const currentTheme = themeOptions.find(t => t.id === user.theme) || themeOptions[0];

  const triggerConfetti = () => {
    confetti({
      particleCount: 100, spread: 70, origin: { y: 0.6 },
      colors: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']
    });
  };

  const playSuccessSound = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {});
  };

  const addTask = (text: string, priority: Priority, category: string) => {
    const newTask: Task = { 
      id: crypto.randomUUID(), 
      text, 
      completed: false, 
      priority, 
      category, 
      createdAt: Date.now() 
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        if (!t.completed) { playSuccessSound(); triggerConfetti(); }
        return { ...t, completed: !t.completed };
      }
      return t;
    }));
  };

  const deleteTask = (id: string) => setTasks(tasks.filter(t => t.id !== id));

  if (!user.isRegistered) return <Onboarding user={user} setUser={setUser} isDark={isDark} setIsDark={setIsDark} />;

  return (
<div className={`h-screen w-screen flex overflow-hidden transition-colors duration-500 ${isDark ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>      
      <Sidebar 
        activeTab={activeTab as any} 
        setActiveTab={setActiveTab as any} 
        isDark={isDark} 
        themeColor={currentTheme.color}
        isCollapsed={isSidebarCollapsed} 
        setIsCollapsed={setIsSidebarCollapsed}
      />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} h-full overflow-hidden`}>
        {/* NAVBAR */}
        <nav className={`h-[70px] border-b flex justify-between items-center px-8 z-40 backdrop-blur-md ${
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-100'
        }`}>
          <h1 className={`font-black text-xl tracking-tighter italic uppercase flex items-center gap-3 ${isDark ? 'text-white' : 'text-slate-800'}`}>
            {activeTab === 'tasks' && <><Rocket size={22} className={currentTheme.text} /> <span>Yapılacaklar</span></>}
            {activeTab === 'pomodoro' && <><Timer size={22} className={currentTheme.text} /> <span>Odaklan</span></>}
            {activeTab === 'stats' && <><BarChart3 size={22} className={currentTheme.text} /> <span>Verimlilik</span></>}
          </h1>
          <div className="flex items-center gap-5">
            <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
            <ProfileMenu user={user} setUser={setUser} isDark={isDark} themeOptions={themeOptions} />
          </div>
        </nav>

        {/* ANA İÇERİK */}
        <main className="flex-1 p-6 overflow-hidden flex flex-col items-center">
          {activeTab === 'tasks' ? (
            <div className="w-full max-w-3xl h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
              <header className="mb-6">
                <h2 className={`text-3xl font-black mb-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  Merhaba, <span className={currentTheme.text}>{user.name}!</span>
                </h2>
                <p className="opacity-60 font-medium italic text-sm">Bugün neleri tamamlıyoruz?</p>
              </header>
              
              <div className="mb-6">
                <TaskInput onAdd={addTask} themeColor={currentTheme.color} isDark={isDark} />
              </div>

              {/* GÖREV LİSTESİ - Kaydırma burada aktif */}
              <div className="flex-1 overflow-y-auto pr-2 space-y-3 pb-10 custom-scrollbar">
                {[...tasks].sort((a,b) => a.completed === b.completed ? b.createdAt - a.createdAt : (a.completed ? 1 : -1))
                  .map(t => (
                    <TaskItem 
                      key={t.id} 
                      task={t} 
                      onToggle={toggleTask} 
                      onDelete={deleteTask} 
                      themeText={currentTheme.text} 
                      isDark={isDark} 
                    />
                  ))}
                {tasks.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-40 opacity-20 italic">
                    <Rocket size={48} className="mb-2" />
                    <p>Henüz bir görev eklenmemiş...</p>
                  </div>
                )}
              </div>
            </div>
          ) : activeTab === 'pomodoro' ? (
            <div className="flex-1 w-full flex items-center justify-center animate-in fade-in zoom-in duration-500">
               <Pomodoro isDark={isDark} themeColor={currentTheme.color} />
            </div>
          ) : (
            <div className="w-full max-w-4xl h-full overflow-y-auto pr-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <StatsCard tasks={tasks} isDark={isDark} themeColor={currentTheme.color} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;