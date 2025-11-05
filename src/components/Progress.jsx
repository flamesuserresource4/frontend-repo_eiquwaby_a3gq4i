import { Trophy, Star, BookOpen } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, FIREBASE_ENABLED } from '../firebase';
import { useAuth } from './AuthProvider';

export default function Progress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    async function load() {
      if (!FIREBASE_ENABLED || !user) return;
      try {
        const q = query(collection(db, 'progress'), where('userId', '==', user.uid));
        const snap = await getDocs(q);
        setProgress(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, [user]);

  const completed = progress.length;
  const best = useMemo(() => progress.reduce((acc, p) => Math.max(acc, p.score || 0), 0), [progress]);
  const totalAnswered = useMemo(() => progress.reduce((acc, p) => acc + (p.total || 0), 0), [progress]);
  const level = completed >= 10 ? 'Guardian' : completed >= 5 ? 'Explorer II' : completed >= 1 ? 'Explorer I' : 'Beginner';
  const levelPct = Math.min(100, Math.round(((completed % 5) / 5) * 100));

  return (
    <section id="progress" className="py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Your learning progress</h2>
            <p className="mt-2 text-slate-600">{user ? 'Your stats synced with the cloud.' : 'Sign in to sync across devices and save progress.'}</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-yellow-100 text-yellow-700 grid place-items-center">
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-slate-500">Level</div>
                <div className="text-xl font-semibold text-slate-900">{level}</div>
              </div>
            </div>
            <div className="mt-4 w-full bg-slate-100 h-2 rounded-full">
              <div className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500" style={{ width: `${levelPct}%` }} />
            </div>
            <div className="mt-2 text-xs text-slate-500">{levelPct}% to next level</div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 grid place-items-center">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-slate-500">Completed lessons</div>
                <div className="text-xl font-semibold text-slate-900">{completed}</div>
              </div>
            </div>
            {completed === 0 ? (
              <p className="mt-4 text-sm text-slate-600">Start your first quest to see progress here.</p>
            ) : (
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {progress.slice(0, 3).map((p) => (
                  <li key={p.id}>• {p.questId} — {p.score}/{p.total}</li>
                ))}
                {progress.length > 3 && <li>• +{progress.length - 3} more</li>}
              </ul>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-indigo-100 text-indigo-700 grid place-items-center">
                <Star className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-slate-500">Best quiz score</div>
                <div className="text-xl font-semibold text-slate-900">{best}/{totalAnswered > 0 ? Math.max(...progress.map((p) => p.total || 0), 10) : 10}</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-600">{best >= 9 ? 'Outstanding!' : 'Keep it up! Aim for a perfect 10.'}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
