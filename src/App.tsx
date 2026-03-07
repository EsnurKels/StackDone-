import { useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Onboarding } from './components/Onboarding/Onboarding';
import { ThemeToggle } from './components/Layout/ThemeToggle';
import { TaskInput } from './components/Task/TaskInput';
import { TaskItem } from './components/Task/TaskItem'; // Eksik olabilecek import
import type { UserProfile, ThemeColor } from './types/user';
import type { Task, Priority } from './types/todo';

const themeOptions: { id: ThemeColor; color: string; text: string; name: string }[] = [
  { id: 'emerald', color: 'bg-emerald-500', text: 'text-emerald-600', name: 'Zümrüt' },
  { id: 'ocean', color: 'bg-sky-500', text: 'text-sky-600', name: 'Okyanus' },
  { id: 'sunset', color: 'bg-orange-500', text: 'text-orange-600', name: 'Gün Batımı' },
  { id: 'royal', color: 'bg-purple-500', text: 'text-purple-600', name: 'Asil' },
  { id: 'slate', color: 'bg-slate-700', text: 'text-slate-700', name: 'Modern' },
];

function App() {
  const [user, setUser] = useLocalStorage<UserProfile>('stackdone-user', {
    name: '',
    theme: 'emerald',
    isRegistered: false
  });

  const [tasks, setTasks] = useLocalStorage<Task[]>('stackdone-tasks', []);
  const [isDark, setIsDark] = useLocalStorage('stackdone-dark', false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const currentTheme = themeOptions.find(t => t.id === user.theme) || themeOptions[0];

  // --- Fonksiyonlar ---
  const addTask = (text: string, priority: Priority, category: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      priority,
      category,
      createdAt: Date.now(),
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // --- Onboarding Kontrolü ---
  if (!user.isRegistered) {
    return <Onboarding user={user} setUser={setUser} isDark={isDark} setIsDark={setIsDark} />;
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDark ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* NAVBAR */}
      <nav className={`p-4 border-b flex justify-between items-center px-8 sticky top-0 z-40 transition-all duration-500 ${
        isDark ? 'bg-slate-800 border-slate-700 shadow-xl' : 'bg-white border-slate-100 shadow-md'
      }`}>
        <div className="flex items-center gap-2">
          <div className={`w-9 h-9 ${currentTheme.color} rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-${user.theme}-500/20`}>
            S
          </div>
          <h1 className="font-black text-xl tracking-tighter italic hidden sm:block uppercase">STACKDONE</h1>
        </div>

        <div className="flex items-center gap-5">
          <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
          <div className={`flex items-center gap-3 pl-5 border-l ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
             <div className="text-right hidden md:block leading-none">
               <p className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-1">Hesabım</p>
               <p className="text-sm font-bold">{user.name}</p>
             </div>
             <div className={`w-11 h-11 ${currentTheme.color} text-white rounded-2xl flex items-center justify-center font-black shadow-xl hover:scale-105 transition-transform cursor-pointer border-2 border-white/10`}>
               {user.name[0]?.toUpperCase()}
             </div>
          </div>
        </div>
      </nav>

      {/* ANA PANEL */}
      <main className="max-w-3xl mx-auto p-6 pt-12">
        <header className="mb-10 text-center sm:text-left">
          <h2 className={`text-4xl font-black tracking-tight mb-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
            Merhaba, <span className={`${currentTheme.text}`}>{user.name}!</span>
          </h2>
          <p className="opacity-60 font-medium text-lg">Bugün neler bitiriyoruz?</p>
        </header>

        {/* TASK INPUT */}
        <div className="mb-10">
          <TaskInput onAdd={addTask} themeColor={currentTheme.color} isDark={isDark} />
        </div>

        {/* GÖREV LİSTESİ */}
        {tasks.length === 0 ? (
          /* BOŞ DURUM (Empty State) */
          <div className={`p-16 rounded-[3rem] border-4 border-dashed flex flex-col items-center justify-center transition-colors ${
            isDark ? 'border-slate-800 text-slate-700' : 'border-slate-100 text-slate-300'
          }`}>
             <p className="font-bold text-xl italic tracking-widest uppercase opacity-30 text-center">
               StackDone ile fark yarat... <br />
               <span className="text-sm normal-case text-slate-400">İlk görevini yukarıdan ekleyebilirsin.</span>
             </p>
          </div>
        ) : (
          /* LİSTE DURUMU */
          <div className="space-y-3 pb-20">
            {tasks.map((task) => (
              <TaskItem 
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                themeText={currentTheme.text}
                isDark={isDark}
              />
            ))}
            
            <p className="text-center mt-8 opacity-30 text-[10px] font-black uppercase tracking-[0.3em]">
              {tasks.filter(t => t.completed).length} / {tasks.length} TAMAMLANDI
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;