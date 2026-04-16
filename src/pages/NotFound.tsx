import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center">
      <div className="text-center">
        <div className="w-24 h-24 bg-dark-800 border-3 border-white shadow-neubrutal-xl flex items-center justify-center mx-auto mb-8">
          <AlertTriangle size={48} className="text-grass-400" />
        </div>
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-gray-400 mb-8">Page not found</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="bg-dark-800 text-white px-6 py-3 font-bold border-3 border-white shadow-neubrutal hover:shadow-neubrutal-md hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-grass-500 text-dark-950 px-6 py-3 font-bold border-3 border-white shadow-neubrutal hover:shadow-neubrutal-md hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;