import React from 'react';
import { AlertOctagon } from 'lucide-react';

interface ErrorStateProps {
  message: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <AlertOctagon className="h-16 w-16 text-red-500 mb-4" />
      <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
      <p className="text-gray-400 mb-6">{message}</p>
      
      <div className="bg-gray-800 p-6 rounded-lg max-w-lg mx-auto">
        <h3 className="font-semibold mb-4">Possible solutions:</h3>
        <ul className="text-left space-y-2">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Check if you have provided a valid YouTube API key in the service</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Verify that the channel username is correct</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Refresh the page and try again</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Check your network connection</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ErrorState;