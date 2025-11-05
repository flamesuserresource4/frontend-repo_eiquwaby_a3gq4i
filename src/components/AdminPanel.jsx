import { useState } from 'react';
import { db, FIREBASE_ENABLED } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { ShieldCheck, PlusCircle } from 'lucide-react';
import { useAuth } from './AuthProvider';

const DEFAULT_COLOR = 'from-emerald-400 to-lime-500';

export default function AdminPanel() {
  const { user } = useAuth();
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
  const isAdmin = !!user && (!!adminEmail ? user.email === adminEmail : false);

  const [form, setForm] = useState({
    name: '',
    level: 'Beginner',
    icon: 'Leaf',
    color: DEFAULT_COLOR,
    description: '',
    questionsText: 'What is sustainability?::Using resources without compromising future generations|Caring only about profit|A type of plant|None::0',
  });
  const [saving, setSaving] = useState(false);

  if (!isAdmin) return null;

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  async function addQuest(e) {
    e.preventDefault();
    if (!FIREBASE_ENABLED) return alert('Connect Firebase to add quests.');
    setSaving(true);

    // Parse questions from a simple DSL: Question::opt1|opt2|opt3|opt4::answerIndex
    const questions = form.questionsText.split('\n').map((line) => {
      const [question, opts, ans] = line.split('::');
      return { question, options: (opts || '').split('|').filter(Boolean), answerIndex: Number(ans || 0) };
    }).filter((q) => q.question && q.options.length > 1);

    try {
      await addDoc(collection(db, 'quest'), {
        name: form.name,
        level: form.level,
        icon: form.icon,
        color: form.color,
        description: form.description,
        questions,
      });
      alert('Quest added');
      setForm({ name: '', level: 'Beginner', icon: 'Leaf', color: DEFAULT_COLOR, description: '', questionsText: '' });
    } catch (e) {
      console.error(e);
      alert('Failed to add quest');
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-emerald-600" />
          <h3 className="text-lg font-semibold text-slate-900">Admin • Create a new Quest</h3>
        </div>
        <form onSubmit={addQuest} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div>
            <label className="block text-sm font-medium text-slate-700">Name</label>
            <input name="name" value={form.name} onChange={onChange} required className="mt-1 w-full rounded-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Level</label>
            <select name="level" value={form.level} onChange={onChange} className="mt-1 w-full rounded-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Icon (Bolt, Droplet, Leaf, Recycle)</label>
            <input name="icon" value={form.icon} onChange={onChange} className="mt-1 w-full rounded-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Color (Tailwind gradient e.g. from-emerald-400 to-lime-500)</label>
            <input name="color" value={form.color} onChange={onChange} className="mt-1 w-full rounded-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700">Description</label>
            <textarea name="description" value={form.description} onChange={onChange} rows={3} className="mt-1 w-full rounded-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700">Questions (one per line)
              <span className="ml-2 text-xs text-slate-500">Format: Question::opt1|opt2|opt3|opt4::answerIndex</span>
            </label>
            <textarea name="questionsText" value={form.questionsText} onChange={onChange} rows={4} className="mt-1 w-full rounded-lg border-slate-300 focus:border-emerald-500 focus:ring-emerald-500" />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 text-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-emerald-700">
              <PlusCircle className="h-4 w-4" /> {saving ? 'Saving...' : 'Add Quest'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
