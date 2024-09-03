
import React from 'react';
import Chart from './components/Chart';

const App: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Real-Time Cryptocurrency Chart</h1>
      <div className='w-full'>
 <Chart />
      </div>
     
    </div>
  );
};

export default App;
