import { Bolt, Droplet, Leaf, Recycle, ChevronRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, FIREBASE_ENABLED } from '../firebase';
import QuizModal from './QuizModal';

const fallbackQuests = [
  {
    id: 'energy',
    name: 'Energy Quest',
    level: 'Beginner',
    icon: 'Bolt',
    color: 'from-amber-400 to-orange-500',
    description: 'Learn about renewable vs. non-renewable energy and how to reduce your footprint.',
    questions: [
      { question: 'Which is a renewable energy source?', options: ['Coal', 'Wind', 'Oil', 'Diesel'], answerIndex: 1 },
      { question: 'Best way to save home energy?', options: ['Leave lights on', 'Seal drafts', 'Open fridge often', 'Use old bulbs'], answerIndex: 1 },
      { question: 'Solar panels convert...', options: ['Heat to light', 'Light to electricity', 'Water to fuel', 'Wind to heat'], answerIndex: 1 },
    ],
  },
  {
    id: 'ocean',
    name: 'Ocean Depths',
    level: 'Intermediate',
    icon: 'Droplet',
    color: 'from-sky-400 to-cyan-500',
    description: 'Dive into marine ecosystems, currents, and conservation efforts to protect our seas.',
    questions: [
      { question: 'Main cause of ocean acidification?', options: ['CO₂ absorption', 'Salt increase', 'Sunlight', 'Wind'], answerIndex: 0 },
    ],
  },
  {
    id: 'forest',
    name: 'Forest Trails',
    level: 'Intermediate',
    icon: 'Leaf',
    color: 'from-emerald-400 to-lime-500',
    description: 'Explore biodiversity, food webs, and how forests regulate our climate.',
    questions: [
      { question: 'Forest layers include...', options: ['Canopy', 'Bedrock', 'Stratosphere', 'Core'], answerIndex: 0 },
    ],
  },
  {
    id: 'waste',
    name: 'Zero Waste',
    level: 'Advanced',
    icon: 'Recycle',
    color: 'from-teal-400 to-emerald-500',
    description: 'Understand circular economy principles and practical ways to minimize waste.',
    questions: [
      { question: 'The 3 R’s stand for...', options: ['Recycle, Reuse, Reduce', 'Remove, Reduce, Recycle', 'Rebuild, Reuse, Refill', 'Reduce, Reheat, Recycle'], answerIndex: 0 },
    ],
  }
];

const iconMap = { Bolt, Droplet, Leaf, Recycle };

function QuestCard({ quest, onStart }) {
  const Icon = iconMap[quest.icon] || Leaf;
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${quest.color} text-white grid place-items-center shadow`}>
          <Icon className="h-6 w-6" />
        </div>
        <span className="text-xs font-medium text-emerald-700 bg-emerald-50 ring-1 ring-emerald-200 rounded-full px-2 py-1">
          {quest.level}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">{quest.name}</h3>
      <p className="mt-2 text-sm text-slate-600">{quest.description}</p>
      <button onClick={() => onStart(quest)} className="mt-4 inline-flex items-center gap-1 text-emerald-700 font-medium hover:text-emerald-800">
        Begin lesson
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function QuestGrid() {
  const [quests, setQuests] = useState(fallbackQuests);
  const [active, setActive] = useState(null);

  useEffect(() => {
    async function load() {
      if (!FIREBASE_ENABLED) return;
      try {
        const snap = await getDocs(collection(db, 'quest'));
        const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        if (items.length) setQuests(items);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  const onStart = (q) => setActive(q);

  return (
    <section id="quests" className="relative py-14 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Choose your next Quest</h2>
            <p className="mt-2 text-slate-600">Short, focused lessons with interactive quizzes. New modules are added regularly.</p>
          </div>
          <a href="#" className="hidden sm:inline-flex text-sm font-medium text-emerald-700 hover:text-emerald-800">See all</a>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {quests.map((q) => (
            <QuestCard key={q.id} quest={q} onStart={onStart} />
          ))}
        </div>
      </div>
      <QuizModal open={!!active} onClose={() => setActive(null)} quest={active} />
    </section>
  );
}
