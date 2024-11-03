import React from 'react';

const NotFound = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-black text-white'>
      <h1 className='mb-4 font-light text-4xl sm:text-6xl'>404</h1>
      <div className='mb-4 h-px w-10 bg-white sm:w-12' />
      <p className='text-normal w-full text-center font-light sm:w-full sm:text-xl'>
        This Page Cannot Be Found
      </p>
    </div>
  );
};

export default NotFound;
