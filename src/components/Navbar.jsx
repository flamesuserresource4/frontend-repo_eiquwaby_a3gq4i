import { Leaf, User } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-emerald-100 text-emerald-600 grid place-items-center shadow-sm">
            <Leaf className="h-5 w-5" />
          </div>
          <div className="font-semibold text-slate-900 tracking-tight">
            EcoQuest
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-slate-600">
          <a href="#quests" className="hover:text-slate-900 transition-colors">Quests</a>
          <a href="#progress" className="hover:text-slate-900 transition-colors">Progress</a>
          <a href="#about" className="hover:text-slate-900 transition-colors">About</a>
        </nav>
        <button className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 text-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
          <User className="h-4 w-4" />
          Sign in
        </button>
      </div>
    </header>
  );
}
