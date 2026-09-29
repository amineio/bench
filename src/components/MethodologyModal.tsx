import React from 'react';
import { X } from 'lucide-react';
import { INTERPRETATION_NOTES } from '../data/languages';

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MethodologyModal: React.FC<MethodologyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs flex items-center justify-center p-4 font-mono"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-white rounded-lg shadow-xl border border-slate-300 overflow-hidden"
      >
        <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <h3 className="text-xs font-bold text-black uppercase tracking-wider">
            SURVEY METHODOLOGY & INTERPRETATION NOTES
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-black p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs max-h-[75vh] overflow-y-auto">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded text-slate-700 leading-relaxed">
            <span className="font-bold text-black uppercase">Multi-select notice:</span> Usage percentages refer to respondents who reported extensive work with the language in the 2025 Stack Overflow Developer Survey. Respondents could select multiple languages, so the percentages do not total 100%.
          </div>

          <div className="divide-y divide-slate-100 border border-slate-200 rounded">
            {INTERPRETATION_NOTES.map((note, idx) => (
              <div key={note.id} className="p-3">
                <div className="flex items-center gap-1.5 text-black font-bold mb-1">
                  <span className="text-slate-400 text-[10px]">0{idx + 1}.</span>
                  <span className="uppercase">{note.title}</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-xs">
                  {note.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-black text-white rounded text-xs hover:bg-slate-800 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
