import React from 'react';

const Spinner = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center'>
      <div className='animate-ping w-16 h-16 rounded-full bg-sky-400'></div>
    </div>
  );
}

export default Spinner;
