import React from 'react';


const SkeletonDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-6 animate-pulse">
      {/* Greeting Skeleton */}
      <div className="mb-8 mt-20 md:mt-0">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-2xl border border-gray-100 h-32 flex flex-col justify-between"
          >
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-8 bg-gray-200 rounded w-full mt-auto"></div>
          </div>
        ))}
      </div>

      {/* Main Charts Area Skeleton */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Big Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 h-96">
          <div className="flex justify-between mb-6">
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="h-6 bg-gray-200 rounded w-12"></div>
          </div>
          <div className="h-64 bg-gray-100 rounded-xl"></div>
        </div>

        {/* Side Cards */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 h-44">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-gray-100 h-44">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonDashboard;
