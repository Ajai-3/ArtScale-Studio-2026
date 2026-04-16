import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db, type Project } from '../lib/db';
import { Trash2, ArrowLeft } from 'lucide-react';

const Gallery = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const all = await db.projects.toArray();
    setProjects(all.reverse());
  };

  const handleDelete = async (id: number) => {
    await db.projects.delete(id);
    setDeleteId(null);
    loadProjects();
  };

  return (
    <div className="min-h-screen bg-dark-950">
      <header className="bg-dark-900 border-b-3 border-white shadow-neubrutal">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-400 hover:text-white">
            <ArrowLeft size={20} /> Back
          </button>
          <h1 className="text-2xl font-bold text-grass-400">Gallery</h1>
          <button onClick={() => navigate('/crop')} className="bg-grass-500 text-dark-950 px-6 py-3 font-bold border-3 border-white shadow-neubrutal hover:shadow-neubrutal-md transition-all">
            New Project
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl mb-6">No projects yet</p>
            <button onClick={() => navigate('/crop')} className="bg-grass-500 text-dark-950 px-8 py-4 font-bold border-3 border-white shadow-neubrutal hover:shadow-neubrutal-md transition-all">
              Create Your First Project
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-dark-800 border-3 border-white shadow-neubrutal overflow-hidden group">
                <div className="aspect-square bg-dark-700 relative overflow-hidden">
                  {typeof project.imageData === 'string' ? (
                    <img src={project.imageData} alt={project.name} className="w-full h-full object-cover" />
                  ) : (
                    <img src={URL.createObjectURL(project.imageData)} alt={project.name} className="w-full h-full object-cover" />
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button onClick={() => navigate(`/workspace/${project.id}`)} className="bg-grass-500 text-dark-950 px-4 py-2 font-bold border-2 border-white">
                      Open
                    </button>
                    <button onClick={() => setDeleteId(project.id || null)} className="bg-red-500 text-white px-4 py-2 font-bold border-2 border-white">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white truncate">{project.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{project.paperSize} • {project.widthCm} × {project.heightCm} cm</p>
                  <p className="text-xs text-gray-500 mt-2">{new Date(project.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {deleteId && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-dark-800 border-3 border-white shadow-neubrutal-xl p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Delete Project?</h3>
            <p className="text-gray-400 mb-6">This action cannot be undone.</p>
            <div className="flex gap-4">
              <button onClick={() => setDeleteId(null)} className="flex-1 bg-dark-700 text-white px-4 py-3 font-bold border-3 border-white">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-500 text-white px-4 py-3 font-bold border-3 border-white">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
