import React from 'react';

const SkeletonPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="w-full flex justify-between items-center mb-10 pt-4">
        <div className="h-8 bg-gray-200 rounded-lg w-1/3"></div>
        <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
      </div>

      {/* Hero / Title Section */}
      <div className="mb-12 text-center max-w-lg mx-auto w-full">
        <div className="h-4 bg-gray-200 rounded w-24 mx-auto mb-4"></div>
        <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto mb-6"></div>
        <div className="space-y-3">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6 mx-auto"></div>
        </div>
      </div>

      {/* Content Cards Skeleton */}
      <div className="grid gap-6 max-w-2xl mx-auto w-full">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-gray-100 h-32 flex flex-col justify-center"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
              <div className="h-5 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="pl-14">
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonPage;
