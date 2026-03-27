import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-10">
    <div className="loading-spinner"></div>
  </div>
);

const ErrorAlert = ({ message, onClose }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-gap gap-3">
    <FiAlertCircle className="text-red-600 flex-shrink-0 mt-0.5" />
    <div className="flex-1">
      <p className="text-red-800">{message}</p>
    </div>
    {onClose && (
      <button
        onClick={onClose}
        className="text-red-600 hover:text-red-800 font-bold"
      >
        ×
      </button>
    )}
  </div>
);

const SuccessAlert = ({ message }) => (
  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 flex items-gap gap-3">
    <div className="text-green-800">{message}</div>
  </div>
);

export { LoadingSpinner, ErrorAlert, SuccessAlert };
