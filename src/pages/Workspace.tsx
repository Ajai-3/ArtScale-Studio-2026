import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { db, type Project } from '../lib/db';

const Workspace = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [gridSpacing, setGridSpacing] = useState(2.5);
  const [showVertical, setShowVertical] = useState(true);
  const [showHorizontal, setShowHorizontal] = useState(true);
  const [showDiagonal, setShowDiagonal] = useState(false);
  const [valueStudy, setValueStudy] = useState(false);

  useEffect(() => {
    if (id) {
      loadProject();
    }
  }, [id]);

  const loadProject = async () => {
    if (id) {
      const p = await db.projects.get(parseInt(id));
      setProject(p || null);
    }
  };

  const width = (project?.widthCm || 21) * 37.8;
  const height = (project?.heightCm || 29.7) * 37.8;
  const gapCm = gridSpacing;

  return (
    <div className="min-h-screen bg-dark-950 flex">
      <main className="flex-1 flex flex-col">
        <header className="bg-dark-900 border-b-3 border-white shadow-neubrutal px-6 py-4 flex justify-between items-center">
          <button onClick={() => navigate('/gallery')} className="flex items-center gap-2 text-gray-400 hover:text-white">
            <ArrowLeft size={20} /> Gallery
          </button>
          <h1 className="text-xl font-bold text-grass-400">{project?.name || 'Untitled Project'}</h1>
          <div className="w-20"></div>
        </header>
        <div className="flex-1 flex items-center justify-center bg-dark-800 overflow-auto p-8">
          {project ? (
            <div className="relative bg-dark-950 border-3 border-white shadow-neubrutal-lg">
              {typeof project.imageData === 'string' ? (
                <img 
                  src={project.imageData} 
                  alt={project.name} 
                  className={`max-w-none ${valueStudy ? 'grayscale' : ''}`}
                  style={{ width: `${width}px`, height: `${height}px` }}
                />
              ) : (
                <img 
                  src={URL.createObjectURL(project.imageData)} 
                  alt={project.name} 
                  className={`max-w-none ${valueStudy ? 'grayscale' : ''}`}
                  style={{ width: `${width}px`, height: `${height}px` }}
                />
              )}
              <svg className="absolute inset-0 pointer-events-none" width={width} height={height}>
                {showVertical && Array.from({ length: Math.floor((project.widthCm || 21) / gapCm) + 1 }, (_, i) => (
                  <line key={`v-${i}`} x1={i * gapCm * 37.8} y1={0} x2={i * gapCm * 37.8} y2={height} stroke="white" strokeWidth="1" opacity="0.5" />
                ))}
                {showHorizontal && Array.from({ length: Math.floor((project.heightCm || 29.7) / gapCm) + 1 }, (_, i) => (
                  <line key={`h-${i}`} x1={0} y1={i * gapCm * 37.8} x2={width} y2={i * gapCm * 37.8} stroke="white" strokeWidth="1" opacity="0.5" />
                ))}
                {showDiagonal && (
                  <>
                    <line x1={0} y1={0} x2={width} y2={height} stroke="white" strokeWidth="1" opacity="0.5" />
                    <line x1={width} y1={0} x2={0} y2={height} stroke="white" strokeWidth="1" opacity="0.5" />
                  </>
                )}
              </svg>
            </div>
          ) : (
            <div className="text-center">
              <ImageIcon size={64} className="mx-auto mb-4 text-gray-600" />
              <p className="text-gray-400 text-xl">No project selected</p>
              <p className="text-gray-500 mt-2">Select a project from the gallery</p>
            </div>
          )}
        </div>
      </main>

      <aside className="w-72 bg-dark-900 border-l-3 border-white shadow-neubrutal flex flex-col">
        <div className="p-4 border-b-3 border-white">
          <h2 className="text-xl font-bold text-grass-400">Grids</h2>
        </div>
        
        <div className="flex-1 p-4 space-y-6 overflow-auto">
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-2">Cell Size (cm)</label>
            <input
              type="number"
              value={gridSpacing}
              onChange={(e) => setGridSpacing(parseFloat(e.target.value) || 1)}
              step="0.5"
              min="0.5"
              className="w-full bg-dark-950 border-2 border-white/20 text-white px-3 py-2 focus:border-grass-400 outline-none"
            />
            <div className="flex gap-2 mt-3">
              {[1, 2, 2.5, 5].map((val) => (
                <button
                  key={val}
                  onClick={() => setGridSpacing(val)}
                  className={`flex-1 py-2 text-sm font-bold border-2 ${gridSpacing === val ? 'border-grass-400 bg-grass-500/10' : 'border-white/20 hover:border-white/40'}`}
                >
                  {val}cm
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={showVertical} onChange={(e) => setShowVertical(e.target.checked)} className="w-5 h-5" />
              <span>Vertical Lines</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={showHorizontal} onChange={(e) => setShowHorizontal(e.target.checked)} className="w-5 h-5" />
              <span>Horizontal Lines</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={showDiagonal} onChange={(e) => setShowDiagonal(e.target.checked)} className="w-5 h-5" />
              <span>Diagonal Lines</span>
            </label>
          </div>

          <div className="border-t-2 border-dark-700 pt-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={valueStudy} onChange={(e) => setValueStudy(e.target.checked)} className="w-5 h-5" />
              <span>Value Study (B&W)</span>
            </label>
          </div>

          {project && (
            <div className="border-t-2 border-dark-700 pt-4">
              <h3 className="font-bold text-white mb-2">Paper Size</h3>
              <p className="text-sm text-gray-400">{project.paperSize}</p>
              <p className="text-sm text-gray-400">{project.widthCm} × {project.heightCm} cm</p>
              <p className="text-sm text-gray-400 mt-1">Aspect: {project.aspectRatio.toFixed(3)}</p>
            </div>
          )}
        </div>

        <div className="p-4 border-t-3 border-white">
          <button onClick={() => navigate('/gallery')} className="w-full bg-dark-800 text-white px-4 py-3 font-bold border-3 border-white shadow-neubrutal hover:shadow-neubrutal-md transition-all">
            Back to Gallery
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Workspace;