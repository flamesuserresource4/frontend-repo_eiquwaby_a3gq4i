import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QuestGrid from './components/QuestGrid';
import Progress from './components/Progress';

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-inter">
      <Navbar />
      <main>
        <Hero />
        <QuestGrid />
        <Progress />
        <section id="about" className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight">About EcoQuest</h2>
            <p className="mt-4 text-slate-600">
              EcoQuest is an interactive learning experience that turns environmental science into engaging adventures. 
              Start with beginner-friendly modules and progress toward advanced challenges. Earn levels, track your growth, and revisit lessons anytime.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="font-semibold">Quests</h3>
                <p className="mt-1 text-sm text-slate-600">Each quest combines a concise lesson with a multiple-choice quiz to reinforce key concepts.</p>
              </div>
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="font-semibold">Progress</h3>
                <p className="mt-1 text-sm text-slate-600">Sign in to sync your completed lessons, scores, and levels using secure cloud storage.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-slate-500 flex items-center justify-between">
          <p>© {new Date().getFullYear()} EcoQuest. Learn. Play. Protect.</p>
          <a href="#" className="hover:text-slate-700">Privacy</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
