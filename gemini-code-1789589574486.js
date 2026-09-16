import React, { useState, useEffect } from 'react';
import { 
  Shield, Flame, Trophy, BarChart2, Award, User, 
  Ruler, Microscope, FlaskConical, AlertTriangle, ArrowLeft
} from 'lucide-react';

export default function StudyGuardApp() {
  // Navigation & View States
  const [currentTab, setCurrentTab] = useState('focus'); // 'focus' | 'league' | 'stats' | 'badges' | 'profile'
  const [authState, setAuthState] = useState('logged_in'); // 'signup' | 'signin' | 'logged_in'
  const [activeSession, setActiveSession] = useState(false);
  const [isDistracted, setIsDistracted] = useState(false);

  // User Stats & Data
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [focusSeconds, setFocusSeconds] = useState(12);
  const [distractionSeconds, setDistractionSeconds] = useState(6);
  const [distractionCount, setDistractionCount] = useState(0);

  // Timer Effect
  useEffect(() => {
    let interval = null;
    if (activeSession && !isDistracted) {
      interval = setInterval(() => {
        setFocusSeconds((prev) => prev + 1);
      }, 1000);
    } else if (isDistracted) {
      interval = setInterval(() => {
        setDistractionSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeSession, isDistracted]);

  // Format Seconds to MM:SS or HH:MM
  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // ----------------------------------------------------
  // SCREEN: AUTHENTICATION (SIGN UP)
  // ----------------------------------------------------
  if (authState === 'signup' || authState === 'signin') {
    return (
      <div className="min-h-screen bg-[#0d0f17] text-white flex flex-col justify-between p-6 max-w-md mx-auto relative font-sans">
        <div className="flex flex-col items-center mt-12">
          <div className="w-16 h-16 bg-[#8eff31] rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(142,255,49,0.4)]">
            <Shield className="w-10 h-10 text-[#0d0f17] stroke-[2.5]" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">StudyGuard</h1>
          <p className="text-gray-400 text-sm mt-1">
            {authState === 'signup' ? 'Create your account and start earning focus XP.' : 'Welcome back to StudyGuard.'}
          </p>

          <form className="w-full mt-8 space-y-4" onSubmit={(e) => { e.preventDefault(); setAuthState('logged_in'); }}>
            {authState === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Display name</label>
                <input 
                  type="text" 
                  defaultValue="Shadow"
                  className="w-full bg-[#181a26] border border-[#8eff31] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#8eff31]"
                  required
                />
              </div>
            )}

            <div className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input 
                type="email" 
                placeholder="you@example.com"
                className="w-full bg-[#181a26] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-gray-600"
                required
              />
              {/* Validation Tooltip Simulation */}
              <div className="absolute left-4 bottom-[-32px] bg-[#2d303e] text-white text-xs px-3 py-1.5 rounded-md flex items-center gap-2 border border-orange-500/50 shadow-lg z-10">
                <span className="bg-orange-500 text-white rounded-sm px-1 font-bold">!</span>
                Please fill in this field.
              </div>
            </div>

            <div className="pt-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <input 
                type="password" 
                placeholder="At least 8 characters"
                className="w-full bg-[#181a26] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-gray-600"
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#8eff31] text-[#0d0f17] font-semibold py-3.5 rounded-xl hover:bg-[#7ce029] transition-colors mt-6 text-base"
            >
              {authState === 'signup' ? 'Start studying' : 'Sign in'}
            </button>
          </form>
        </div>

        <div className="text-center pb-6 text-sm text-gray-400">
          {authState === 'signup' ? (
            <p>Already have an account? <button onClick={() => setAuthState('signin')} className="text-[#8eff31] font-semibold underline">Sign in</button></p>
          ) : (
            <p>Don't have an account? <button onClick={() => setAuthState('signup')} className="text-[#8eff31] font-semibold underline">Sign up</button></p>
          )}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // OVERLAY: DISTRACTION DETECTED SCREEN
  // ----------------------------------------------------
  if (isDistracted) {
    return (
      <div className="min-h-screen bg-[#0a0b12] text-white flex flex-col justify-between items-center p-6 max-w-md mx-auto font-sans relative">
        <div className="w-full flex-1 flex flex-col items-center justify-center text-center mt-8">
          {/* Warning Icon Banner */}
          <div className="w-24 h-24 bg-[#2a131a] rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="w-12 h-12 text-[#f43f5e]" />
          </div>

          <span className="text-[#f43f5e] tracking-widest text-xs font-bold uppercase mb-2">
            Distraction Detected
          </span>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Your focus timer is paused
          </h1>
          <p className="text-gray-400 text-sm mb-8">
            You were SO close to a clean streak.
          </p>

          {/* Stats Box */}
          <div className="w-full bg-[#141622] border border-gray-800 rounded-2xl p-6 text-center shadow-inner">
            <span className="text-xs text-gray-400 tracking-wider font-semibold uppercase">FOCUS LOST</span>
            <div className="text-5xl font-extrabold text-[#f43f5e] my-2 tracking-tight">
              {formatTime(distractionSeconds)}
            </div>
            <span className="text-xs text-orange-400 font-medium">Your streak is still safe</span>
          </div>
        </div>

        {/* Return Button */}
        <button 
          onClick={() => setIsDistracted(false)} 
          className="w-full bg-[#8eff31] text-[#0d0f17] font-bold py-4 rounded-full text-lg hover:bg-[#7ce029] transition-all shadow-[0_0_15px_rgba(142,255,49,0.3)] my-6"
        >
          Return to study
        </button>
      </div>
    );
  }

  // ----------------------------------------------------
  // MAIN APP SCREEN (Dashboard / Active Timer / League)
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-[#0b0c10] text-white flex flex-col justify-between max-w-md mx-auto font-sans">
      {/* Top Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-900">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#8eff31] rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-[#0b0c10] stroke-[2.5]" />
          </div>
          <span className="text-xl font-bold tracking-tight">StudyGuard</span>
        </div>
      </div>

      {/* Main Container Content */}
      <div className="flex-1 p-4 flex flex-col">
        
        {/* --- TAB 1: FOCUS / MAIN TIMER DASHBOARD --- */}
        {currentTab === 'focus' && (
          <>
            {!activeSession ? (
              /* State A: Ready to Start Session */
              <div className="space-y-6">
                {/* User Status Card */}
                <div className="bg-[#13151f] border border-gray-800 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="bg-[#241a18] border border-orange-900/40 text-orange-400 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <Flame className="w-4 h-4 fill-orange-400" />
                      <span>0 day streak</span>
                    </div>
                    <div className="bg-[#262016] border border-yellow-900/40 text-yellow-500 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <Trophy className="w-4 h-4" />
                      <span>Rank #1</span>
                    </div>
                  </div>

                  <div className="text-center py-2">
                    <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Today's Goal</span>
                    <div className="text-4xl font-extrabold text-white mt-1">
                      0s <span className="text-2xl text-gray-500 font-medium">/ 3h 0m</span>
                    </div>
                    <div className="w-full bg-gray-800 h-2 rounded-full mt-4 overflow-hidden">
                      <div className="bg-[#8eff31] h-full w-0"></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs text-gray-400 pt-1">
                    <span>Lv 1 • New Student</span>
                    <span className="text-[#8eff31] font-bold">0 XP</span>
                  </div>
                </div>

                {/* Subject Selector & Start Section */}
                <div className="bg-[#13151f] border border-gray-800 rounded-2xl p-5 space-y-4">
                  <div>
                    <h2 className="text-xl font-bold">Start a focus session</h2>
                    <p className="text-xs text-gray-400 mt-1">Pick what you're studying and lock in.</p>
                  </div>

                  <span className="block text-xs font-bold text-gray-400 tracking-wider uppercase">SUBJECT</span>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <button 
                      onClick={() => setSelectedSubject('Mathematics')}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${selectedSubject === 'Mathematics' ? 'bg-[#1a2318] border-[#8eff31] text-[#8eff31]' : 'bg-[#181a26] border-gray-800 text-gray-400'}`}
                    >
                      <Ruler className="w-6 h-6 mb-2" />
                      <span className="text-xs font-medium">Mathematics</span>
                    </button>

                    <button 
                      onClick={() => setSelectedSubject('Physics')}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${selectedSubject === 'Physics' ? 'bg-[#1a2318] border-[#8eff31] text-[#8eff31]' : 'bg-[#181a26] border-gray-800 text-gray-400'}`}
                    >
                      <Microscope className="w-6 h-6 mb-2" />
                      <span className="text-xs font-medium">Physics</span>
                    </button>

                    <button 
                      onClick={() => setSelectedSubject('Chemistry')}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${selectedSubject === 'Chemistry' ? 'bg-[#1a2318] border-[#8eff31] text-[#8eff31]' : 'bg-[#181a26] border-gray-800 text-gray-400'}`}
                    >
                      <FlaskConical className="w-6 h-6 mb-2" />
                      <span className="text-xs font-medium">Chemistry</span>
                    </button>
                  </div>

                  <button 
                    onClick={() => setActiveSession(true)} 
                    className="w-full bg-[#8eff31] text-[#0d0f17] font-bold py-3.5 rounded-xl text-base hover:bg-[#7ce029] transition-all mt-4"
                  >
                    Start Session
                  </button>
                </div>
              </div>
            ) : (
              /* State B: Active Session Timer Running */
              <div className="flex-1 flex flex-col justify-between py-4">
                {/* Header Tag Bar */}
                <div className="flex justify-between items-center">
                  <div className="bg-[#181a26] border border-gray-800 px-4 py-1.5 rounded-full flex items-center gap-2 text-sm text-gray-300">
                    <Ruler className="w-4 h-4 text-cyan-400" />
                    <span>{selectedSubject}</span>
                  </div>
                  <div className="bg-[#24131a] border border-red-900/40 text-red-400 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Strict</span>
                  </div>
                </div>

                {/* Circular Timer Ring */}
                <div className="my-auto flex flex-col items-center justify-center relative">
                  <div className="relative w-72 h-72 rounded-full border-4 border-gray-800/80 flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    {/* Glowing Top Indicator Light */}
                    <div className="absolute -top-2 w-4 h-4 bg-[#8eff31] rounded-full shadow-[0_0_12px_#8eff31]"></div>
                    
                    <div className="text-center">
                      <span className="text-xs tracking-widest text-gray-400 font-semibold uppercase">FOCUS TIME</span>
                      <div className="text-6xl font-extrabold text-white my-2 tracking-tight">
                        {formatTime(focusSeconds)}
                      </div>
                      <span className="text-xs text-gray-400">Goal 45m</span>
                    </div>
                  </div>
                </div>

                {/* Lower Metrics & Distraction Trigger */}
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-[#13151f] border border-gray-800 rounded-2xl p-3 text-center">
                      <div className="text-xl font-bold text-amber-400">00:00</div>
                      <div className="text-[10px] uppercase font-bold text-gray-400 mt-1">BREAK</div>
                    </div>
                    <div className="bg-[#13151f] border border-gray-800 rounded-2xl p-3 text-center">
                      <div className="text-xl font-bold text-red-500">{formatTime(distractionSeconds)}</div>
                      <div className="text-[10px] uppercase font-bold text-gray-400 mt-1">DISTRACTION</div>
                    </div>
                    <div className="bg-[#13151f] border border-gray-800 rounded-2xl p-3 text-center">
                      <div className="text-xl font-bold text-gray-200">{distractionCount}</div>
                      <div className="text-[10px] uppercase font-bold text-gray-400 mt-1">DISTRACTIONS</div>
                    </div>
                  </div>

                  {/* Trigger Distraction Popup Simulation */}
                  <div className="flex gap-2">
                    <button 
                      onClick={() => { setIsDistracted(true); setDistractionCount(prev => prev + 1); }}
                      className="flex-1 bg-red-900/30 border border-red-800/50 text-red-400 text-xs font-medium py-2.5 rounded-xl hover:bg-red-900/50"
                    >
                      Simulate Distraction
                    </button>
                    <button 
                      onClick={() => setActiveSession(false)}
                      className="flex-1 bg-gray-800 text-gray-300 text-xs font-medium py-2.5 rounded-xl hover:bg-gray-700"
                    >
                      End Session
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* --- TAB 2: LEAGUE / LEADERBOARD --- */}
        {currentTab === 'league' && (
          <div className="space-y-6 pt-2">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold tracking-tight">Weekly Focus League</h1>
              <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
                Ranked by XP earned this week and streak — not just hours logged.
              </p>
            </div>

            {/* Rankings List */}
            <div className="space-y-3">
              {/* Rank 1 (Active User) */}
              <div className="bg-[#13151f] border-2 border-[#8eff31] rounded-2xl p-4 flex items-center justify-between relative shadow-[0_0_15px_rgba(142,255,49,0.1)]">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <span className="text-2xl">🥇</span>
                    <span className="absolute -bottom-1 -right-1 bg-blue-500 text-[10px] font-bold text-white w-4 h-4 rounded-full flex items-center justify-center">1</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-base">Johaer Anjum</span>
                      <span className="bg-[#243319] text-[#8eff31] text-[10px] font-bold px-2 py-0.5 rounded-full">YOU</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-orange-400 mt-0.5">
                      <Flame className="w-3.5 h-3.5 fill-orange-400" />
                      <span>0 day streak</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold text-[#8eff31]">0 XP</span>
                </div>
              </div>

              {/* Rank 2 */}
              <div className="bg-[#13151f] border border-gray-800 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <span className="text-2xl">🥈</span>
                    <span className="absolute -bottom-1 -right-1 bg-gray-600 text-[10px] font-bold text-white w-4 h-4 rounded-full flex items-center justify-center">2</span>
                  </div>
                  <div>
                    <span className="font-bold text-white text-base">Dusk</span>
                    <div className="flex items-center gap-1 text-xs text-orange-400 mt-0.5">
                      <Flame className="w-3.5 h-3.5 fill-orange-400" />
                      <span>0 day streak</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold text-[#8eff31]">0 XP</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Placeholder screens for other navigation tabs */}
        {(currentTab === 'stats' || currentTab === 'badges' || currentTab === 'profile') && (
          <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-500 space-y-3">
            <Trophy className="w-12 h-12 stroke-1" />
            <p className="text-sm font-medium">Detailed View Coming Soon</p>
          </div>
        )}

      </div>

      {/* Dynamic Bottom Navigation Bar */}
      <div className="bg-[#0e1017] border-t border-gray-800/80 px-4 py-3 flex justify-between items-center">
        <button 
          onClick={() => setCurrentTab('focus')} 
          className={`flex flex-col items-center gap-1 ${currentTab === 'focus' ? 'text-[#8eff31]' : 'text-gray-500'}`}
        >
          <div className={`p-1 rounded-full ${currentTab === 'focus' ? 'ring-2 ring-[#8eff31]/20' : ''}`}>
            <Shield className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-medium">Focus</span>
        </button>

        <button 
          onClick={() => setCurrentTab('league')} 
          className={`flex flex-col items-center gap-1 ${currentTab === 'league' ? 'text-[#8eff31]' : 'text-gray-500'}`}
        >
          <Trophy className="w-5 h-5" />
          <span className="text-[11px] font-medium">League</span>
        </button>

        <button 
          onClick={() => setCurrentTab('stats')} 
          className={`flex flex-col items-center gap-1 ${currentTab === 'stats' ? 'text-[#8eff31]' : 'text-gray-500'}`}
        >
          <BarChart2 className="w-5 h-5" />
          <span className="text-[11px] font-medium">Stats</span>
        </button>

        <button 
          onClick={() => setCurrentTab('badges')} 
          className={`flex flex-col items-center gap-1 ${currentTab === 'badges' ? 'text-[#8eff31]' : 'text-gray-500'}`}
        >
          <Award className="w-5 h-5" />
          <span className="text-[11px] font-medium">Badges</span>
        </button>

        <button 
          onClick={() => setCurrentTab('profile')} 
          className={`flex flex-col items-center gap-1 ${currentTab === 'profile' ? 'text-[#8eff31]' : 'text-gray-500'}`}
        >
          <User className="w-5 h-5" />
          <span className="text-[11px] font-medium">Profile</span>
        </button>
      </div>
    </div>
  );
}