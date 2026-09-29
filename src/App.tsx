/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { LanguageTable } from './components/LanguageTable';
import { LanguageDetailModal } from './components/LanguageDetailModal';
import { MethodologyModal } from './components/MethodologyModal';
import { PROGRAMMING_LANGUAGES, LanguageRecord } from './data/languages';

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageRecord | null>(null);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleExportCsv = () => {
    let csv = 'Language,Abstraction Band,First Public Appearance,Usage Percentage (2025),Execution Model\n';
    PROGRAMMING_LANGUAGES.forEach((row) => {
      const name = row.name.includes(',') ? `"${row.name}"` : row.name;
      const band = row.abstractionBand.includes(',') ? `"${row.abstractionBand}"` : row.abstractionBand;
      csv += `${name},${band},${row.firstAppearance},${row.usagePercentage}%,"${row.executionModel}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'programming_languages_usage_2025.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans antialiased selection:bg-slate-200">
      {/* Lean Header */}
      <Header
        onOpenNotes={() => setIsNotesOpen(true)}
        onExportCsv={handleExportCsv}
        isCopied={isCopied}
      />

      {/* Main Table Interface */}
      <main className="flex-1">
        <LanguageTable
          onSelectLanguage={(lang) => setSelectedLanguage(lang)}
          selectedLanguageId={selectedLanguage?.id}
          onOpenNotes={() => setIsNotesOpen(true)}
        />
      </main>

      {/* Language Inspection Modal */}
      <LanguageDetailModal
        language={selectedLanguage}
        onClose={() => setSelectedLanguage(null)}
      />

      {/* Survey Interpretation Notes Modal */}
      <MethodologyModal
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
      />
    </div>
  );
}
