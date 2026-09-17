import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Flame, 
  Trophy, 
  Target, 
  Ruler, 
  Microscope, 
  FlaskConical, 
  BarChart3, 
  Award, 
  User, 
  AlertTriangle 
} from 'lucide-react';

export default function App() {
  // Navigation / Auth States
  const [user, setUser] = useState(null); // { name: 'Johaer Anjum', email: 'user@example.com' }
  const [activeTab, setActiveTab] = useState('focus'); // focus, league, stats, badges, profile
  
  // Timer & Session States
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [mode, setMode] = useState('Strict'); // 'Strict' or 'Flexible'
  const [sessionActive, setSessionActive] = useState(false);
  const [isDistracted, setIsDistracted] = useState(false);
  
  // Stats & Progress
  const [focusSeconds, setFocusSeconds] = useState(12);
  const [breakSeconds, setBreakSeconds] = useState(0);
  const [distractionSeconds, setDistractionSeconds] = useState(6);
  const [distractionCount, setDistractionCount] = useState(1);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);

  // Tab visibility detection (Simulating distraction guard)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && sessionActive && !isDistracted) {
        setIsDistracted(true);
        setDistractionCount(prev => prev + 1);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [sessionActive, isDistracted]);

  // Main timer tick
  useEffect(() => {
    let interval = null;
    if (sessionActive && !isDistracted) {
      interval = setInterval(() => {
        setFocusSeconds((prev) => prev + 1);
      }, 1000);
    } else if (sessionActive && isDistracted) {
      interval = setInterval(() => {
        setDistractionSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [sessionActive, isDistracted]);

  // Format time (HH:MM:SS or MM:SS)
  const formatTime = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Auth Screen (Sign Up)
  if (!user) {
    return (
      <div className="min-h-screen bg-[#0B0E17] text-white flex flex-col justify-between p-6 max-w-md mx-auto">
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="w-16 h-16 bg-[#84cc16] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-lime-500/20">
            <Shield className="w-8 h-8 text-black stroke-[2.5]" />
          </div>
          <h1 className="text-3xl font-bold mb-2">StudyGuard</h1>
          <p className="text-gray-400 text-sm text-center mb-8">
            Create your account and start earning focus XP.
          </p>

          <form 
            className="w-full space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              setUser({
                name: formData.get('name') || 'Johaer Anjum',
                email: formData.get('email')
              });
            }}
          >
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Display name</label>
              <input 
                type="text" 
                name="name"
                defaultValue="Shadow" 
                required 
                className="w-full bg-[#131826] border border-[#84cc16] rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-[#84cc16]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Email</label>
              <input 
                type="email" 
                name="email"
                placeholder="you@example.com" 
                required 
                className="w-full bg-[#131826] border border-[#1E2638] rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-[#84cc16]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Password</label>
              <input 
                type="password" 
                placeholder="At least 8 characters" 
                required 
                className="w-full bg-[#131826] border border-[#1E2638] rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-[#84cc16]"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#84cc16] text-black font-bold py-3.5 rounded-xl hover:bg-lime-400 transition mt-6"
            >
              Start studying
            </button>
          </form>
        </div>

        <div className="text-center text-sm text-gray-400 mt-6">
          Already have an account? <span className="text-[#84cc16] cursor-pointer font-semibold">Sign in</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0E17] text-white max-w-md mx-auto flex flex-col justify-between pb-20 select-none">
      
      {/* Top Header */}
      <header className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#84cc16] rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-black stroke-[2.5]" />
          </div>
          <span className="font-bold text-lg">StudyGuard</span>
        </div>
      </header>

      {/* PAUSED / DISTRACTION SCREEN OVERLAY */}
      {isDistracted ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 bg-red-950/40 border border-red-500/30 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>

          <span className="text-red-400 font-semibold tracking-wider text-xs uppercase mb-2">
            Distraction Detected
          </span>
          <h2 className="text-2xl font-bold mb-2">Your focus timer is paused</h2>
          <p className="text-gray-400 text-sm mb-8">You were SO close to a clean streak.</p>

          <div className="w-full bg-[#131826] border border-[#1E2638] rounded-2xl p-6 mb-8 text-center">
            <span className="text-xs text-gray-400 font-semibold tracking-wider uppercase">Focus Lost</span>
            <div className="text-4xl font-bold text-red-400 my-2">{formatTime(distractionSeconds)}</div>
            <span className="text-xs text-orange-400 font-medium">Your streak is still safe</span>
          </div>

          <button 
            onClick={() => setIsDistracted(false)}
            className="w-full bg-[#84cc16] text-black font-bold py-4 rounded-full text-base shadow-lg shadow-lime-500/10 hover:bg-lime-400 transition"
          >
            Return to study
          </button>
        </div>
      ) : (
        <main className="flex-1 p-4">
          
          {/* TAB 1: FOCUS DASHBOARD */}
          {activeTab === 'focus' && (
            <div>
              {!sessionActive ? (
                <>
                  {/* Status Banner */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-[#131826] border border-[#1E2638] rounded-2xl p-3 flex items-center gap-3">
                      <Flame className="w-5 h-5 text-orange-500" />
                      <div>
                        <div className="text-xs text-gray-400">Streak</div>
                        <div className="text-sm font-bold text-orange-500">{streak} day streak</div>
                      </div>
                    </div>

                    <div className="bg-[#131826] border border-[#1E2638] rounded-2xl p-3 flex items-center gap-3">
                      <Trophy className="w-5 h-5 text-amber-400" />
                      <div>
                        <div className="text-xs text-gray-400">Rank</div>
                        <div className="text-sm font-bold text-amber-400">Rank #1</div>
                      </div>
                    </div>
                  </div>

                  {/* Daily Goal Card */}
                  <div className="bg-[#131826] border border-[#1E2638] rounded-2xl p-5 mb-6">
                    <div className="text-xs text-gray-400 font-semibold tracking-wider uppercase mb-1">Today's Goal</div>
                    <div className="text-3xl font-bold mb-3">
                      {formatTime(focusSeconds)} <span className="text-lg font-normal text-gray-400">/ 3h 0m</span>
                    </div>
                    <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden mb-3">
                      <div className="bg-[#84cc16] h-full w-[5%]"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Lv 1 · New Student</span>
                      <span className="text-[#84cc16] font-bold">{xp} XP</span>
                    </div>
                  </div>

                  {/* Session Setup */}
                  <div className="bg-[#131826] border border-[#1E2638] rounded-2xl p-5">
                    <h3 className="text-lg font-bold">Start a focus session</h3>
                    <p className="text-xs text-gray-400 mb-4">Pick what you're studying and lock in.</p>

                    <div className="text-xs text-gray-400 uppercase font-semibold mb-3">Subject</div>
                    
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {[
                        { name: 'Mathematics', icon: Ruler },
                        { name: 'Physics', icon: Microscope },
                        { name: 'Chemistry', icon: FlaskConical }
                      ].map((sub) => {
                        const Icon = sub.icon;
                        const selected = selectedSubject === sub.name;
                        return (
                          <button
                            key={sub.name}
                            onClick={() => setSelectedSubject(sub.name)}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl border transition ${
                              selected 
                                ? 'border-[#84cc16] bg-[#84cc16]/10 text-[#84cc16]' 
                                : 'border-[#1E2638] bg-[#0B0E17] text-gray-400'
                            }`}
                          >
                            <Icon className="w-6 h-6 mb-2" />
                            <span className="text-xs font-semibold">{sub.name}</span>
                          </button>
                        );
                      })}
                    </div>

                    <button 
                      onClick={() => setSessionActive(true)}
                      className="w-full bg-[#84cc16] text-black font-bold py-3.5 rounded-xl hover:bg-lime-400 transition"
                    >
                      Start Focus
                    </button>
                  </div>
                </>
              ) : (
                /* TIMER RUNNING VIEW */
                <div className="flex flex-col items-center pt-4">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="bg-[#131826] border border-[#1E2638] px-4 py-1.5 rounded-full text-xs font-medium flex items-center gap-2">
                      <Ruler className="w-4 h-4 text-[#84cc16]" /> {selectedSubject}
                    </span>
                    <span className="bg-red-950/40 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-full text-xs font-bold">
                      🛡️ Strict
                    </span>
                  </div>

                  {/* Circular Timer Ring */}
                  <div className="relative w-64 h-64 flex items-center justify-center mb-8">
                    <div className="absolute inset-0 rounded-full border-4 border-[#1E2638]"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-[#84cc16] border-t-transparent animate-spin-slow"></div>
                    <div className="text-center">
                      <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">Focus Time</div>
                      <div className="text-5xl font-bold tracking-tight mb-1">{formatTime(focusSeconds)}</div>
                      <div className="text-xs text-gray-400">Goal 45m</div>
                    </div>
                  </div>

                  {/* Stats Bar */}
                  <div className="grid grid-cols-3 gap-3 w-full mb-8">
                    <div className="bg-[#131826] border border-[#1E2638] p-3 rounded-2xl text-center">
                      <div className="text-amber-400 font-bold text-sm">{formatTime(breakSeconds)}</div>
                      <div className="text-[10px] text-gray-400 uppercase font-bold mt-1">Break</div>
                    </div>
                    <div className="bg-[#131826] border border-[#1E2638] p-3 rounded-2xl text-center">
                      <div className="text-red-400 font-bold text-sm">{formatTime(distractionSeconds)}</div>
                      <div className="text-[10px] text-gray-400 uppercase font-bold mt-1">Distraction</div>
                    </div>
                    <div className="bg-[#131826] border border-[#1E2638] p-3 rounded-2xl text-center">
                      <div className="text-white font-bold text-sm">{distractionCount}</div>
                      <div className="text-[10px] text-gray-400 uppercase font-bold mt-1">Distractions</div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setSessionActive(false)}
                    className="w-full bg-red-500/10 text-red-400 border border-red-500/30 font-bold py-3.5 rounded-xl hover:bg-red-500/20 transition"
                  >
                    End Session
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: WEEKLY LEAGUE */}
          {activeTab === 'league' && (
            <div>
              <h2 className="text-2xl font-bold mb-1">Weekly Focus League</h2>
              <p className="text-gray-400 text-xs mb-6">
                Ranked by XP earned this week and streak — not just hours logged.
              </p>

              <div className="space-y-3">
                {/* Current User */}
                <div className="bg-[#131826] border-2 border-[#84cc16] rounded-2xl p-4 flex items-center justify-between shadow-lg shadow-lime-500/10">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-amber-400 rounded-full flex items-center justify-center text-black font-bold text-xs">
                      🥇 1
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">{user.name}</span>
                        <span className="bg-[#84cc16]/20 text-[#84cc16] text-[10px] font-bold px-2 py-0.5 rounded-full">YOU</span>
                      </div>
                      <div className="text-xs text-orange-400 flex items-center gap-1 mt-0.5">
                        <Flame className="w-3 h-3" /> {streak} day streak
                      </div>
                    </div>
                  </div>
                  <div className="font-bold text-[#84cc16] text-sm">{xp} XP</div>
                </div>

                {/* Other Competitor */}
                <div className="bg-[#131826] border border-[#1E2638] rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-slate-300 rounded-full flex items-center justify-center text-black font-bold text-xs">
                      🥈 2
                    </div>
                    <div>
                      <div className="font-bold text-sm">Dusk</div>
                      <div className="text-xs text-orange-400 flex items-center gap-1 mt-0.5">
                        <Flame className="w-3 h-3" /> 0 day streak
                      </div>
                    </div>
                  </div>
                  <div className="font-bold text-gray-400 text-sm">0 XP</div>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder views for Stats, Badges, Profile */}
          {activeTab === 'stats' && <div className="text-center py-20 text-gray-400">Stats Overview Coming Soon</div>}
          {activeTab === 'badges' && <div className="text-center py-20 text-gray-400">Achievements & Badges Coming Soon</div>}
          {activeTab === 'profile' && <div className="text-center py-20 text-gray-400">User Profile Settings</div>}

        </main>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#0B0E17]/95 backdrop-blur-md border-t border-[#1E2638] grid grid-cols-5 py-2">
        {[
          { id: 'focus', label: 'Focus', icon: Target },
          { id: 'league', label: 'League', icon: Trophy },
          { id: 'stats', label: 'Stats', icon: BarChart3 },
          { id: 'badges', label: 'Badges', icon: Award },
          { id: 'profile', label: 'Profile', icon: User }
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() =>{
  "name": "studyguard-app",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.344.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.1",
    "vite": "^5.1.6"
  }
}/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#84cc16", // Bright lime green from UI
          darkBg: "#0B0E17",
          cardBg: "#131826",
          accentBorder: "#1E2638",
          coral: "#f87171"
        }
      }
    },
  },
  plugins: [],
} setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 transition ${
                active ? 'text-[#84cc16]' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-semibold">{tab.label}</span>
            </button>
          );
        })}
      </nav>

    </div>
  );
}
