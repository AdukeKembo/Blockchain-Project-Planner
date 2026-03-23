
import React from 'react';
import { ExclamationTriangleIcon } from './icons/Icons';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative" role="alert">
      <div className="flex items-center">
        <ExclamationTriangleIcon className="h-5 w-5 mr-3" />
        <div>
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{message}</span>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
