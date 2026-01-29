import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-64 flex flex-col animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
        <div className="w-8 h-4 bg-gray-200 rounded"></div>
      </div>

      <div className="space-y-3 flex-1">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>

      <div className="flex justify-between mt-auto pt-4 border-t border-gray-50">
        <div className="w-16 h-4 bg-gray-200 rounded"></div>
        <div className="w-16 h-4 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
