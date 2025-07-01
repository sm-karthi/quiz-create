import React from 'react';
import CodeEditor from './CodeEditor';

function Modal({ isOpen, onClose, code, setCode }) {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-[95%] max-w-4xl p-6 rounded-xl shadow-lg space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Code Editor</h2>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-600 text-xl font-bold cursor-pointer"
          >
            ×
          </button>
        </div>

        <CodeEditor code={code} setCode={setCode} />
      </div>
    </div>
  );
}

export default Modal;
