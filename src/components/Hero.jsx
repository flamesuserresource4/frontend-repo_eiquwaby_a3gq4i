import Spline from '@splinetool/react-spline';
import { Rocket, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/hGDm7Foxug7C6E8s/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Soft gradient overlays that don't block interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white/90"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-medium ring-1 ring-emerald-200">
            <Rocket className="h-3.5 w-3.5" />
            Learn by exploring
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Discover sustainability through interactive quests
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            EcoQuest blends learning and play to help you master ecosystems, energy, water, and waste—one quest at a time.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <a href="#quests" className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 text-white px-5 py-3 text-sm font-semibold shadow-sm hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
              <Play className="h-4 w-4" /> Start a Quest
            </a>
            <a href="#about" className="inline-flex items-center gap-2 rounded-lg bg-white text-slate-800 px-5 py-3 text-sm font-semibold shadow ring-1 ring-slate-200 hover:bg-slate-50">
              Learn more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
