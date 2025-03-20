'use client';

import { Frown, SmilePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NoResultsFoundProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function NoResultsFound({
  title = 'Whoops, no matches',
  message = "We couldn't find any search results. Give it another go",
  onRetry,
}: NoResultsFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center max-w-md mx-auto">
      <div className="relative w-32 h-32 mb-6">
        {/* Folder/document background */}
        <div className="absolute inset-0 bg-gray-100 rounded-lg"></div>

        {/* Folder tab */}
        <div className="absolute top-0 left-4 w-8 h-3 bg-gray-100 rounded-t-md"></div>

        {/* Magnifying glass with sad face */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-gray-300 flex items-center justify-center">
              <Frown className="w-8 h-8 text-gray-400" />
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-10 bg-gray-300 rounded-full transform rotate-45 translate-x-3 translate-y-2"></div>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-medium text-gray-700 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6">{message}</p>

      <div className="flex items-center">
        {onRetry && (
          <Button onClick={onRetry} variant="outline" className="mr-2">
            Try again
          </Button>
        )}
        <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center">
          <SmilePlus className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
}
