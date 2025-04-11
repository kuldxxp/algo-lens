//import React from 'react';
//
//const CodePreview = ({ code, highlightLineIndex }) => {
//  return (
//    <pre className="mockup-code rounded-lg text-xs font-code leading-none overflow-auto">
//      {code.split('\n').map((line, index) => (
//        <p
//          key={index}
//          className={`px-4 py-2 transition-all duration-100 ${index === highlightLineIndex ? 'text-primary-content bg-primary ' : ''}`}
//        >
//          {line}
//        </p>
//      ))}
//    </pre>
//  );
//};
//
//export default CodePreview;

import React, { useState } from 'react';

interface CodeData {
  [language: string]: string;
}

interface CodePreviewProps {
  code: CodeData;
  defaultLanguage?: string;
  highlightLineIndex: number;
}

const CodePreview: React.FC<CodePreviewProps> = ({
  code,
  defaultLanguage = 'python',
  highlightLineIndex
}) => {
  const availableLanguages = Object.keys(code);

  const [selectedLanguage, setSelectedLanguage] = useState(
    availableLanguages.includes(defaultLanguage) ? defaultLanguage : availableLanguages[0]
  );

  const currentCode = code[selectedLanguage] || '';

  return (
    <div className="relative">
      <div className="absolute top-2 right-2 z-10">
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="select select-sm select-bordered bg-base-200 text-xs font-medium"
        >
          {availableLanguages.map(lang => (
            <option key={lang} value={lang}>
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <pre className="mockup-code rounded-lg text-xs font-code leading-none overflow-auto pt-12">
        {currentCode.split('\n').map((line, index) => (
          <p
            key={index}
            className={`px-4 py-2 transition-all duration-100 ${index === highlightLineIndex ? 'text-primary-content bg-primary ' : ''}`}
          >
            {line}
          </p>
        ))}
      </pre>
    </div>
  );
};

export default CodePreview;