import React from "react";

interface ErrorModalProps {
  error: string;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ error, onClose }) => {
  return (
    <div
      onClick={onClose}
      className="fixed z-50 inset-0 flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
      <div className="bg-white rounded-lg p-8 max-w-md mx-auto z-10 min-w-[12.5rem]">
        <h2 className="text-xl font-bold mb-4">Error 🤖</h2>
        <p className="mb-6">{error}</p>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
