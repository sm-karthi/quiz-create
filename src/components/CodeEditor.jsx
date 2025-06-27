import React from 'react';
import Editor from '@monaco-editor/react';

function CodeEditor({ code, setCode }) {

  function updateCode(newValue) {
    setCode(newValue);
  }

  return (
    <div className="h-72 border border-gray-300 rounded-lg overflow-hidden">

      <Editor
        defaultLanguage="javascript"
        value={code}
        onChange={updateCode}
        theme="vs-dark"
      />

    </div>

  );
}

export default CodeEditor;
