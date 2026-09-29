import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  ChevronDown,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import {
  PROGRAMMING_LANGUAGES,
  ABSTRACTION_BANDS,
  AbstractionBand,
  LanguageRecord,
} from '../data/languages';

interface LanguageTableProps {
  onSelectLanguage: (lang: LanguageRecord) => void;
  selectedLanguageId?: string;
  onOpenNotes: () => void;
}

type SortField = 'rank' | 'usage' | 'name' | 'year';
type SortDirection = 'asc' | 'desc';

export const LanguageTable: React.FC<LanguageTableProps> = ({
  onSelectLanguage,
  selectedLanguageId,
  onOpenNotes,
}) => {
  const [selectedBand, setSelectedBand] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('usage');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [colorMode, setColorMode] = useState<'color' | 'black'>('black');
  const [isBandDropdownOpen, setIsBandDropdownOpen] = useState(false);

  const bandsList = (Object.keys(ABSTRACTION_BANDS) as AbstractionBand[]).sort(
    (a, b) => ABSTRACTION_BANDS[a].order - ABSTRACTION_BANDS[b].order
  );

  const getShortBandTag = (band: AbstractionBand) => {
    switch (band) {
      case 'Machine-near':
        return 'machine-near';
      case 'Systems-level':
        return 'systems';
      case 'Systems/application':
        return 'systems-app';
      case 'Managed application':
        return 'managed';
      case 'High-level general-purpose':
        return 'general-purpose';
      case 'High-level statistical':
        return 'statistical';
      case 'High-level scripting':
        return 'scripting';
      case 'High-level domain-specific':
        return 'domain-specific';
      default:
        return band;
    }
  };

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
      if (selectedBand !== 'all' && item.abstractionBand !== selectedBand) {
        return false;
      }

      if (!searchTerm) return true;
      const q = searchTerm.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.abstractionBand.toLowerCase().includes(q) ||
        item.firstAppearance.toLowerCase().includes(q) ||
        item.executionModel.toLowerCase().includes(q)
      );
    }).sort((a, b) => {
      let comp = 0;
      if (sortField === 'rank' || sortField === 'usage') {
        comp = a.usagePercentage - b.usagePercentage;
      } else if (sortField === 'name') {
        comp = a.name.localeCompare(b.name);
      } else if (sortField === 'year') {
        comp = a.numericYear - b.numericYear;
      }

      return sortDirection === 'asc' ? comp : -comp;
    });
  }, [selectedBand, sortField, sortDirection, searchTerm]);

  const sortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 opacity-60 ml-1 inline" />;
    }
    return sortDirection === 'asc' ? (
      <ArrowUp className="w-3.5 h-3.5 text-slate-900 ml-1 inline" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5 text-slate-900 ml-1 inline" />
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Exact Terminal-Bench Hero Title typography */}
      <div className="pt-2 pb-6 text-center max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tighter uppercase text-slate-900">
          PROGRAMMING LANGUAGES POPULARITY 2025
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-500 font-normal tracking-tighter">
          Popular programming languages from low-level to high-level
        </p>
      </div>

      {/* Terminal-Bench Style Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 pr-7 py-1.5 text-sm bg-white border border-slate-200 rounded-none w-48 sm:w-60 text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-slate-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right Toolbar Controls */}
        <div className="flex items-center gap-2 text-sm">
          {/* Black vs Color Toggle */}
          <div className="flex items-center border border-slate-200 rounded-none text-sm bg-slate-50 p-0.5">
            <button
              onClick={() => setColorMode('black')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-none text-sm cursor-pointer transition-colors ${
                colorMode === 'black'
                  ? 'bg-black text-white font-medium shadow-2xs'
                  : 'text-slate-500 hover:text-black font-normal'
              }`}
              title="Black bars (exact terminal-bench-website style)"
            >
              <span className="w-2.5 h-2.5 bg-current inline-block rounded-none" />
              <span>Black</span>
            </button>
            <button
              onClick={() => setColorMode('color')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-none text-sm cursor-pointer transition-colors ${
                colorMode === 'color'
                  ? 'bg-black text-white font-medium shadow-2xs'
                  : 'text-slate-500 hover:text-black font-normal'
              }`}
              title="Color bars by abstraction tier"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" />
              <span>Color</span>
            </button>
          </div>

          {/* Tiers Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsBandDropdownOpen(!isBandDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-none text-slate-700 hover:border-slate-300 font-medium cursor-pointer text-sm"
            >
              <span>
                {selectedBand === 'all'
                  ? `Tiers (${filteredAndSorted.length}/${PROGRAMMING_LANGUAGES.length})`
                  : selectedBand}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isBandDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setIsBandDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-1 w-64 bg-white border border-slate-200 rounded-none shadow-lg z-30 py-1 divide-y divide-slate-100 max-h-80 overflow-y-auto text-sm">
                  <button
                    onClick={() => {
                      setSelectedBand('all');
                      setIsBandDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-sm flex items-center justify-between hover:bg-slate-50 cursor-pointer ${
                      selectedBand === 'all' ? 'font-medium text-black bg-slate-50' : 'text-slate-700 font-normal'
                    }`}
                  >
                    <span>All Tiers</span>
                    <span className="text-slate-400 font-normal">17</span>
                  </button>

                  {bandsList.map((band) => {
                    const meta = ABSTRACTION_BANDS[band];
                    const count = PROGRAMMING_LANGUAGES.filter((l) => l.abstractionBand === band).length;
                    const isSelected = selectedBand === band;

                    return (
                      <button
                        key={band}
                        onClick={() => {
                          setSelectedBand(band);
                          setIsBandDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-left text-sm flex items-center justify-between hover:bg-slate-50 cursor-pointer ${
                          isSelected ? 'font-medium text-black bg-slate-50' : 'text-slate-700 font-normal'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: meta.color.base }}
                          />
                          <span className="truncate">{band}</span>
                        </div>
                        <span className="text-slate-400 font-normal">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Terminal-Bench Table Container matching md:rounded-xl md:border */}
      <div className="-mx-4 overflow-hidden rounded-none border border-x-0 border-slate-200 bg-white md:mx-0 md:rounded-xl md:border">
        <div className="overflow-x-auto">
          <table className="w-full caption-bottom text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                {/* RANK */}
                <th
                  onClick={() => handleSort('rank')}
                  className="h-12 px-6 text-left align-middle font-medium uppercase whitespace-nowrap text-slate-900 text-sm max-[679px]:px-3 cursor-pointer select-none w-14"
                >
                  <span className="inline-flex items-center gap-1">
                    RANK {sortIcon('rank')}
                  </span>
                </th>

                {/* LANGUAGE */}
                <th
                  onClick={() => handleSort('name')}
                  className="h-12 px-6 text-left align-middle font-medium uppercase whitespace-nowrap text-slate-900 text-sm max-[679px]:px-3 cursor-pointer select-none"
                  style={{ width: '25%' }}
                >
                  <span className="inline-flex items-center gap-1">
                    LANGUAGE {sortIcon('name')}
                  </span>
                </th>

                {/* USAGE RATE (matches RESOLUTION RATE from Terminal-Bench) */}
                <th
                  onClick={() => handleSort('usage')}
                  className="h-12 px-6 text-left align-middle font-medium uppercase whitespace-nowrap text-slate-900 text-sm max-[679px]:px-3 cursor-pointer select-none"
                  style={{ width: '45%' }}
                >
                  <span className="inline-flex items-center gap-1">
                    USAGE RATE {sortIcon('usage')}
                  </span>
                </th>

                {/* RELEASE DATE / INITIAL RELEASE */}
                <th
                  onClick={() => handleSort('year')}
                  className="h-12 px-6 text-left align-middle font-medium uppercase whitespace-nowrap text-slate-900 text-sm max-[679px]:px-3 cursor-pointer select-none text-right"
                  style={{ width: '15%' }}
                >
                  <span className="inline-flex items-center gap-1 justify-end w-full">
                    RELEASE DATE {sortIcon('year')}
                  </span>
                </th>

                {/* EXECUTION MODEL */}
                <th
                  className="h-12 px-6 text-right align-middle font-medium uppercase whitespace-nowrap text-slate-900 text-sm max-[679px]:px-3 hidden sm:table-cell"
                  style={{ width: '15%' }}
                >
                  EXECUTION
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 [&_tr:last-child]:border-0">
              {filteredAndSorted.map((lang) => {
                const meta = ABSTRACTION_BANDS[lang.abstractionBand];
                const isSelected = selectedLanguageId === lang.id;
                const barWidth = Math.min((lang.usagePercentage / 70) * 100, 100);
                const barFillColor = colorMode === 'black' ? '#000000' : meta.color.base;

                return (
                  <tr
                    key={lang.id}
                    onClick={() => onSelectLanguage(lang)}
                    className={`border-b border-slate-100 transition-colors hover:bg-slate-50 cursor-pointer ${
                      isSelected ? 'bg-slate-50' : ''
                    }`}
                  >
                    {/* Rank cell (font-normal text-slate-500 tabular-nums) */}
                    <td className="h-12 px-6 py-2 align-middle whitespace-nowrap text-sm text-slate-500 max-[679px]:px-3 tabular-nums">
                      {lang.usageRank}
                    </td>

                    {/* Language: Colored Dot + Bold Name + Muted tag */}
                    <td className="h-12 px-6 py-2 align-middle whitespace-nowrap text-sm max-[679px]:px-3">
                      <div className="flex items-center gap-2">
                        {/* Colored circle indicating tier */}
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: meta.color.base }}
                          title={`Tier: ${lang.abstractionBand}`}
                        />
                        <strong className="font-semibold text-slate-900">
                          {lang.name}
                        </strong>
                        {lang.footnote && (
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenNotes();
                            }}
                            className="text-xs text-amber-600 font-medium hover:underline"
                            title={lang.footnote}
                          >
                            ¹
                          </span>
                        )}
                        <span className="text-xs text-slate-400 font-normal">
                          ({getShortBandTag(lang.abstractionBand)})
                        </span>
                      </div>
                    </td>

                    {/* Usage Rate matching Terminal-Bench AccuracyBarCell layout */}
                    <td className="h-12 px-6 py-2 align-middle whitespace-nowrap text-sm max-[679px]:px-3">
                      <div className="flex items-center gap-3">
                        {/* Bold Metric Value first, matching Terminal-Bench */}
                        <div className="w-16 shrink-0 tabular-nums">
                          <strong className="font-semibold text-slate-900">
                            {lang.usagePercentage.toFixed(1)}%
                          </strong>
                        </div>

                        {/* Flat Rectangular Bar (h-3 rounded-none bg-slate-100) */}
                        <div className="relative h-3 min-w-0 flex-1 rounded-none bg-slate-100 overflow-hidden">
                          <div
                            className="absolute inset-y-0 left-0 rounded-none transition-all duration-200"
                            style={{
                              width: `${barWidth}%`,
                              backgroundColor: barFillColor,
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Release Date */}
                    <td className="h-12 px-6 py-2 align-middle whitespace-nowrap text-sm text-slate-600 text-right tabular-nums max-[679px]:px-3 font-normal">
                      {lang.firstAppearance}
                    </td>

                    {/* Execution Model */}
                    <td className="h-12 px-6 py-2 align-middle whitespace-nowrap text-sm text-slate-500 text-right truncate hidden sm:table-cell max-[679px]:px-3 font-normal">
                      <span className="truncate max-w-[150px] inline-block">
                        {lang.executionModel.split(' ')[0]}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Terminal-Bench Style Footer */}
      <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm text-slate-500">
        {/* Tier Color Legend */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-slate-400 text-xs uppercase font-medium">Tiers:</span>
          {bandsList.map((band) => {
            const meta = ABSTRACTION_BANDS[band];
            return (
              <div key={band} className="flex items-center gap-1.5 text-xs text-slate-600">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: meta.color.base }}
                />
                <span className="font-normal">{getShortBandTag(band)}</span>
              </div>
            );
          })}
        </div>

        {/* Footnote & Notes */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>¹ Combined Bash/Shell</span>
          <span>·</span>
          <button
            onClick={onOpenNotes}
            className="hover:text-black underline cursor-pointer font-normal"
          >
            Survey Notes
          </button>
        </div>
      </div>
    </div>
  );
};
