import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Link } from 'react-router-dom';
import { Bell, Calendar, LogOut, ArrowLeft, Plus, Edit2, Trash2, CheckCircle, RefreshCw, Upload, Image as ImageIcon } from 'lucide-react';

export default function AdminDashboard() {
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [actionError, setActionError] = useState('');
  const [activeTab, setActiveTab] = useState('notifications');
  
  // Notification Management State
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  // Event Calendar Management State
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  
  // Event Form State
  const [eventName, setEventName] = useState('');
  const [eventDay, setEventDay] = useState('');
  const [eventMonth, setEventMonth] = useState('');
  const [eventMeta, setEventMeta] = useState('');
  const [eventTag, setEventTag] = useState('');
  const [eventImageFile, setEventImageFile] = useState(null);
  const [eventImageUrl, setEventImageUrl] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  // Carousel Management State
  const [carouselImages, setCarouselImages] = useState([]);
  const [loadingCarousel, setLoadingCarousel] = useState(false);
  const [editingCarouselId, setEditingCarouselId] = useState(null);
  const [carouselAlt, setCarouselAlt] = useState('');
  const [carouselCaption, setCarouselCaption] = useState('');
  const [carouselImageUrl, setCarouselImageUrl] = useState('');
  const [carouselImageFile, setCarouselImageFile] = useState(null);
  const [uploadingCarouselImage, setUploadingCarouselImage] = useState(false);

  // Authentication check
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (supabase && typeof supabase.rpc === 'function') {
        const { data: isValid, error } = await supabase
          .rpc('verify_admin_credentials', {
            p_username: username,
            p_password: password
          });

        if (error) throw error;

        if (isValid) {
          localStorage.setItem('adminToken', 'secure-authenticated-token');
          setToken('secure-authenticated-token');
          setUsername('');
          setPassword('');
          return;
        }
      }
      
      // Fallback in case of missing database or connection issue
      if (username === 'admin' && password === 'password123') {
        localStorage.setItem('adminToken', 'demo-token');
        setToken('demo-token');
        setUsername('');
        setPassword('');
        return;
      }
      setError('Invalid admin credentials');
    } catch (err) {
      console.warn('Auth failed, using fallback:', err);
      if (username === 'admin' && password === 'password123') {
        localStorage.setItem('adminToken', 'demo-token');
        setToken('demo-token');
        setUsername('');
        setPassword('');
        return;
      }
      setError(err.message || 'Invalid admin credentials');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
  };

  // ─────────────────────────────────────────────
  // NOTICES CRUD
  // ─────────────────────────────────────────────
  const fetchNotifications = async () => {
    setLoading(true);
    setActionError('');
    try {
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotifications(data || []);
      localStorage.setItem('mock_notices', JSON.stringify(data || []));
    } catch (err) {
      console.warn('Supabase fetch failed. Falling back to local storage:', err);
      const cached = localStorage.getItem('mock_notices') || '[]';
      setNotifications(JSON.parse(cached));
      setActionError('Note: Could not fetch from live database. Using local fallback.');
    } finally {
      setLoading(false);
    }
  };

  const handleNoticeSubmit = async (e) => {
    e.preventDefault();
    if (!title || !message) return;
    setActionError('');

    try {
      if (editingId) {
        const { error } = await supabase
          .from('notices')
          .update({ title, message })
          .eq('id', editingId);

        if (error) throw error;
        setTitle('');
        setMessage('');
        setEditingId(null);
        fetchNotifications();
      } else {
        const { error } = await supabase
          .from('notices')
          .insert([{ title, message }]);

        if (error) throw error;
        setTitle('');
        setMessage('');
        fetchNotifications();
      }
    } catch (err) {
      console.warn('Supabase notice save failed. Falling back to local storage:', err);
      let cached = JSON.parse(localStorage.getItem('mock_notices') || '[]');
      if (editingId) {
        cached = cached.map(item => item.id === editingId ? { ...item, title, message } : item);
        setEditingId(null);
      } else {
        cached.unshift({ id: crypto.randomUUID(), title, message, created_at: new Date().toISOString() });
      }
      localStorage.setItem('mock_notices', JSON.stringify(cached));
      setNotifications(cached);
      setTitle('');
      setMessage('');
      setActionError('Saved locally!');
    }
  };

  const handleEditNotice = (notif) => {
    setEditingId(notif.id);
    setTitle(notif.title);
    setMessage(notif.message || notif.text);
  };

  const cancelEditNotice = () => {
    setEditingId(null);
    setTitle('');
    setMessage('');
  };

  const handleDeleteNotice = async (id) => {
    if (!confirm('Are you sure you want to delete this notification?')) return;
    setActionError('');

    try {
      const { error } = await supabase
        .from('notices')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchNotifications();
    } catch (err) {
      console.warn('Supabase delete failed. Falling back to local storage:', err);
      let cached = JSON.parse(localStorage.getItem('mock_notices') || '[]');
      cached = cached.filter(item => item.id !== id);
      localStorage.setItem('mock_notices', JSON.stringify(cached));
      setNotifications(cached);
      setActionError('Deleted locally.');
    }
  };

  // ─────────────────────────────────────────────
  // EVENTS CRUD
  // ─────────────────────────────────────────────
  const fetchEvents = async () => {
    setLoadingEvents(true);
    setActionError('');
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
      localStorage.setItem('mock_events', JSON.stringify(data || []));
    } catch (err) {
      console.warn('Supabase fetch events failed. Falling back to local storage:', err);
      const cached = localStorage.getItem('mock_events') || '[]';
      setEvents(JSON.parse(cached));
      setActionError('Note: Could not fetch events from live database. Using local fallback.');
    } finally {
      setLoadingEvents(false);
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) return null;
    setUploadingImage(true);
    setActionError('');
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error } = await supabase.storage
        .from('events')
        .upload(filePath, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('events')
        .getPublicUrl(filePath);

      setEventImageUrl(publicUrl);
      return publicUrl;
    } catch (err) {
      console.error('Error uploading image to storage:', err);
      setActionError('Image upload failed. Please try a direct URL or re-upload.');
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    if (!eventName || !eventDay || !eventMonth || !eventMeta || !eventTag) return;
    setActionError('');

    let finalImageUrl = eventImageUrl;

    if (eventImageFile) {
      const uploadedUrl = await handleFileUpload(eventImageFile);
      if (uploadedUrl) {
        finalImageUrl = uploadedUrl;
      }
    }

    try {
      if (editingEventId) {
        const { error } = await supabase
          .from('events')
          .update({
            name: eventName,
            day: eventDay,
            month: eventMonth,
            meta: eventMeta,
            tag: eventTag,
            image_url: finalImageUrl,
          })
          .eq('id', editingEventId);

        if (error) throw error;
        setEventName('');
        setEventDay('');
        setEventMonth('');
        setEventMeta('');
        setEventTag('');
        setEventImageUrl('');
        setEventImageFile(null);
        setEditingEventId(null);
        fetchEvents();
      } else {
        const { error } = await supabase
          .from('events')
          .insert([{
            name: eventName,
            day: eventDay,
            month: eventMonth,
            meta: eventMeta,
            tag: eventTag,
            image_url: finalImageUrl,
          }]);

        if (error) throw error;
        setEventName('');
        setEventDay('');
        setEventMonth('');
        setEventMeta('');
        setEventTag('');
        setEventImageUrl('');
        setEventImageFile(null);
        fetchEvents();
      }
    } catch (err) {
      console.warn('Supabase event save failed. Falling back to local storage:', err);
      let cached = JSON.parse(localStorage.getItem('mock_events') || '[]');
      if (editingEventId) {
        cached = cached.map(item => item.id === editingEventId ? { ...item, name: eventName, day: eventDay, month: eventMonth, meta: eventMeta, tag: eventTag, image_url: finalImageUrl } : item);
        setEditingEventId(null);
      } else {
        cached.unshift({ id: crypto.randomUUID(), name: eventName, day: eventDay, month: eventMonth, meta: eventMeta, tag: eventTag, image_url: finalImageUrl, created_at: new Date().toISOString() });
      }
      localStorage.setItem('mock_events', JSON.stringify(cached));
      setEvents(cached);
      setEventName('');
      setEventDay('');
      setEventMonth('');
      setEventMeta('');
      setEventTag('');
      setEventImageUrl('');
      setEventImageFile(null);
      setActionError('Saved locally! (Ensure the events table/storage exists in your Supabase to save permanently)');
    }
  };

  const handleEditEvent = (ev) => {
    setEditingEventId(ev.id);
    setEventName(ev.name);
    setEventDay(ev.day);
    setEventMonth(ev.month);
    setEventMeta(ev.meta);
    setEventTag(ev.tag);
    setEventImageUrl(ev.image_url || '');
  };

  const cancelEditEvent = () => {
    setEditingEventId(null);
    setEventName('');
    setEventDay('');
    setEventMonth('');
    setEventMeta('');
    setEventTag('');
    setEventImageUrl('');
    setEventImageFile(null);
  };

  const handleDeleteEvent = async (id) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    setActionError('');

    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchEvents();
    } catch (err) {
      console.warn('Supabase event delete failed. Falling back to local storage:', err);
      let cached = JSON.parse(localStorage.getItem('mock_events') || '[]');
      cached = cached.filter(item => item.id !== id);
      localStorage.setItem('mock_events', JSON.stringify(cached));
      setEvents(cached);
      setActionError('Deleted locally.');
    }
  };

  // ─────────────────────────────────────────────
  // CAROUSEL CRUD
  // ─────────────────────────────────────────────
  const fetchCarousel = async () => {
    setLoadingCarousel(true);
    setActionError('');
    try {
      const { data, error } = await supabase
        .from('carousel_images')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setCarouselImages(data || []);
    } catch (err) {
      console.warn('Supabase fetch carousel failed:', err);
      setActionError('Note: Could not fetch carousel from database.');
    } finally {
      setLoadingCarousel(false);
    }
  };

  const handleCarouselFileUpload = async (file) => {
    if (!file) return null;
    setUploadingCarouselImage(true);
    setActionError('');
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error } = await supabase.storage
        .from('carousel')
        .upload(filePath, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('carousel')
        .getPublicUrl(filePath);

      setCarouselImageUrl(publicUrl);
      return publicUrl;
    } catch (err) {
      console.error('Error uploading image to carousel storage:', err);
      setActionError('Carousel image upload failed.');
      return null;
    } finally {
      setUploadingCarouselImage(false);
    }
  };

  const handleCarouselSubmit = async (e) => {
    e.preventDefault();
    if (!carouselAlt) return;
    setActionError('');

    let finalImageUrl = carouselImageUrl;

    if (carouselImageFile) {
      const uploadedUrl = await handleCarouselFileUpload(carouselImageFile);
      if (uploadedUrl) {
        finalImageUrl = uploadedUrl;
      }
    }

    if (!finalImageUrl) {
      setActionError('Please provide an image file or direct URL.');
      return;
    }

    try {
      if (editingCarouselId) {
        const { error } = await supabase
          .from('carousel_images')
          .update({
            alt: carouselAlt,
            caption: carouselCaption,
            src: finalImageUrl,
          })
          .eq('id', editingCarouselId);

        if (error) throw error;
        setCarouselAlt('');
        setCarouselCaption('');
        setCarouselImageUrl('');
        setCarouselImageFile(null);
        setEditingCarouselId(null);
        fetchCarousel();
      } else {
        const { error } = await supabase
          .from('carousel_images')
          .insert([{
            alt: carouselAlt,
            caption: carouselCaption,
            src: finalImageUrl,
          }]);

        if (error) throw error;
        setCarouselAlt('');
        setCarouselCaption('');
        setCarouselImageUrl('');
        setCarouselImageFile(null);
        fetchCarousel();
      }
    } catch (err) {
      console.warn('Supabase carousel save failed:', err);
      setActionError('Could not save carousel image.');
    }
  };

  const handleEditCarousel = (item) => {
    setEditingCarouselId(item.id);
    setCarouselAlt(item.alt);
    setCarouselCaption(item.caption || '');
    setCarouselImageUrl(item.src);
  };

  const cancelEditCarousel = () => {
    setEditingCarouselId(null);
    setCarouselAlt('');
    setCarouselCaption('');
    setCarouselImageUrl('');
    setCarouselImageFile(null);
  };

  const handleDeleteCarousel = async (id) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    setActionError('');

    try {
      const { error } = await supabase
        .from('carousel_images')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchCarousel();
    } catch (err) {
      console.warn('Supabase delete carousel failed:', err);
      setActionError('Deleted failed.');
    }
  };

  // Initial load
  useEffect(() => {
    if (token) {
      fetchNotifications();
      fetchEvents();
      fetchCarousel();
    }
  }, [token]);

  // ─────────────────────────────────────────────
  // LOGIN SCREEN
  // ─────────────────────────────────────────────
  if (!token) {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col justify-center items-center p-6 text-neutral-100">
        <Link 
          to="/" 
          className="absolute top-6 left-6 flex items-center gap-2 text-neutral-400 hover:text-white transition-all duration-200 no-underline font-semibold tracking-wide text-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Go to Website
        </Link>

        <div className="w-full max-w-md bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col gap-6 relative overflow-hidden group">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl group-hover:bg-emerald-500/30 transition-all duration-500" />

          <div className="text-center flex flex-col items-center">
            <span className="text-xs font-bold text-emerald-400 tracking-widest uppercase mb-1">Administrator Portal</span>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Admin Sign In</h1>
            <p className="text-xs text-neutral-400 mt-1 max-w-xs leading-relaxed">
              Log in with admin credentials to manage the notices and events.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wide mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin"
                className="w-full bg-neutral-950/60 border border-neutral-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white transition-all"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wide mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-neutral-950/60 border border-neutral-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white transition-all"
                required
              />
            </div>

            {error && (
              <div className="text-red-300 bg-red-950/40 border border-red-800/40 rounded-xl px-4 py-3 text-xs font-medium tracking-wide">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all duration-200 cursor-pointer text-sm"
            >
              Sign In
            </button>
          </form>

          <div className="text-center pt-2 border-t border-white/[0.05]">
            <p className="text-[11px] text-neutral-500 font-medium">
              Default Credentials: <span className="text-emerald-400 font-semibold">admin</span> / <span className="text-emerald-400 font-semibold">password123</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────
  // DASHBOARD WORKBENCH
  // ─────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6 md:p-12">
      
      {/* Top Header Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pb-6 border-b border-neutral-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-600/10 border border-emerald-500/30 text-emerald-400 rounded-xl flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-bold tracking-wider uppercase text-emerald-400">Website Control</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-0.5 tracking-tight">Events Page Manager</h1>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Link 
            to="/" 
            className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 font-semibold text-xs px-4 py-3 rounded-xl transition cursor-pointer no-underline flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> View Public Site
          </Link>
          <button
            onClick={handleLogout}
            className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 font-semibold text-xs px-4 py-3 rounded-xl transition cursor-pointer flex items-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="max-w-6xl mx-auto flex gap-3 mb-10 bg-neutral-900/40 p-1.5 rounded-2xl border border-neutral-800/60 w-fit overflow-x-auto flex-wrap">
        <button
          onClick={() => { setActiveTab('notifications'); setActionError(''); }}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition cursor-pointer ${
            activeTab === 'notifications' 
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/10' 
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Bell className="w-4 h-4" /> Notice Board
        </button>
        <button
          onClick={() => { setActiveTab('events'); setActionError(''); }}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition cursor-pointer ${
            activeTab === 'events' 
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/10' 
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Calendar className="w-4 h-4" /> Events Calendar
        </button>
        <button
          onClick={() => { setActiveTab('carousel'); setActionError(''); }}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition cursor-pointer ${
            activeTab === 'carousel' 
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/10' 
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <ImageIcon className="w-4 h-4" /> Home Carousels
        </button>
      </div>

      <div className="max-w-6xl mx-auto">
        {activeTab === 'notifications' ? (
          
          /* NOTICES SECTION */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form Column */}
            <div className="bg-white/[0.02] backdrop-blur-md border border-neutral-800 rounded-2xl p-6 md:p-8 h-fit shadow-lg flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-bold text-white leading-snug">
                  {editingId ? 'Edit Notice' : 'Post New Notice'}
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Changes reflect directly on the events & news notice board section.
                </p>
              </div>

              <form onSubmit={handleNoticeSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wide mb-2">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Pre-Board Notice 2025"
                    className="w-full bg-neutral-950/60 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 text-white transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wide mb-2">Announcement Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Brief details about the notice..."
                    rows="4"
                    className="w-full bg-neutral-950/60 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 text-white transition-all resize-none"
                    required
                  />
                </div>

                {actionError && (
                  <div className="text-emerald-300 bg-emerald-950/40 border border-emerald-800/40 rounded-xl px-4 py-3 text-xs font-medium tracking-wide leading-normal">
                    {actionError}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl shadow transition cursor-pointer text-xs"
                  >
                    {editingId ? 'Save Notice' : 'Post Notice'}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={cancelEditNotice}
                      className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold py-3 px-4 rounded-xl border border-neutral-700 transition cursor-pointer text-xs"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* List Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Active Live Notices</h2>
                  <p className="text-xs text-neutral-400 mt-0.5">Manage existing active announcements</p>
                </div>
                <button
                  onClick={fetchNotifications}
                  className="text-xs bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-bold px-3 py-2 rounded-xl transition border border-neutral-800 cursor-pointer flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Refresh
                </button>
              </div>

              {loading ? (
                <div className="text-center py-12 bg-white/[0.01] border border-neutral-900 rounded-2xl flex flex-col items-center">
                  <div className="w-6 h-6 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-3" />
                  <p className="text-xs text-neutral-400 font-medium">Loading notices...</p>
                </div>
              ) : notifications.length === 0 ? (
                <div className="text-center py-12 bg-white/[0.01] border border-neutral-900 rounded-2xl">
                  <p className="text-base font-semibold text-neutral-300">No live notices posted</p>
                  <p className="text-xs text-neutral-500 mt-1">Add announcements using the form to have them appear here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="bg-white/[0.02] backdrop-blur-sm border border-neutral-800/80 hover:border-neutral-700 rounded-2xl p-5 md:p-6 transition flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1.5">
                          <h3 className="text-lg font-bold text-white tracking-tight">{notif.title}</h3>
                          {notif.created_at && (
                            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full uppercase tracking-wider">
                              {new Date(notif.created_at).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-neutral-400 leading-relaxed max-w-2xl">
                          {notif.message || notif.text}
                        </p>
                      </div>

                      <div className="flex md:flex-col gap-2 shrink-0 self-end md:self-center">
                        <button
                          onClick={() => handleEditNotice(notif)}
                          className="flex items-center justify-center gap-1.5 text-xs bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/40 font-bold px-3.5 py-2 rounded-xl transition cursor-pointer"
                        >
                          <Edit2 className="w-3 h-3" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteNotice(notif.id)}
                          className="flex items-center justify-center gap-1.5 text-xs bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800/40 font-bold px-3.5 py-2 rounded-xl transition cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        ) : activeTab === 'events' ? (

          /* EVENTS SECTION */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form Column */}
            <div className="bg-white/[0.02] backdrop-blur-md border border-neutral-800 rounded-2xl p-6 md:p-8 h-fit shadow-lg flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-bold text-white leading-snug">
                  {editingEventId ? 'Edit Event' : 'Add Calendar Event'}
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Events will display directly on the school calendar of the events page.
                </p>
              </div>

              <form onSubmit={handleEventSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wide mb-2">Event Title</label>
                  <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="e.g. Annual Sports Day"
                    className="w-full bg-neutral-950/60 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 text-white transition-all"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wide mb-2">Day</label>
                    <input
                      type="text"
                      value={eventDay}
                      onChange={(e) => setEventDay(e.target.value)}
                      placeholder="e.g. 25"
                      className="w-full bg-neutral-950/60 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 text-white transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wide mb-2">Month</label>
                    <input
                      type="text"
                      value={eventMonth}
                      onChange={(e) => setEventMonth(e.target.value)}
                      placeholder="e.g. Dec"
                      className="w-full bg-neutral-950/60 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 text-white transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wide mb-2">Event Meta (Venue / Time)</label>
                  <input
                    type="text"
                    value={eventMeta}
                    onChange={(e) => setEventMeta(e.target.value)}
                    placeholder="e.g. Auditorium · 10:00 AM"
                    className="w-full bg-neutral-950/60 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 text-white transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wide mb-2">Category Tag</label>
                  <input
                    type="text"
                    value={eventTag}
                    onChange={(e) => setEventTag(e.target.value)}
                    placeholder="e.g. Cultural or Academic"
                    className="w-full bg-neutral-950/60 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 text-white transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wide mb-2">Direct Image URL</label>
                  <input
                    type="text"
                    value={eventImageUrl}
                    onChange={(e) => setEventImageUrl(e.target.value)}
                    placeholder="e.g. https://images.unsplash.com/..."
                    className="w-full bg-neutral-950/60 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 text-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wide mb-2">Or Upload Event Image</label>
                  <div className="flex items-center gap-3 bg-neutral-950/60 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-400">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setEventImageFile(e.target.files[0])}
                      className="hidden"
                      id="upload-image-file"
                    />
                    <label htmlFor="upload-image-file" className="cursor-pointer flex items-center gap-2 hover:text-emerald-400 transition">
                      <Upload className="w-4 h-4 text-emerald-400" />
                      <span>{eventImageFile ? eventImageFile.name : 'Choose file...'}</span>
                    </label>
                  </div>
                </div>

                {eventImageUrl && (
                  <div className="relative mt-2 p-1.5 bg-neutral-950 border border-neutral-800 rounded-xl">
                    <p className="text-[10px] uppercase font-bold text-neutral-500 mb-1 tracking-wider">Image Preview</p>
                    <img src={eventImageUrl} alt="Preview" className="w-full h-32 object-cover rounded-lg border border-neutral-800" />
                  </div>
                )}

                {actionError && (
                  <div className="text-emerald-300 bg-emerald-950/40 border border-emerald-800/40 rounded-xl px-4 py-3 text-xs font-medium tracking-wide leading-normal">
                    {actionError}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={uploadingImage}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-xl shadow transition cursor-pointer text-xs flex items-center justify-center gap-1.5"
                  >
                    {uploadingImage ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : null}
                    <span>{editingEventId ? 'Save Event' : 'Add Event'}</span>
                  </button>
                  {editingEventId && (
                    <button
                      type="button"
                      onClick={cancelEditEvent}
                      className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold py-3 px-4 rounded-xl border border-neutral-700 transition cursor-pointer text-xs"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* List Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Current Events Calendar</h2>
                  <p className="text-xs text-neutral-400 mt-0.5">Edit or remove upcoming school events</p>
                </div>
                <button
                  onClick={fetchEvents}
                  className="text-xs bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-bold px-3 py-2 rounded-xl transition border border-neutral-800 cursor-pointer flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Refresh
                </button>
              </div>

              {loadingEvents ? (
                <div className="text-center py-12 bg-white/[0.01] border border-neutral-900 rounded-2xl flex flex-col items-center">
                  <div className="w-6 h-6 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-3" />
                  <p className="text-xs text-neutral-400 font-medium">Loading events...</p>
                </div>
              ) : events.length === 0 ? (
                <div className="text-center py-12 bg-white/[0.01] border border-neutral-900 rounded-2xl">
                  <p className="text-base font-semibold text-neutral-300">No events scheduled yet</p>
                  <p className="text-xs text-neutral-500 mt-1">Schedule events via the form to have them appear here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {events.map((ev) => (
                    <div
                      key={ev.id}
                      className="bg-white/[0.02] backdrop-blur-sm border border-neutral-800/80 hover:border-neutral-700 rounded-2xl p-5 md:p-6 transition flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-emerald-600/15 text-emerald-400 border border-emerald-500/30 rounded-xl px-4 py-2 text-center min-w-[64px]">
                          <div className="text-2xl font-black leading-none tracking-tight">{ev.day}</div>
                          <div className="text-[10px] tracking-widest uppercase font-bold text-emerald-300 mt-1">{ev.month}</div>
                        </div>

                        {ev.image_url && (
                          <img src={ev.image_url} alt="Event" className="w-16 h-16 object-cover rounded-xl border border-neutral-800 shrink-0" />
                        )}

                        <div>
                          <h3 className="text-lg font-bold text-white tracking-tight">{ev.name}</h3>
                          <p className="text-xs text-neutral-400 mt-0.5">{ev.meta}</p>
                          <span className="inline-block mt-2 text-[10px] bg-emerald-950/40 border border-emerald-800/30 text-emerald-400 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                            {ev.tag}
                          </span>
                        </div>
                      </div>

                      <div className="flex md:flex-col gap-2 shrink-0 self-end md:self-center">
                        <button
                          onClick={() => handleEditEvent(ev)}
                          className="flex items-center justify-center gap-1.5 text-xs bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/40 font-bold px-3.5 py-2 rounded-xl transition cursor-pointer"
                        >
                          <Edit2 className="w-3 h-3" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(ev.id)}
                          className="flex items-center justify-center gap-1.5 text-xs bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800/40 font-bold px-3.5 py-2 rounded-xl transition cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        ) : (

          /* CAROUSEL IMAGES SECTION */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form Column */}
            <div className="bg-white/[0.02] backdrop-blur-md border border-neutral-800 rounded-2xl p-6 md:p-8 h-fit shadow-lg flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-bold text-white leading-snug">
                  {editingCarouselId ? 'Edit Carousel Slide' : 'Add New Carousel Slide'}
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Carousel slides appear directly in the Discover section on the homepage.
                </p>
              </div>

              <form onSubmit={handleCarouselSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wide mb-2">Alternative / Alt Text (Label)</label>
                  <input
                    type="text"
                    value={carouselAlt}
                    onChange={(e) => setCarouselAlt(e.target.value)}
                    placeholder="e.g. Modern Classrooms"
                    className="w-full bg-neutral-950/60 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 text-white transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wide mb-2">Description / Caption</label>
                  <input
                    type="text"
                    value={carouselCaption}
                    onChange={(e) => setCarouselCaption(e.target.value)}
                    placeholder="e.g. Our modern school campus block"
                    className="w-full bg-neutral-950/60 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 text-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wide mb-2">Direct Image URL</label>
                  <input
                    type="text"
                    value={carouselImageUrl}
                    onChange={(e) => setCarouselImageUrl(e.target.value)}
                    placeholder="e.g. https://images.unsplash.com/..."
                    className="w-full bg-neutral-950/60 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 text-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wide mb-2">Or Upload Slide Image</label>
                  <div className="flex items-center gap-3 bg-neutral-950/60 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-neutral-400">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setCarouselImageFile(e.target.files[0])}
                      className="hidden"
                      id="upload-carousel-file"
                    />
                    <label htmlFor="upload-carousel-file" className="cursor-pointer flex items-center gap-2 hover:text-emerald-400 transition">
                      <Upload className="w-4 h-4 text-emerald-400" />
                      <span>{carouselImageFile ? carouselImageFile.name : 'Choose file...'}</span>
                    </label>
                  </div>
                </div>

                {carouselImageUrl && (
                  <div className="relative mt-2 p-1.5 bg-neutral-950 border border-neutral-800 rounded-xl">
                    <p className="text-[10px] uppercase font-bold text-neutral-500 mb-1 tracking-wider">Image Preview</p>
                    <img src={carouselImageUrl} alt="Preview" className="w-full h-32 object-cover rounded-lg border border-neutral-800" />
                  </div>
                )}

                {actionError && (
                  <div className="text-emerald-300 bg-emerald-950/40 border border-emerald-800/40 rounded-xl px-4 py-3 text-xs font-medium tracking-wide leading-normal">
                    {actionError}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={uploadingCarouselImage}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-xl shadow transition cursor-pointer text-xs flex items-center justify-center gap-1.5"
                  >
                    {uploadingCarouselImage ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : null}
                    <span>{editingCarouselId ? 'Save Slide' : 'Add Slide'}</span>
                  </button>
                  {editingCarouselId && (
                    <button
                      type="button"
                      onClick={cancelEditCarousel}
                      className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold py-3 px-4 rounded-xl border border-neutral-700 transition cursor-pointer text-xs"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* List Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Active Home Carousels</h2>
                  <p className="text-xs text-neutral-400 mt-0.5">Manage existing homepage Discover sliders</p>
                </div>
                <button
                  onClick={fetchCarousel}
                  className="text-xs bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-bold px-3 py-2 rounded-xl transition border border-neutral-800 cursor-pointer flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Refresh
                </button>
              </div>

              {loadingCarousel ? (
                <div className="text-center py-12 bg-white/[0.01] border border-neutral-900 rounded-2xl flex flex-col items-center">
                  <div className="w-6 h-6 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-3" />
                  <p className="text-xs text-neutral-400 font-medium">Loading carousels...</p>
                </div>
              ) : carouselImages.length === 0 ? (
                <div className="text-center py-12 bg-white/[0.01] border border-neutral-900 rounded-2xl">
                  <p className="text-base font-semibold text-neutral-300">No custom carousels added</p>
                  <p className="text-xs text-neutral-500 mt-1">Default static gallery images are currently used on the home page.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {carouselImages.map((img) => (
                    <div
                      key={img.id}
                      className="bg-white/[0.02] backdrop-blur-sm border border-neutral-800/80 hover:border-neutral-700 rounded-2xl p-5 md:p-6 transition flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        {img.src && (
                          <img src={img.src} alt={img.alt} className="w-16 h-16 object-cover rounded-xl border border-neutral-800 shrink-0" />
                        )}

                        <div>
                          <h3 className="text-lg font-bold text-white tracking-tight">{img.alt}</h3>
                          <p className="text-xs text-neutral-400 mt-0.5">{img.caption}</p>
                        </div>
                      </div>

                      <div className="flex md:flex-col gap-2 shrink-0 self-end md:self-center">
                        <button
                          onClick={() => handleEditCarousel(img)}
                          className="flex items-center justify-center gap-1.5 text-xs bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/40 font-bold px-3.5 py-2 rounded-xl transition cursor-pointer"
                        >
                          <Edit2 className="w-3 h-3" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCarousel(img.id)}
                          className="flex items-center justify-center gap-1.5 text-xs bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800/40 font-bold px-3.5 py-2 rounded-xl transition cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
