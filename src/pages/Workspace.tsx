import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, Download } from 'lucide-react';
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
  const [lineColor, setLineColor] = useState('#ffffff');
  const [lineThickness, setLineThickness] = useState(1);
  const [showNumbers, setShowNumbers] = useState({ top: false, bottom: true, left: true, right: false });
  const [useGlobalColor, setUseGlobalColor] = useState(true);
  const [verColor, setVerColor] = useState('#ffffff');
  const [horColor, setHorColor] = useState('#ffffff');
  const [diagColor, setDiagColor] = useState('#ffffff');

  useEffect(() => { if (id) loadProject(); }, [id]);

  const loadProject = async () => {
    if (id) {
      const p = await db.projects.get(parseInt(id));
      setProject(p || null);
    }
  };

  const width = (project?.widthCm || 21) * 37.8;
  const height = (project?.heightCm || 29.7) * 37.8;
  const gapCm = gridSpacing;
  const effectiveVerColor = useGlobalColor ? lineColor : verColor;
  const effectiveHorColor = useGlobalColor ? lineColor : horColor;
  const effectiveDiagColor = useGlobalColor ? lineColor : diagColor;

  const getImageSrc = () => {
    if (!project) return '';
    return typeof project.imageData === 'string' 
      ? project.imageData 
      : URL.createObjectURL(project.imageData);
  };

  const renderGridLines = () => {
    const lines = [];
    const maxCols = Math.floor((project?.widthCm || 21) / gapCm);
    const maxRows = Math.floor((project?.heightCm || 29.7) / gapCm);

    if (showVertical) {
      for (let i = 1; i <= maxCols; i++) {
        const x = i * gapCm * 37.8;
        lines.push(
          <line key={`v-${i}`} x1={x} y1={0} x2={x} y2={height} stroke={effectiveVerColor} strokeWidth={lineThickness} opacity="0.8" />
        );
      }
    }

    if (showHorizontal) {
      for (let i = 1; i <= maxRows; i++) {
        const y = i * gapCm * 37.8;
        lines.push(
          <line key={`h-${i}`} x1={0} y1={y} x2={width} y2={y} stroke={effectiveHorColor} strokeWidth={lineThickness} opacity="0.8" />
        );
      }
    }

    if (showDiagonal) {
      for (let i = 1; i <= maxCols; i++) {
        for (let j = 1; j <= maxRows; j++) {
          const x = i * gapCm * 37.8;
          const y = j * gapCm * 37.8;
          const xIn = (i - 1) * gapCm * 37.8;
          const yIn = (j - 1) * gapCm * 37.8;
          lines.push(
            <g key={`d-${i}-${j}`}>
              <line x1={xIn} y1={yIn} x2={x} y2={y} stroke={effectiveDiagColor} strokeWidth={lineThickness} opacity="0.8" />
              <line x1={x} y1={yIn} x2={xIn} y2={y} stroke={effectiveDiagColor} strokeWidth={lineThickness} opacity="0.8" />
            </g>
          );
        }
      }
    }

    return lines;
  };

  const renderNumbers = () => {
    const nums = [];
    const maxCols = Math.floor((project?.widthCm || 21) / gapCm) + 1;
    const maxRows = Math.floor((project?.heightCm || 29.7) / gapCm) + 1;

    for (let i = 0; i < maxCols; i++) {
      if (showNumbers.top) {
        nums.push(
          <text key={`nt-${i}`} x={i * gapCm * 37.8 + 4} y={14} fill={lineColor} fontSize="11" fontFamily="monospace">
            {Math.round(i * gapCm * 10) / 10}
          </text>
        );
      }
      if (showNumbers.bottom) {
        nums.push(
          <text key={`nb-${i}`} x={i * gapCm * 37.8 + 4} y={height - 4} fill={lineColor} fontSize="11" fontFamily="monospace">
            {Math.round(i * gapCm * 10) / 10}
          </text>
        );
      }
    }

    for (let i = 0; i < maxRows; i++) {
      if (showNumbers.left) {
        nums.push(
          <text key={`nl-${i}`} x={4} y={i * gapCm * 37.8 + 12} fill={lineColor} fontSize="11" fontFamily="monospace">
            {Math.round(i * gapCm * 10) / 10}
          </text>
        );
      }
      if (showNumbers.right) {
        nums.push(
          <text key={`nr-${i}`} x={width - 28} y={i * gapCm * 37.8 + 12} fill={lineColor} fontSize="11" fontFamily="monospace">
            {Math.round(i * gapCm * 10) / 10}
          </text>
        );
      }
    }

    return nums;
  };

  const handleDownload = () => {
    if (!project) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);
    
    const img = new Image();
    const src = getImageSrc();
    img.src = src;
    
    const onImgLoad = () => {
      ctx.drawImage(img, 0, 0, width, height);
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineThickness;
      
      const maxCols = Math.floor((project.widthCm || 21) / gapCm);
      const maxRows = Math.floor((project.heightCm || 29.7) / gapCm);
      
      if (showVertical) {
        for (let i = 1; i <= maxCols; i++) {
          ctx.beginPath();
          ctx.moveTo(i * gapCm * 37.8, 0);
          ctx.lineTo(i * gapCm * 37.8, height);
          ctx.stroke();
        }
      }
      if (showHorizontal) {
        for (let i = 1; i <= maxRows; i++) {
          ctx.beginPath();
          ctx.moveTo(0, i * gapCm * 37.8);
          ctx.lineTo(width, i * gapCm * 37.8);
          ctx.stroke();
        }
      }
      if (showDiagonal) {
        for (let i = 1; i <= maxCols; i++) {
          for (let j = 1; j <= maxRows; j++) {
            const x = i * gapCm * 37.8;
            const y = j * gapCm * 37.8;
            const xIn = (i - 1) * gapCm * 37.8;
            const yIn = (j - 1) * gapCm * 37.8;
            ctx.beginPath();
            ctx.moveTo(xIn, yIn);
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, yIn);
            ctx.lineTo(xIn, y);
            ctx.stroke();
          }
        }
      }
      
      const link = document.createElement('a');
      link.download = `${project.name || 'project'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    
    img.onload = onImgLoad;
    if (img.complete) onImgLoad();
  };

  const ToggleBtn = ({ active, onClick }: { active: boolean; onClick: () => void }) => (
    <button onClick={onClick} className={`w-12 h-6 text-xs font-bold border-2 ${active ? 'bg-grass-500 text-dark-950 border-grass-400' : 'bg-dark-800 text-gray-400 border-white/30'}`}>
      {active ? 'ON' : 'OFF'}
    </button>
  );

  return (
    <div className="h-screen flex bg-dark-950">
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-dark-900 border-b border-white px-4 py-2 flex justify-between items-center">
          <button onClick={() => navigate('/gallery')} className="text-gray-400 hover:text-white text-sm flex items-center gap-1">
            <ArrowLeft size={16} /> Gallery
          </button>
          <h1 className="text-lg font-bold text-grass-400">{project?.name || 'Untitled'}</h1>
          <button onClick={handleDownload} className="bg-grass-500 text-dark-950 px-3 py-1 text-sm font-bold border-2 border-white">
            <Download size={14} className="inline" /> Download
          </button>
        </header>
        
        <div className="flex-1 overflow-auto bg-dark-800 p-4 flex items-center justify-center">
          {project ? (
            <div className="relative" style={{ width: width + 4, height: height + 4 }}>
              <img 
                src={getImageSrc()} 
                alt={project.name}
                className={`absolute top-0 left-0 ${valueStudy ? 'grayscale' : ''}`}
                style={{ width, height, objectFit: 'cover' }}
              />
              <svg className="absolute top-0 left-0" width={width} height={height} style={{ pointerEvents: 'none' }}>
                {renderGridLines()}
              </svg>
              <svg className="absolute top-0 left-0" width={width} height={height} style={{ pointerEvents: 'none' }}>
                {renderNumbers()}
              </svg>
            </div>
          ) : (
            <div className="text-gray-500">Select a project from gallery</div>
          )}
        </div>
      </main>

      <aside className="w-72 bg-dark-900 border-l border-white flex flex-col">
        <div className="p-3 border-b border-white">
          <h2 className="text-lg font-bold text-grass-400">Settings</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-white">
          <div>
            <label className="block text-sm font-bold mb-2">Cell Size (cm)</label>
            <input type="number" value={gridSpacing} onChange={(e) => setGridSpacing(Math.max(1, parseFloat(e.target.value) || 1))} min="1" step="0.5" className="w-full bg-dark-950 border border-white/30 px-2 py-1" />
            <div className="flex flex-wrap gap-1 mt-2">
              {[1, 1.5, 2, 2.5, 3, 4, 5, 10].map(v => (
                <button key={v} onClick={() => setGridSpacing(v)} className={`px-2 py-1 text-xs ${gridSpacing === v ? 'bg-grass-500 text-dark-950' : 'bg-dark-800'}`}>{v}</button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between"><span>Vertical</span><ToggleBtn active={showVertical} onClick={() => setShowVertical(!showVertical)} /></div>
            <div className="flex justify-between"><span>Horizontal</span><ToggleBtn active={showHorizontal} onClick={() => setShowHorizontal(!showHorizontal)} /></div>
            <div className="flex justify-between"><span>Diagonal</span><ToggleBtn active={showDiagonal} onClick={() => setShowDiagonal(!showDiagonal)} /></div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Numbers</label>
            <div className="grid grid-cols-4 gap-1">
              <button onClick={() => setShowNumbers(p => ({...p, top: !p.top}))} className={`py-1 text-xs ${showNumbers.top ? 'bg-grass-500 text-dark-950' : 'bg-dark-800'}`}>Top</button>
              <button onClick={() => setShowNumbers(p => ({...p, bottom: !p.bottom}))} className={`py-1 text-xs ${showNumbers.bottom ? 'bg-grass-500 text-dark-950' : 'bg-dark-800'}`}>Bottom</button>
              <button onClick={() => setShowNumbers(p => ({...p, left: !p.left}))} className={`py-1 text-xs ${showNumbers.left ? 'bg-grass-500 text-dark-950' : 'bg-dark-800'}`}>Left</button>
              <button onClick={() => setShowNumbers(p => ({...p, right: !p.right}))} className={`py-1 text-xs ${showNumbers.right ? 'bg-grass-500 text-dark-950' : 'bg-dark-800'}`}>Right</button>
            </div>
          </div>

          <div>
            <label className="flex gap-2 text-sm"><input type="checkbox" checked={useGlobalColor} onChange={(e) => setUseGlobalColor(e.target.checked)} /> Same color</label>
            {useGlobalColor ? (
              <div className="flex items-center gap-2 mt-1"><input type="color" value={lineColor} onChange={(e) => setLineColor(e.target.value)} className="w-8 h-8" /><span className="text-sm">{lineColor}</span></div>
            ) : (
              <div className="flex gap-2 mt-1">
                <div className="flex flex-col items-center"><input type="color" value={verColor} onChange={(e) => setVerColor(e.target.value)} className="w-7 h-7" /><span className="text-xs">V</span></div>
                <div className="flex flex-col items-center"><input type="color" value={horColor} onChange={(e) => setHorColor(e.target.value)} className="w-7 h-7" /><span className="text-xs">H</span></div>
                <div className="flex flex-col items-center"><input type="color" value={diagColor} onChange={(e) => setDiagColor(e.target.value)} className="w-7 h-7" /><span className="text-xs">D</span></div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">Thickness: {lineThickness}px</label>
            <input type="range" min="1" max="5" value={lineThickness} onChange={(e) => setLineThickness(parseInt(e.target.value))} className="w-full" />
          </div>

          <label className="flex gap-2 text-sm"><input type="checkbox" checked={valueStudy} onChange={(e) => setValueStudy(e.target.checked)} /> B&W Filter</label>

          {project && <div className="text-sm text-gray-400 pt-2 border-t border-dark-700">{project.paperSize}: {project.widthCm}×{project.heightCm}cm</div>}
        </div>
      </aside>
    </div>
  );
};

export default Workspace;