export const LandingSkeleton = () => {
  return (
    <div className='bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto my-4 animate-pulse'>
      <div className='w-full h-64 bg-gray-200 rounded-md'></div>

      <div className='p-4 text-center'>
        <div className='h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4'></div>
        <div className='space-y-2'>
          <div className='h-4 bg-gray-200 rounded w-5/6 mx-auto'></div>
          <div className='h-4 bg-gray-200 rounded w-2/3 mx-auto'></div>
        </div>
      </div>

      <div className='mt-4 flex justify-center'>
        <div className='bg-gray-200 rounded-full h-10 w-32'></div>
      </div>

      <div className='mt-4 flex justify-center gap-4'>
        <div className='bg-gray-200 rounded-lg h-10 w-24'></div>
        <div className='bg-gray-200 rounded-lg h-10 w-24'></div>
      </div>
    </div>
  );
};

export default LandingSkeleton;
