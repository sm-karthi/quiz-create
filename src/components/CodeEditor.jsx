import React from 'react';
import Editor from '@monaco-editor/react';

function CodeEditor({ isOpen, onClose, code, setCode }) {

  function updateCode(newValue) {
    setCode(newValue);
  }

  return (
    <div className='flex gap-3 pl-4'>


      <div className="h-64 border w-full border-gray-300 rounded-lg overflow-hidden">

        <Editor
          defaultLanguage="javascript"
          value={code}
          onChange={updateCode}
          theme="vs-dark"
        />

      </div>

      <button
        onClick={onClose}
        className="bg-red-500 text-sm rounded-full w-6 h-6 text-white hover:bg-red-700 font-bold
         cursor-pointer shadow-md">
        X
      </button>

    </div>



  );
}

export default CodeEditor;
