import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, Grid3x3, Layers, Image as ImageIcon } from 'lucide-react';

const Workspace = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dark-950 flex">
      <aside className="w-64 bg-dark-900 border-r-3 border-white shadow-neubrutal flex flex-col">
        <div className="p-4 border-b-3 border-white">
          <h2 className="text-xl font-bold text-grass-400">Workspace</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-dark-700 border-2 border-transparent hover:border-white transition-all">
            <Grid3x3 size={20} />
            <span>Grids</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-dark-700 border-2 border-transparent hover:border-white transition-all">
            <Layers size={20} />
            <span>Layers</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-dark-700 border-2 border-transparent hover:border-white transition-all">
            <ImageIcon size={20} />
            <span>Image</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-dark-700 border-2 border-transparent hover:border-white transition-all">
            <Settings size={20} />
            <span>Settings</span>
          </button>
        </nav>
        <div className="p-4 border-t-3 border-white">
          <button onClick={() => navigate('/gallery')} className="w-full bg-dark-800 text-white px-4 py-3 font-bold border-3 border-white shadow-neubrutal hover:shadow-neubrutal-md transition-all">
            Back to Gallery
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="bg-dark-900 border-b-3 border-white shadow-neubrutal px-6 py-4 flex justify-between items-center">
          <button onClick={() => navigate('/gallery')} className="flex items-center gap-2 text-gray-400 hover:text-white">
            <ArrowLeft size={20} /> Gallery
          </button>
          <h1 className="text-xl font-bold text-grass-400">Untitled Project</h1>
          <div className="w-20"></div>
        </header>
        <div className="flex-1 flex items-center justify-center bg-dark-800">
          <div className="text-center">
            <ImageIcon size={64} className="mx-auto mb-4 text-gray-600" />
            <p className="text-gray-400 text-xl">Reference Image Area</p>
            <p className="text-gray-500 mt-2">Upload an image to start working</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Workspace;
