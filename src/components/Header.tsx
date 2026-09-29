import React from 'react';
import { Download, Check, ExternalLink, HelpCircle } from 'lucide-react';

interface HeaderProps {
  onOpenNotes: () => void;
  onExportCsv: () => void;
  isCopied: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNotes,
  onExportCsv,
  isCopied,
}) => {
  return (
    <header className="border-b border-slate-200 bg-white font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Left: Clean brand mark */}
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-none bg-black text-white flex items-center justify-center font-bold text-xs">
            λ
          </div>
          <span className="font-bold text-slate-900 text-sm tracking-tight uppercase">
            Languages
          </span>
          <span className="hidden sm:inline text-xs text-slate-400 pl-1">
            2025 Stack Overflow Survey
          </span>
        </div>

        {/* Right: Clean minimal links */}
        <div className="flex items-center gap-4 text-xs text-slate-600">
          <button
            onClick={onOpenNotes}
            className="hover:text-black transition-colors flex items-center gap-1 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>Survey Notes</span>
          </button>

          <button
            onClick={onExportCsv}
            className="hover:text-black transition-colors flex items-center gap-1 cursor-pointer"
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-medium">Copied CSV</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-slate-400" />
                <span>Export Data</span>
              </>
            )}
          </button>

          <a
            href="https://survey.stackoverflow.co/2025"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1 text-slate-400 hover:text-black transition-colors"
          >
            <span>Source</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </header>
  );
};
