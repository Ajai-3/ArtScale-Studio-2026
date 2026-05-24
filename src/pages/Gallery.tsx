import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { db, type Project } from '../lib/db';
import { Trash2, ArrowLeft, Plus, FolderOpen } from 'lucide-react';

const Gallery = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const loadProjects = useCallback(async () => {
    const all = await db.projects.toArray();
    setProjects(all.reverse());
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleDelete = async (id: number) => {
    await db.projects.delete(id);
    setDeleteId(null);
    loadProjects();
  };

  return (
    <div className="min-h-screen bg-[#111111] text-[#f3f3f3]">
      <header className="bg-[#1a1a1a] border-b border-[#abf600]/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-[#a0a0a0] hover:text-[#abf600] transition-colors"
          >
            <ArrowLeft size={16} /> Back to Home
          </button>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="ArtScale Studio" className="h-7 w-auto" />
          </div>
          <button
            onClick={() => navigate('/crop')}
            className="flex items-center gap-2 bg-[#abf600] text-[#111111] font-bold text-sm px-4 py-2 rounded hover:bg-[#c5ff1a] transition-colors"
          >
            <Plus size={15} /> New Project
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-20 h-20 bg-[#1a1a1a] border border-[#abf600]/15 rounded-2xl flex items-center justify-center mb-6">
              <FolderOpen size={36} className="text-[#abf600]/40" />
            </div>
            <h2 className="text-2xl font-bold text-[#f3f3f3] mb-2">No projects yet</h2>
            <p className="text-[#a0a0a0] mb-8 max-w-xs">
              Create your first project to start scaling your artwork with precision.
            </p>
            <button
              onClick={() => navigate('/crop')}
              className="flex items-center gap-2 bg-[#abf600] text-[#111111] font-bold px-6 py-3 rounded hover:bg-[#c5ff1a] transition-colors"
            >
              <Plus size={16} /> Create First Project
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold">Your Projects</h1>
                <p className="text-sm text-[#a0a0a0] mt-1">{projects.length} project{projects.length !== 1 ? 's' : ''} saved locally</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group bg-[#1a1a1a] border border-[#abf600]/10 rounded-xl overflow-hidden hover:border-[#abf600]/30 transition-all duration-300"
                >
                  <div className="aspect-square bg-[#111111] relative overflow-hidden">
                    {typeof project.imageData === 'string' ? (
                      <img
                        src={project.imageData}
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={URL.createObjectURL(project.imageData)}
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-[#111111]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                      <button
                        onClick={() => navigate(`/workspace/${project.id}`)}
                        className="bg-[#abf600] text-[#111111] font-bold text-sm px-4 py-2 rounded hover:bg-[#c5ff1a] transition-colors"
                      >
                        Open
                      </button>
                      <button
                        onClick={() => setDeleteId(project.id || null)}
                        className="bg-[#ff6b6b]/20 border border-[#ff6b6b]/40 text-[#ff6b6b] p-2 rounded hover:bg-[#ff6b6b]/30 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-[#f3f3f3] truncate mb-1">{project.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#abf600] font-mono bg-[#abf600]/10 border border-[#abf600]/15 rounded px-2 py-0.5">
                        {project.paperSize}
                      </span>
                      <span className="text-xs text-[#a0a0a0]">
                        {project.widthCm} × {project.heightCm} cm
                      </span>
                    </div>
                    <p className="text-xs text-[#a0a0a0]/50 mt-2">
                      {new Date(project.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {deleteId && (
        <div className="fixed inset-0 bg-[#111111]/90 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-[#1a1a1a] border border-[#abf600]/15 rounded-xl p-8 max-w-sm w-full">
            <div className="w-12 h-12 bg-[#ff6b6b]/10 border border-[#ff6b6b]/20 rounded-xl flex items-center justify-center mb-5">
              <Trash2 size={20} className="text-[#ff6b6b]" />
            </div>
            <h3 className="text-xl font-bold text-[#f3f3f3] mb-2">Delete Project?</h3>
            <p className="text-[#a0a0a0] text-sm mb-7">
              This will permanently remove the project and its image data from your browser. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 border border-[#abf600]/20 text-[#f3f3f3] font-medium py-2.5 rounded hover:bg-[#abf600]/5 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 bg-[#ff6b6b]/20 border border-[#ff6b6b]/30 text-[#ff6b6b] font-bold py-2.5 rounded hover:bg-[#ff6b6b]/30 transition-colors text-sm"
              >
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
