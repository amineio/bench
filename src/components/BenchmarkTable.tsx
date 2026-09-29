import React, { useState, useMemo } from 'react';
import {
  Copy,
  Download,
  Link,
  Filter,
  Columns,
  Check,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Layers,
  Search,
  X,
} from 'lucide-react';
import {
  PROGRAMMING_LANGUAGES,
  ABSTRACTION_BANDS,
  AbstractionBand,
  LanguageRecord,
} from '../data/languages';

interface BenchmarkTableProps {
  onSelectLanguage: (lang: LanguageRecord) => void;
  selectedLanguageId?: string;
  onOpenNotes: () => void;
}

type SortField = 'rank' | 'name' | 'band' | 'usage' | 'year';
type SortDirection = 'asc' | 'desc';
type ViewTab = 'table' | 'pareto' | 'ladder';

export const BenchmarkTable: React.FC<BenchmarkTableProps> = ({
  onSelectLanguage,
  selectedLanguageId,
  onOpenNotes,
}) => {
  const [viewTab, setViewTab] = useState<ViewTab>('table');
  const [sortField, setSortField] = useState<SortField>('usage');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selectedBand, setSelectedBand] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [colorMode, setColorMode] = useState<'monochrome' | 'palette'>('palette');
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const bandsList = (Object.keys(ABSTRACTION_BANDS) as AbstractionBand[]).sort(
    (a, b) => ABSTRACTION_BANDS[a].order - ABSTRACTION_BANDS[b].order
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection(field === 'usage' ? 'desc' : 'asc');
    }
  };

  const filteredAndSorted = useMemo(() => {
    return PROGRAMMING_LANGUAGES.filter((item) => {
      if (selectedBand !== 'all' && item.abstractionBand !== selectedBand) return false;
      if (!searchTerm) return true;
      const q = searchTerm.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.abstractionBand.toLowerCase().includes(q) ||
        item.firstAppearance.toLowerCase().includes(q) ||
        item.primaryEcosystem.toLowerCase().includes(q)
      );
    }).sort((a, b) => {
      let comp = 0;
      if (sortField === 'rank' || sortField === 'usage') {
        comp = a.usageRank - b.usageRank; // rank 1 is highest usage
      } else if (sortField === 'name') {
        comp = a.name.localeCompare(b.name);
      } else if (sortField === 'band') {
        comp = a.bandOrder - b.bandOrder || b.usagePercentage - a.usagePercentage;
      } else if (sortField === 'year') {
        comp = a.numericYear - b.numericYear;
      }

      return sortDirection === 'asc' ? comp : -comp;
    });
  }, [searchTerm, selectedBand, sortField, sortDirection]);

  const handleCopyMarkdown = () => {
    let md = '| Rank | Language | Abstraction Band | Usage in 2025 | First Appearance | Execution Model |\n';
    md += '| :--- | :--- | :--- | :--- | :--- | :--- |\n';
    filteredAndSorted.forEach((r, idx) => {
      md += `| ${idx + 1} | ${r.name}${r.footnote ? '¹' : ''} | ${r.abstractionBand} | ${r.usagePercentage.toFixed(1)}% | ${r.firstAppearance} | ${r.executionModel} |\n`;
    });
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const sortArrow = (field: SortField) => {
    if (sortField !== field) {
      return <span className="opacity-40 ml-1 font-mono text-[10px]">↑↓</span>;
    }
    return (
      <span className="font-mono text-[10px] text-black ml-1">
        {sortDirection === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  return (
    <div id="benchmark" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      {/* tbench-style Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-b border-slate-200 text-xs font-mono">
        {/* Left: Action Icon Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopyMarkdown}
            className="p-1.5 rounded border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors text-slate-700 cursor-pointer"
            title="Copy Markdown Table"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleCopyLink}
            className="p-1.5 rounded border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors text-slate-700 cursor-pointer"
            title="Copy URL"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Link className="w-3.5 h-3.5" />}
          </button>

          {showSearch ? (
            <div className="relative flex items-center ml-2">
              <input
                type="text"
                autoFocus
                placeholder="Search language or band..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-2 pr-6 py-1 text-xs border border-slate-300 rounded bg-white text-slate-900 focus:outline-hidden w-44 sm:w-56"
              />
              <button
                onClick={() => {
                  setSearchTerm('');
                  setShowSearch(false);
                }}
                className="absolute right-1.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="flex items-center gap-1 px-2 py-1.5 rounded border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs cursor-pointer ml-1"
            >
              <Search className="w-3 h-3" />
              <span className="hidden sm:inline">Search</span>
            </button>
          )}
        </div>

        {/* Right: Controls & View Segmented Tabs */}
        <div className="flex items-center gap-2">
          {/* Palette toggle */}
          <button
            onClick={() => setColorMode(colorMode === 'palette' ? 'monochrome' : 'palette')}
            className="hidden sm:flex items-center gap-1 px-2 py-1 rounded border border-slate-200 hover:bg-slate-50 text-slate-600 text-[11px] cursor-pointer"
            title="Toggle between monochrome black bars and abstraction band color map"
          >
            <span>Bar:</span>
            <span className="font-bold text-slate-900">
              {colorMode === 'palette' ? 'Palette' : 'Mono'}
            </span>
          </button>

          {/* Band Dropdown */}
          <select
            value={selectedBand}
            onChange={(e) => setSelectedBand(e.target.value)}
            className="px-2 py-1 rounded border border-slate-200 bg-white text-xs text-slate-800 focus:outline-hidden cursor-pointer"
          >
            <option value="all">ALL BANDS ⇅</option>
            {bandsList.map((band) => (
              <option key={band} value={band}>
                {band.toUpperCase()}
              </option>
            ))}
          </select>

          {/* Segmented View Tabs matching TABLE | PARETO | WAFFLE in tbench.ai */}
          <div className="flex items-center border border-slate-200 rounded p-0.5 bg-slate-50">
            <button
              onClick={() => setViewTab('table')}
              className={`px-3 py-1 rounded text-xs font-mono font-medium uppercase transition-colors cursor-pointer ${
                viewTab === 'table'
                  ? 'bg-white text-black shadow-2xs font-bold'
                  : 'text-slate-500 hover:text-black'
              }`}
            >
              TABLE
            </button>
            <button
              onClick={() => setViewTab('pareto')}
              className={`px-3 py-1 rounded text-xs font-mono font-medium uppercase transition-colors cursor-pointer ${
                viewTab === 'pareto'
                  ? 'bg-white text-black shadow-2xs font-bold'
                  : 'text-slate-500 hover:text-black'
              }`}
            >
              PARETO
            </button>
            <button
              onClick={() => setViewTab('ladder')}
              className={`px-3 py-1 rounded text-xs font-mono font-medium uppercase transition-colors cursor-pointer ${
                viewTab === 'ladder'
                  ? 'bg-white text-black shadow-2xs font-bold'
                  : 'text-slate-500 hover:text-black'
              }`}
            >
              LADDER
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 1. TABLE VIEW (THE SIGNATURE TBENCH.AI DATA GRID)        */}
      {/* ======================================================== */}
      {viewTab === 'table' && (
        <div className="overflow-x-auto border-b border-slate-200">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-bold text-black uppercase tracking-wider select-none">
                <th
                  onClick={() => handleSort('rank')}
                  className="py-3 px-3 w-14 cursor-pointer hover:bg-slate-50"
                >
                  RANK {sortArrow('rank')}
                </th>
                <th
                  onClick={() => handleSort('name')}
                  className="py-3 px-3 cursor-pointer hover:bg-slate-50"
                  style={{ width: '18%' }}
                >
                  LANGUAGE {sortArrow('name')}
                </th>
                <th
                  onClick={() => handleSort('band')}
                  className="py-3 px-3 cursor-pointer hover:bg-slate-50"
                  style={{ width: '22%' }}
                >
                  ABSTRACTION BAND {sortArrow('band')}
                </th>
                <th
                  onClick={() => handleSort('usage')}
                  className="py-3 px-3 cursor-pointer hover:bg-slate-50"
                  style={{ width: '36%' }}
                >
                  DEVELOPERS REPORTING USE {sortArrow('usage')}
                </th>
                <th
                  onClick={() => handleSort('year')}
                  className="py-3 px-3 cursor-pointer hover:bg-slate-50 text-right"
                  style={{ width: '14%' }}
                >
                  FIRST APPEARANCE {sortArrow('year')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAndSorted.map((row, idx) => {
                const meta = ABSTRACTION_BANDS[row.abstractionBand];
                const isSelected = selectedLanguageId === row.id;
                // Bar width normalized to 70% survey max
                const barWidth = Math.min((row.usagePercentage / 70) * 100, 100);

                const barFillColor =
                  colorMode === 'monochrome' ? '#000000' : meta.color.base;

                return (
                  <tr
                    key={row.id}
                    onClick={() => onSelectLanguage(row)}
                    className={`cursor-pointer transition-colors group ${
                      isSelected ? 'bg-slate-100' : 'hover:bg-slate-50/80'
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-2.5 px-3 text-slate-400 font-mono">
                      {idx + 1}
                    </td>

                    {/* Language */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="font-bold text-slate-900 group-hover:text-black">
                        {row.name}
                      </span>
                      {row.footnote && (
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenNotes();
                          }}
                          className="text-[10px] text-amber-600 font-bold ml-1 hover:underline"
                          title={row.footnote}
                        >
                          ¹
                        </span>
                      )}
                    </td>

                    {/* Abstraction Band */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: meta.color.base }}
                        />
                        <span className="text-slate-700 text-xs">
                          {row.abstractionBand}
                        </span>
                      </div>
                    </td>

                    {/* Developers Reporting Use (The Signature tbench Bar) */}
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-3">
                        <span className="w-12 font-bold font-mono tabular-nums text-slate-900 shrink-0">
                          {row.usagePercentage.toFixed(1)}%
                        </span>

                        {/* tbench-style track and bar with error-bar-like end tick */}
                        <div className="flex-1 bg-slate-100 h-3 rounded-xs relative flex items-center overflow-visible">
                          <div
                            className="h-full rounded-xs transition-all duration-300 relative"
                            style={{
                              width: `${barWidth}%`,
                              backgroundColor: barFillColor,
                            }}
                          >
                            {/* Signature tbench end-cap whisker */}
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 flex items-center pointer-events-none">
                              <span className="w-1.5 h-0.5 bg-slate-400 inline-block" />
                              <span className="w-0.5 h-3.5 bg-slate-600 inline-block" />
                              <span className="w-1.5 h-0.5 bg-slate-400 inline-block" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* First Appearance */}
                    <td className="py-2.5 px-3 font-mono text-slate-600 text-right whitespace-nowrap">
                      {row.firstAppearance}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. PARETO VIEW (SCATTER PLOT: APPEARANCE VS USAGE)        */}
      {/* ======================================================== */}
      {viewTab === 'pareto' && (
        <div className="py-6 border-b border-slate-200">
          <div className="mb-4 flex items-center justify-between text-xs font-mono text-slate-500">
            <span>PARETO FRONTIER: FIRST APPEARANCE (X) VS 2025 USAGE % (Y)</span>
            <span>1949 — 2014+</span>
          </div>

          <div className="relative h-96 w-full border border-slate-200 rounded-lg bg-slate-50/40 p-6 overflow-hidden">
            {/* Horizontal Grid lines */}
            {[60, 40, 20].map((val) => (
              <div
                key={val}
                className="absolute left-10 right-6 border-t border-dashed border-slate-200"
                style={{ top: `${100 - (val / 70) * 100}%` }}
              >
                <span className="absolute -top-3 -left-8 text-[10px] font-mono text-slate-400">
                  {val}%
                </span>
              </div>
            ))}

            {/* Vertical Year Grid lines */}
            {[1950, 1970, 1980, 1990, 1995, 2000, 2010].map((yr) => {
              const xPos = ((yr - 1948) / (2016 - 1948)) * 100;
              return (
                <div
                  key={yr}
                  className="absolute top-4 bottom-8 border-l border-slate-200 pointer-events-none"
                  style={{ left: `calc(40px + (100% - 70px) * (${xPos} / 100))` }}
                >
                  <span className="absolute -bottom-5 -left-3 text-[10px] font-mono text-slate-400">
                    {yr}
                  </span>
                </div>
              );
            })}

            {/* Scatter Points */}
            {PROGRAMMING_LANGUAGES.map((lang) => {
              const meta = ABSTRACTION_BANDS[lang.abstractionBand];
              const isSelected = selectedLanguageId === lang.id;
              const xPos = Math.max(0, Math.min(100, ((lang.numericYear - 1948) / (2016 - 1948)) * 100));
              const yPos = Math.max(0, Math.min(100, (lang.usagePercentage / 70) * 100));
              const pointColor = colorMode === 'monochrome' ? '#000000' : meta.color.base;

              return (
                <button
                  key={lang.id}
                  onClick={() => onSelectLanguage(lang)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all cursor-pointer ${
                    isSelected ? 'z-30 scale-125' : 'z-10 hover:scale-125'
                  }`}
                  style={{
                    left: `calc(40px + (100% - 70px) * (${xPos} / 100))`,
                    top: `calc(100% - 32px - (100% - 56px) * (${yPos} / 100))`,
                  }}
                  title={`${lang.name} (${lang.firstAppearance}): ${lang.usagePercentage}%`}
                >
                  <div
                    className="w-3.5 h-3.5 rounded-full border-2 border-white shadow-2xs flex items-center justify-center"
                    style={{ backgroundColor: pointColor }}
                  />

                  {/* Label */}
                  <span className="absolute left-full ml-1.5 top-1/2 -translate-y-1/2 font-mono text-[10px] font-bold text-slate-800 whitespace-nowrap bg-white/90 px-1 rounded shadow-2xs">
                    {lang.name} ({lang.usagePercentage.toFixed(1)}%)
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. LADDER VIEW (ARCHITECTURAL ABSTRACTION STACK)           */}
      {/* ======================================================== */}
      {viewTab === 'ladder' && (
        <div className="py-6 border-b border-slate-200 space-y-2.5 font-mono">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>ABSTRACTION SPECTRUM: TIER 08 (DOMAIN-SPECIFIC) → TIER 01 (MACHINE-NEAR)</span>
            <span>8 TIERS</span>
          </div>

          {[...bandsList].reverse().map((band) => {
            const meta = ABSTRACTION_BANDS[band];
            const bandLangs = PROGRAMMING_LANGUAGES.filter((l) => l.abstractionBand === band);

            return (
              <div
                key={band}
                className="p-3 border border-slate-200 rounded flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-[240px]">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: meta.color.base }}
                  />
                  <span className="text-xs font-bold text-black uppercase">
                    TIER 0{meta.order}: {band}
                  </span>
                </div>

                <div className="flex-1 flex flex-wrap items-center gap-2">
                  {bandLangs.map((lang) => {
                    const isSelected = selectedLanguageId === lang.id;
                    return (
                      <button
                        key={lang.id}
                        onClick={() => onSelectLanguage(lang)}
                        className={`px-2.5 py-1 rounded text-xs border transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'border-black bg-black text-white font-bold'
                            : 'border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-400'
                        }`}
                      >
                        <span>{lang.name}</span>
                        <span className={`text-[10px] tabular-nums ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                          {lang.usagePercentage.toFixed(1)}%
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Minimal Footer Info */}
      <div className="py-3 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
        <div>
          <span>¹ Bash/Shell combined category</span>
          <span className="mx-2">·</span>
          <span>Multi-select survey (percentages do not total 100%)</span>
        </div>
        <button
          onClick={onOpenNotes}
          className="text-slate-600 hover:text-black underline cursor-pointer"
        >
          View all 5 interpretation notes →
        </button>
      </div>
    </div>
  );
};
