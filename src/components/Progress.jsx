import { Trophy, Star, BookOpen } from 'lucide-react';

export default function Progress() {
  return (
    <section id="progress" className="py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Your learning progress</h2>
            <p className="mt-2 text-slate-600">Track completed lessons and quiz performance. Sign in to sync across devices.</p>
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
                <div className="text-xl font-semibold text-slate-900">Explorer II</div>
              </div>
            </div>
            <div className="mt-4 w-full bg-slate-100 h-2 rounded-full">
              <div className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500" style={{ width: '62%' }} />
            </div>
            <div className="mt-2 text-xs text-slate-500">62% to next level</div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 grid place-items-center">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-slate-500">Completed lessons</div>
                <div className="text-xl font-semibold text-slate-900">7 / 12</div>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>• Energy basics</li>
              <li>• Water conservation</li>
              <li>• Forest biodiversity</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-indigo-100 text-indigo-700 grid place-items-center">
                <Star className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm text-slate-500">Best quiz score</div>
                <div className="text-xl font-semibold text-slate-900">9/10</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-600">Keep it up! Aim for a perfect 10 to earn a gold badge.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
