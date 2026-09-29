import React from 'react';
import { X } from 'lucide-react';
import { LanguageRecord, ABSTRACTION_BANDS } from '../data/languages';

interface LanguageDetailModalProps {
  language: LanguageRecord | null;
  onClose: () => void;
}

export const LanguageDetailModal: React.FC<LanguageDetailModalProps> = ({
  language,
  onClose,
}) => {
  if (!language) return null;

  const bandMeta = ABSTRACTION_BANDS[language.abstractionBand];
  const barWidth = Math.min((language.usagePercentage / 70) * 100, 100);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs flex items-center justify-center p-4 font-mono"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white rounded-lg shadow-xl border border-slate-300 overflow-hidden"
      >
        {/* Header */}
        <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: bandMeta.color.base }}
            />
            <span className="text-xs text-slate-500 font-bold uppercase">
              RANK #{language.usageRank} // {language.name}
            </span>
            {language.footnote && (
              <span className="text-xs text-amber-600 font-bold">¹</span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-black p-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          {/* Progress bar */}
          <div>
            <div className="flex justify-between text-slate-500 mb-1">
              <span>2025 USAGE SHARE</span>
              <span className="font-bold text-black tabular-nums">
                {language.usagePercentage.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-none overflow-hidden">
              <div
                className="h-full rounded-none bg-black"
                style={{
                  width: `${barWidth}%`,
                }}
              />
            </div>
          </div>

          {/* Specs Table */}
          <div className="border border-slate-200 rounded divide-y divide-slate-100 text-xs">
            <div className="p-2.5 flex justify-between">
              <span className="text-slate-500 uppercase">ABSTRACTION BAND</span>
              <span className="font-bold text-black">{language.abstractionBand}</span>
            </div>
            <div className="p-2.5 flex justify-between">
              <span className="text-slate-500 uppercase">FIRST APPEARANCE</span>
              <span className="font-bold text-black">{language.firstAppearance}</span>
            </div>
            <div className="p-2.5 flex justify-between">
              <span className="text-slate-500 uppercase">EXECUTION MODEL</span>
              <span className="text-slate-800 text-right max-w-[260px]">{language.executionModel}</span>
            </div>
            <div className="p-2.5 flex justify-between">
              <span className="text-slate-500 uppercase">MEMORY MANAGEMENT</span>
              <span className="text-slate-800 text-right max-w-[260px]">{language.memoryManagement}</span>
            </div>
            <div className="p-2.5 flex justify-between">
              <span className="text-slate-500 uppercase">PRIMARY ECOSYSTEM</span>
              <span className="text-slate-800 text-right max-w-[260px]">{language.primaryEcosystem}</span>
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed text-xs">
            {language.overview}
          </p>

          {language.footnote && (
            <p className="text-amber-900 bg-amber-50 p-2.5 rounded border border-amber-200 text-xs">
              Footnote: {language.footnote}
            </p>
          )}
        </div>

        <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-black text-white rounded text-xs hover:bg-slate-800 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
