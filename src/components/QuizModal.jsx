import { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { db, FIREBASE_ENABLED } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useAuth } from './AuthProvider';

export default function QuizModal({ open, onClose, quest }) {
  const { user } = useAuth();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (open) {
      setIndex(0);
      setAnswers([]);
    }
  }, [open]);

  const questions = useMemo(() => {
    const qs = quest?.questions || [];
    // randomize order
    return [...qs].sort(() => Math.random() - 0.5).slice(0, 5);
  }, [quest]);

  if (!open || !quest) return null;

  const current = questions[index];

  const selectAnswer = (i) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = i;
      return next;
    });
  };

  const score = answers.reduce((acc, a, i) => {
    const q = questions[i];
    return acc + (a === q?.answerIndex ? 1 : 0);
  }, 0);

  async function finish() {
    if (FIREBASE_ENABLED && user) {
      try {
        await addDoc(collection(db, 'progress'), {
          userId: user.uid,
          questId: quest.id,
          score,
          total: questions.length,
          completedAt: serverTimestamp(),
        });
      } catch (e) {
        console.error(e);
      }
    }
    onClose();
    alert(`You scored ${score}/${questions.length}`);
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-end sm:items-center justify-center p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-lg border border-slate-200">
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-900">{quest.name} • Quiz</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100">
            <X className="h-5 w-5 text-slate-600" />
          </button>
        </div>
        <div className="p-5">
          {current ? (
            <div>
              <div className="text-sm text-emerald-700 font-medium">Question {index + 1} of {questions.length}</div>
              <h4 className="mt-2 text-lg font-semibold text-slate-900">{current.question}</h4>
              <div className="mt-4 space-y-2">
                {current.options.map((opt, i) => (
                  <label key={i} className={`flex items-center gap-3 rounded-xl border p-3 cursor-pointer transition-colors ${answers[index] === i ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                    <input
                      type="radio"
                      name={`q-${index}`}
                      className="accent-emerald-600"
                      checked={answers[index] === i}
                      onChange={() => selectAnswer(i)}
                    />
                    <span className="text-sm text-slate-800">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ) : (
            <p>No questions available.</p>
          )}
        </div>
        <div className="p-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            className="px-4 py-2 text-sm rounded-lg bg-white shadow ring-1 ring-slate-200 hover:bg-slate-50"
            disabled={index === 0}
          >
            Back
          </button>
          {index < questions.length - 1 ? (
            <button
              onClick={() => setIndex((i) => Math.min(questions.length - 1, i + 1))}
              className="px-4 py-2 text-sm rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700"
              disabled={answers[index] == null}
            >
              Next
            </button>
          ) : (
            <button
              onClick={finish}
              className="px-4 py-2 text-sm rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700"
              disabled={answers.length !== questions.length}
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
