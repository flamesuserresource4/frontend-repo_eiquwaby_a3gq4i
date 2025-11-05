import { Leaf, LogOut, User } from 'lucide-react';
import { useAuth } from './AuthProvider';
import { signInWithGoogle, signOut, FIREBASE_ENABLED } from '../firebase';

export default function Navbar() {
  const { user } = useAuth();

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
        {user ? (
          <div className="flex items-center gap-3">
            <img src={user.photoURL || ''} alt={user.displayName || 'User'} className="h-8 w-8 rounded-full border border-slate-200" />
            <button
              onClick={() => signOut()}
              className="inline-flex items-center gap-2 rounded-lg bg-white text-slate-800 px-3 py-2 text-sm font-medium shadow ring-1 ring-slate-200 hover:bg-slate-50"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        ) : (
          <button
            onClick={() => (FIREBASE_ENABLED ? signInWithGoogle() : alert('Connect Firebase to enable sign-in'))}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 text-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <User className="h-4 w-4" />
            Sign in
          </button>
        )}
      </div>
    </header>
  );
}
