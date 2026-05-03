import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Bell, Lock, LogOut, CheckCircle, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

// Define the Hashmap for authentication security
const CREDENTIALS_HASHMAP = new Map([
  ['student', 'student123'],
  ['parent', 'parent123'],
  ['visitor', 'visitor123'],
  ['admin', 'password123']
]);

export default function NotificationPage() {
  const [isAuthorized, setIsAuthorized] = useState(
    sessionStorage.getItem('notif_auth') === 'true'
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Handle Login authentication via the Hashmap
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    const lowerUser = username.trim().toLowerCase();
    const storedPassword = CREDENTIALS_HASHMAP.get(lowerUser);

    if (storedPassword && storedPassword === password) {
      sessionStorage.setItem('notif_auth', 'true');
      setIsAuthorized(true);
      setUsername('');
      setPassword('');
    } else {
      setLoginError('Invalid role or password. Please try again.');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    sessionStorage.removeItem('notif_auth');
    setIsAuthorized(false);
  };

  // Fetch notices from Supabase
  useEffect(() => {
    if (!isAuthorized) return;

    async function fetchNotices() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('notices')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) {
          setNotices(data);
        } else {
          // Fallback if no notifications found or error
          setNotices([
            {
              id: 1,
              title: 'Welcome to Holy Cross School Notices',
              message: 'Check back regularly for updates regarding academics, events, and important announcements.',
              created_at: new Date().toISOString(),
            }
          ]);
        }
      } catch (err) {
        console.error('Error loading notices:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchNotices();
  }, [isAuthorized]);

  // If unauthorized, show the premium hashmap-based login screen
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-neutral-950 to-neutral-900 flex flex-col justify-center items-center p-6 text-neutral-100">
        <Link 
          to="/" 
          className="absolute top-6 left-6 flex items-center gap-2 text-neutral-400 hover:text-white transition-colors duration-200 no-underline text-sm font-semibold tracking-wide"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="w-full max-w-md bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col gap-6 relative overflow-hidden group">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-500/30 transition-all duration-500" />
          
          <div className="text-center flex flex-col items-center">
            <div className="w-14 h-14 bg-indigo-600/20 border border-indigo-500/30 rounded-2xl flex items-center justify-center mb-4 text-indigo-400 shadow-inner group-hover:scale-105 transition-transform">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">Secure Portal</h1>
            <p className="text-xs text-neutral-400 max-w-xs">
              Enter your access credentials to unlock the notification panel.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">Role / User ID</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. student or parent"
                className="w-full bg-neutral-950/60 border border-neutral-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white transition-all duration-200"
                required
                autoComplete="off"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-neutral-950/60 border border-neutral-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white transition-all duration-200"
                required
              />
            </div>

            {loginError && (
              <div className="flex items-center gap-2 bg-red-950/40 border border-red-800/40 text-red-300 px-4 py-3 rounded-xl text-xs font-medium animate-pulse">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-indigo-500/25 active:shadow-none transition-all duration-200 cursor-pointer text-sm"
            >
              Sign In
            </button>
          </form>

          <div className="text-center pt-2 border-t border-white/[0.05]">
            <p className="text-[11px] text-neutral-500 leading-relaxed">
              For demo, use roles: <span className="text-indigo-400 font-semibold">student</span> / <span className="text-indigo-400 font-semibold">student123</span> or <span className="text-indigo-400 font-semibold">parent</span> / <span className="text-indigo-400 font-semibold">parent123</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Authorized Notice Board View
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6 md:p-12 lg:p-16 relative flex flex-col justify-between">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pb-6 border-b border-neutral-800/80">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600/10 border border-indigo-500/30 text-indigo-400 rounded-xl flex items-center justify-center shrink-0">
              <Bell className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <span className="text-xs font-bold tracking-wider uppercase text-indigo-400">Restricted Notice Board</span>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mt-0.5">School Notifications</h1>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Link 
              to="/" 
              className="bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 font-semibold text-xs px-4 py-3 rounded-xl transition-all duration-200 no-underline flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </Link>
            <button
              onClick={handleLogout}
              className="bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-red-400 font-semibold text-xs px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Log Out
            </button>
          </div>
        </div>

        {/* Dynamic content from Supabase */}
        <div className="flex-1 flex flex-col gap-6">
          {loading ? (
            <div className="flex-1 flex flex-col justify-center items-center py-20 bg-white/[0.01] border border-neutral-900 rounded-2xl">
              <div className="w-8 h-8 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-4" />
              <p className="text-sm font-medium text-neutral-400">Loading live notices...</p>
            </div>
          ) : notices.length === 0 ? (
            <div className="text-center py-20 bg-white/[0.01] border border-neutral-900 rounded-2xl">
              <p className="text-base font-semibold text-neutral-300">No active notifications available</p>
              <p className="text-xs text-neutral-500 mt-1">Check again later for new updates.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notices.map((notice, i) => (
                <div
                  key={notice.id || i}
                  className="bg-neutral-900/40 backdrop-blur-sm border border-neutral-800/80 hover:border-neutral-700/80 rounded-2xl p-6 transition-all duration-300 group hover:scale-[1.005] hover:shadow-xl hover:shadow-indigo-500/[0.02]"
                >
                  <div className="flex items-center justify-between gap-4 mb-2.5">
                    <h3 className="text-lg md:text-xl font-bold text-white tracking-tight group-hover:text-indigo-300 transition-colors duration-200">
                      {notice.title}
                    </h3>
                    {notice.created_at && (
                      <span className="text-[10px] font-bold text-indigo-400 bg-indigo-950/60 border border-indigo-800/40 px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0">
                        {new Date(notice.created_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-3xl">
                    {notice.message || notice.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
