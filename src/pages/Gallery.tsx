import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { db, type Project } from '../lib/db';
import { Trash2, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

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
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Button onClick={() => navigate('/')} variant="ghost" size="sm" className="gap-2">
            <ArrowLeft size={20} /> Back
          </Button>
          <h1 className="text-2xl font-bold text-primary">Gallery</h1>
          <Button onClick={() => navigate('/crop')}>
            New Project
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-xl mb-6">No projects yet</p>
            <Button onClick={() => navigate('/crop')} size="lg">
              Create Your First Project
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-card border rounded-lg overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-secondary relative overflow-hidden">
                  {typeof project.imageData === 'string' ? (
                    <img src={project.imageData} alt={project.name} className="w-full h-full object-cover" />
                  ) : (
                    <img src={URL.createObjectURL(project.imageData)} alt={project.name} className="w-full h-full object-cover" />
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <Button onClick={() => navigate(`/workspace/${project.id}`)} size="sm">
                      Open
                    </Button>
                    <Button onClick={() => setDeleteId(project.id || null)} size="sm" variant="destructive">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-foreground truncate">{project.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{project.paperSize} • {project.widthCm} × {project.heightCm} cm</p>
                  <p className="text-xs text-muted-foreground/60 mt-2">{new Date(project.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {deleteId && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-card border rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-foreground mb-4">Delete Project?</h3>
            <p className="text-muted-foreground mb-6">This action cannot be undone.</p>
            <div className="flex gap-4">
              <Button onClick={() => setDeleteId(null)} variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button onClick={() => handleDelete(deleteId)} variant="destructive" className="flex-1">
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
