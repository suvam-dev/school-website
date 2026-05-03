import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dswcrubwgewxkmfljzhu.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_PgBoO7T1nHomoevHQCGepA_xD1emTrC';

// Check if valid credentials are provided
const isSupabaseConfigured = !!supabaseUrl && !!supabaseAnonKey && !supabaseUrl.includes('placeholder');

let supabase;

if (isSupabaseConfigured) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn(
    "Supabase environment variables are missing. Creating a resilient local mock persistence layer until VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set."
  );


  supabase = {
    from: (table) => ({
      select: (fields = '*') => ({
        order: (col, { ascending = false } = {}) => {
          const stored = localStorage.getItem(`mock_${table}`) || '[]';
          let list = JSON.parse(stored);
          list.sort((a, b) => {
            if (ascending) return a[col] > b[col] ? 1 : -1;
            return a[col] < b[col] ? 1 : -1;
          });
          return Promise.resolve({ data: list, error: null });
        },
        then: (resolve) => {
          const stored = localStorage.getItem(`mock_${table}`) || '[]';
          const list = JSON.parse(stored);
          resolve({ data: list, error: null });
        }
      }),
      insert: (rows) => {
        const stored = JSON.parse(localStorage.getItem(`mock_${table}`) || '[]');
        const toInsert = Array.isArray(rows) 
          ? rows.map(r => ({ id: crypto.randomUUID(), created_at: new Date().toISOString(), ...r })) 
          : [{ id: crypto.randomUUID(), created_at: new Date().toISOString(), ...rows }];
        const updated = [...toInsert, ...stored];
        localStorage.setItem(`mock_${table}`, JSON.stringify(updated));
        return Promise.resolve({ data: toInsert, error: null });
      },
      update: (updates) => ({
        eq: (col, val) => {
          let stored = JSON.parse(localStorage.getItem(`mock_${table}`) || '[]');
          stored = stored.map(item => item[col] === val ? { ...item, ...updates } : item);
          localStorage.setItem(`mock_${table}`, JSON.stringify(stored));
          return Promise.resolve({ error: null });
        }
      }),
      delete: () => ({
        eq: (col, val) => {
          let stored = JSON.parse(localStorage.getItem(`mock_${table}`) || '[]');
          stored = stored.filter(item => item[col] !== val);
          localStorage.setItem(`mock_${table}`, JSON.stringify(stored));
          return Promise.resolve({ error: null });
        }
      })
    })
  };

  // Seed initial data for a rich admin dashboard experience
  if (typeof window !== 'undefined') {
    if (!localStorage.getItem('mock_notices')) {
      const initialNotices = [
        { id: '1', title: 'Class X & XII Pre-Board Examination begins 20th January 2025. Students must carry admit cards.', message: 'Please ensure all admit cards are printed and signed by parents.', created_at: new Date().toISOString() },
        { id: '2', title: 'Admission forms for 2025–26 session now available at the school office and online portal.', message: 'Online registrations are accepted until end of February.', created_at: new Date().toISOString() }
      ];
      localStorage.setItem('mock_notices', JSON.stringify(initialNotices));
    }
    if (!localStorage.getItem('mock_inquiries')) {
      const initialInquiries = [
        { id: '1', name: 'Sunita Bose', phone: '+91 9876543210', message: 'I would like to inquire about admission requirements for higher secondary.', created_at: new Date().toISOString() }
      ];
      localStorage.setItem('mock_inquiries', JSON.stringify(initialInquiries));
    }
  }
}

export { supabase };
