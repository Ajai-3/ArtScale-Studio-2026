import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import {
  ArrowLeft,
  Download,
  Lock,
  Unlock,
  ZoomIn,
  ZoomOut,
  Grid3x3,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { db, type Project } from '../lib/db';
import { Button } from '../components/ui/button';

const RULER_SIZE = 32;
const PX_PER_CM = 37.8;

const Workspace = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [gridSpacing, setGridSpacing] = useState(1);
  const [showVertical, setShowVertical] = useState(true);
  const [showHorizontal, setShowHorizontal] = useState(true);
  const [showDiagonal, setShowDiagonal] = useState(false);
  const [valueStudy, setValueStudy] = useState(false);
  const [lineColor, setLineColor] = useState('#ABF600');
  const [lineThickness, setLineThickness] = useState(1);
  const [showNumbers, setShowNumbers] = useState({
    top: false,
    bottom: true,
    left: true,
    right: false,
  });
  const [useGlobalColor, setUseGlobalColor] = useState(true);
  const [verColor, setVerColor] = useState('#ABF600');
  const [horColor, setHorColor] = useState('#ABF600');
  const [diagColor, setDiagColor] = useState('#ABF600');
  const [isRealSize, setIsRealSize] = useState(false);
  const [ppi, setPpi] = useState(96);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isLocked, setIsLocked] = useState(false);
  const [showRuler, setShowRuler] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const canvasScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) loadProject();
  }, [id]);

  const loadProject = async () => {
    if (id) {
      const p = await db.projects.get(parseInt(id));
      setProject(p || null);
    }
  };

  const pixelsPerCm = isRealSize ? ppi / 2.54 : PX_PER_CM;
  const width = (project?.widthCm || 21) * pixelsPerCm * zoomLevel;
  const height = (project?.heightCm || 29.7) * pixelsPerCm * zoomLevel;
  const gapCm = gridSpacing;
  const effectiveVerColor = useGlobalColor ? lineColor : verColor;
  const effectiveHorColor = useGlobalColor ? lineColor : horColor;
  const effectiveDiagColor = useGlobalColor ? lineColor : diagColor;

  const handleCanvasScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    setScrollX(el.scrollLeft);
    setScrollY(el.scrollTop);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!e.ctrlKey && !e.metaKey) return;
    if (isLocked) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoomLevel((prev) => Math.min(5, Math.max(0.1, parseFloat((prev + delta).toFixed(1)))));
  };

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
        const x = i * gapCm * pixelsPerCm * zoomLevel;
        lines.push(
          <line key={`v-${i}`} x1={x} y1={0} x2={x} y2={height}
            stroke={effectiveVerColor} strokeWidth={lineThickness} opacity="0.8" />,
        );
      }
    }
    if (showHorizontal) {
      for (let i = 1; i <= maxRows; i++) {
        const y = i * gapCm * pixelsPerCm * zoomLevel;
        lines.push(
          <line key={`h-${i}`} x1={0} y1={y} x2={width} y2={y}
            stroke={effectiveHorColor} strokeWidth={lineThickness} opacity="0.8" />,
        );
      }
    }
    if (showDiagonal) {
      for (let i = 1; i <= maxCols; i++) {
        for (let j = 1; j <= maxRows; j++) {
          const x = i * gapCm * pixelsPerCm * zoomLevel;
          const y = j * gapCm * pixelsPerCm * zoomLevel;
          const xIn = (i - 1) * gapCm * pixelsPerCm * zoomLevel;
          const yIn = (j - 1) * gapCm * pixelsPerCm * zoomLevel;
          lines.push(
            <g key={`d-${i}-${j}`}>
              <line x1={xIn} y1={yIn} x2={x} y2={y} stroke={effectiveDiagColor} strokeWidth={lineThickness} opacity="0.8" />
              <line x1={x} y1={yIn} x2={xIn} y2={y} stroke={effectiveDiagColor} strokeWidth={lineThickness} opacity="0.8" />
            </g>,
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
      if (showNumbers.top) nums.push(<text key={`nt-${i}`} x={i * gapCm * pixelsPerCm * zoomLevel + 4} y={14} fill={lineColor} fontSize="11" fontFamily="monospace">{i}</text>);
      if (showNumbers.bottom) nums.push(<text key={`nb-${i}`} x={i * gapCm * pixelsPerCm * zoomLevel + 4} y={height - 4} fill={lineColor} fontSize="11" fontFamily="monospace">{i}</text>);
    }
    for (let i = 0; i < maxRows; i++) {
      if (showNumbers.left) nums.push(<text key={`nl-${i}`} x={4} y={i * gapCm * pixelsPerCm * zoomLevel + 12} fill={lineColor} fontSize="11" fontFamily="monospace">{i}</text>);
      if (showNumbers.right) nums.push(<text key={`nr-${i}`} x={width - 28} y={i * gapCm * pixelsPerCm * zoomLevel + 12} fill={lineColor} fontSize="11" fontFamily="monospace">{i}</text>);
    }
    return nums;
  };

  const renderHorizontalRuler = () => {
    const ticks = [];
    const totalCm = Math.ceil(2000 / PX_PER_CM);
    for (let cm = 0; cm <= totalCm; cm++) {
      const x = cm * PX_PER_CM;
      const isMajor = cm % 5 === 0;
      const isMid = cm % 1 === 0;
      const tickH = isMajor ? 14 : isMid ? 8 : 4;
      ticks.push(
        <line key={`ht-${cm}`} x1={x} y1={RULER_SIZE - tickH} x2={x} y2={RULER_SIZE}
          stroke="#ABF600" strokeWidth={isMajor ? 1.5 : 1} opacity={isMajor ? 0.9 : 0.45} />,
      );
      if (isMajor && cm > 0) {
        ticks.push(
          <text key={`hl-${cm}`} x={x - 7} y={RULER_SIZE - 17} fontSize="9"
            fill="#ABF600" fontFamily="monospace" fontWeight="bold" opacity="0.9">{cm}</text>,
        );
      }
      if (!isMajor && cm % 1 === 0 && cm > 0) {
        ticks.push(
          <text key={`hls-${cm}`} x={x - 4} y={RULER_SIZE - 11} fontSize="8"
            fill="#ABF600" fontFamily="monospace" opacity="0.5">{cm}</text>,
        );
      }
    }
    return ticks;
  };

  const renderVerticalRuler = () => {
    const ticks = [];
    const totalCm = Math.ceil(2000 / PX_PER_CM);
    for (let cm = 0; cm <= totalCm; cm++) {
      const y = cm * PX_PER_CM;
      const isMajor = cm % 5 === 0;
      const tickW = isMajor ? 14 : 8;
      ticks.push(
        <line key={`vt-${cm}`} x1={RULER_SIZE - tickW} y1={y} x2={RULER_SIZE} y2={y}
          stroke="#ABF600" strokeWidth={isMajor ? 1.5 : 1} opacity={isMajor ? 0.9 : 0.45} />,
      );
      if (isMajor && cm > 0) {
        ticks.push(
          <text key={`vl-${cm}`} x={3} y={y + 4} fontSize="9"
            fill="#ABF600" fontFamily="monospace" fontWeight="bold" opacity="0.9">{cm}</text>,
        );
      }
      if (!isMajor && cm > 0) {
        ticks.push(
          <text key={`vls-${cm}`} x={3} y={y + 3} fontSize="7"
            fill="#ABF600" fontFamily="monospace" opacity="0.45">{cm}</text>,
        );
      }
    }
    return ticks;
  };

  const handleDownload = () => {
    if (!project) return;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#111111';
    ctx.fillRect(0, 0, width, height);
    const img = new Image();
    const onImgLoad = () => {
      ctx.drawImage(img, 0, 0, width, height);
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineThickness;
      const maxCols = Math.floor((project.widthCm || 21) / gapCm);
      const maxRows = Math.floor((project.heightCm || 29.7) / gapCm);
      if (showVertical) {
        for (let i = 1; i <= maxCols; i++) { ctx.beginPath(); ctx.moveTo(i * gapCm * pixelsPerCm * zoomLevel, 0); ctx.lineTo(i * gapCm * pixelsPerCm * zoomLevel, height); ctx.stroke(); }
      }
      if (showHorizontal) {
        for (let i = 1; i <= maxRows; i++) { ctx.beginPath(); ctx.moveTo(0, i * gapCm * pixelsPerCm * zoomLevel); ctx.lineTo(width, i * gapCm * pixelsPerCm * zoomLevel); ctx.stroke(); }
      }
      if (showDiagonal) {
        for (let i = 1; i <= maxCols; i++) {
          for (let j = 1; j <= maxRows; j++) {
            const x = i * gapCm * pixelsPerCm * zoomLevel; const y = j * gapCm * pixelsPerCm * zoomLevel;
            const xIn = (i - 1) * gapCm * pixelsPerCm * zoomLevel; const yIn = (j - 1) * gapCm * pixelsPerCm * zoomLevel;
            ctx.beginPath(); ctx.moveTo(xIn, yIn); ctx.lineTo(x, y); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(x, yIn); ctx.lineTo(xIn, y); ctx.stroke();
          }
        }
      }
      ctx.fillStyle = lineColor;
      ctx.font = '11px monospace';
      ctx.textAlign = 'left';
      const maxColsNum = Math.floor((project.widthCm || 21) / gapCm) + 1;
      const maxRowsNum = Math.floor((project.heightCm || 29.7) / gapCm) + 1;
      for (let i = 0; i < maxColsNum; i++) {
        if (showNumbers.top) ctx.fillText(String(i), i * gapCm * pixelsPerCm * zoomLevel + 4, 14);
        if (showNumbers.bottom) ctx.fillText(String(i), i * gapCm * pixelsPerCm * zoomLevel + 4, height - 4);
      }
      for (let i = 0; i < maxRowsNum; i++) {
        if (showNumbers.left) ctx.fillText(String(i), 4, i * gapCm * pixelsPerCm * zoomLevel + 12);
        if (showNumbers.right) ctx.fillText(String(i), width - 28, i * gapCm * pixelsPerCm * zoomLevel + 12);
      }
      const link = document.createElement('a');
      link.download = `${project.name || 'project'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    img.src = getImageSrc();
    img.onload = onImgLoad;
    if (img.complete) onImgLoad();
  };

  const ToggleBtn = ({ active, onClick, disabled = false }: { active: boolean; onClick: () => void; disabled?: boolean }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-1 text-xs font-bold rounded border transition-all ${active ? 'bg-[#abf600] text-[#111111] border-[#abf600]' : 'bg-[#111111] text-[#a0a0a0] border-[#abf600]/20'} ${disabled ? 'cursor-not-allowed opacity-40' : 'hover:border-[#abf600]/50'}`}
    >
      {active ? 'ON' : 'OFF'}
    </button>
  );

  return (
    <div className="h-screen flex flex-col bg-[#111111] overflow-hidden">

      <header className="flex-shrink-0 bg-[#1a1a1a] border-b border-[#abf600]/15 px-4 py-2.5 flex items-center justify-between gap-4 z-30">
          <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => navigate('/gallery')}
            disabled={isLocked}
            className="flex items-center gap-1.5 text-sm text-[#a0a0a0] hover:text-[#abf600] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
          >
            <ArrowLeft size={15} /> Gallery
          </button>
          <div className="w-px h-4 bg-[#abf600]/15 flex-shrink-0" />
          <div className="flex items-center gap-2 min-w-0">
            <img src="/logo.png" alt="ArtScale Studio" className="h-6 w-auto flex-shrink-0" />
            <h1 className="text-sm font-bold text-[#f3f3f3] truncate">{project?.name || 'Untitled'}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setIsRealSize(!isRealSize)}
            disabled={isLocked}
            className={`hidden sm:block text-xs font-bold px-3 py-1.5 rounded border transition-all disabled:opacity-40 disabled:cursor-not-allowed ${isRealSize ? 'bg-[#abf600] text-[#111111] border-[#abf600]' : 'border-[#abf600]/25 text-[#a0a0a0] hover:border-[#abf600]/50 hover:text-[#f3f3f3]'}`}
          >
            Real Size
          </button>
          <button
            onClick={() => setIsLocked(!isLocked)}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded border transition-all ${isLocked ? 'bg-[#ff6b6b]/20 border-[#ff6b6b]/40 text-[#ff6b6b]' : 'border-[#abf600]/25 text-[#a0a0a0] hover:border-[#abf600]/50 hover:text-[#f3f3f3]'}`}
          >
            {isLocked ? <><Lock size={12} /> <span className="hidden sm:inline">Locked</span></> : <><Unlock size={12} /> <span className="hidden sm:inline">Lock</span></>}
          </button>
          <button
            onClick={handleDownload}
            disabled={isLocked}
            className="flex items-center gap-1.5 bg-[#abf600] text-[#111111] font-bold text-xs px-3 py-1.5 rounded hover:bg-[#c5ff1a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Download size={12} /> <span className="hidden sm:inline">Export</span>
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded border transition-all ${sidebarOpen ? 'bg-[#abf600]/15 border-[#abf600]/50 text-[#abf600]' : 'border-[#abf600]/25 text-[#a0a0a0] hover:border-[#abf600]/50 hover:text-[#f3f3f3]'}`}
            aria-label="Toggle settings"
          >
            <SlidersHorizontal size={14} />
            <span className="hidden sm:inline">Settings</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        <main className="flex-1 flex flex-col overflow-hidden relative">
          {project ? (
            <>
              {showRuler && (
                <div className="flex flex-shrink-0" style={{ height: RULER_SIZE }}>
                  <div
                    className="flex-shrink-0 bg-[#161616] border-r border-b border-[#abf600]/20"
                    style={{ width: RULER_SIZE, height: RULER_SIZE }}
                  />
                  <div className="flex-1 overflow-hidden bg-[#161616] border-b border-[#abf600]/20">
                    <div style={{ transform: `translateX(-${scrollX}px)`, willChange: 'transform' }}>
                      <svg width={Math.max(width + 200, 2000)} height={RULER_SIZE} style={{ display: 'block' }}>
                        {renderHorizontalRuler()}
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-1 overflow-hidden">
                {showRuler && (
                  <div
                    className="flex-shrink-0 overflow-hidden bg-[#161616] border-r border-[#abf600]/20"
                    style={{ width: RULER_SIZE }}
                  >
                    <div style={{ transform: `translateY(-${scrollY}px)`, willChange: 'transform' }}>
                      <svg width={RULER_SIZE} height={Math.max(height + 200, 2000)} style={{ display: 'block' }}>
                        {renderVerticalRuler()}
                      </svg>
                    </div>
                  </div>
                )}

                <div
                  ref={canvasScrollRef}
                  className="flex-1 overflow-auto bg-[#0d0d0d]"
                  onScroll={handleCanvasScroll}
                  onWheel={handleWheel}
                >
                  <div className="p-6 inline-block min-w-full min-h-full">
                    <div
                      className="relative inline-block shadow-2xl"
                      style={{ width, height }}
                    >
                      <img
                        src={getImageSrc()}
                        alt={project.name}
                        className={`absolute top-0 left-0 ${valueStudy ? 'grayscale' : ''}`}
                        style={{ width, height, objectFit: 'cover', display: 'block' }}
                      />
                      <svg className="absolute top-0 left-0" width={width} height={height} style={{ pointerEvents: 'none' }}>
                        {renderGridLines()}
                      </svg>
                      <svg className="absolute top-0 left-0" width={width} height={height} style={{ pointerEvents: 'none' }}>
                        {renderNumbers()}
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full gap-4">
              <div className="w-16 h-16 bg-[#1a1a1a] border border-[#abf600]/15 rounded-2xl flex items-center justify-center">
                <Grid3x3 size={28} className="text-[#abf600]/40" />
              </div>
              <p className="text-[#a0a0a0] text-sm">No project loaded</p>
              <button onClick={() => navigate('/gallery')} className="text-xs text-[#abf600] border border-[#abf600]/25 px-4 py-2 rounded hover:bg-[#abf600]/5 transition-colors">
                Open from Gallery
              </button>
            </div>
          )}
        </main>

        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside className={`
          fixed top-[45px] right-0 bottom-0 z-40 w-64 bg-[#1a1a1a] border-l border-[#abf600]/15 flex flex-col overflow-hidden
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}
          lg:static lg:translate-x-0 lg:flex-shrink-0 lg:top-auto lg:bottom-auto
        `}>
          <div className="px-4 py-3 border-b border-[#abf600]/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Grid3x3 size={14} className="text-[#abf600]" />
              <h2 className="text-sm font-bold text-[#f3f3f3]">Settings</h2>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-[#a0a0a0] hover:text-[#abf600] transition-colors"
              aria-label="Close settings"
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-5">

            <div>
              <label className="block text-xs font-bold text-[#a0a0a0] uppercase tracking-widest mb-2">Cell Size (cm)</label>
              <input
                type="number"
                value={gridSpacing}
                onChange={(e) => setGridSpacing(Math.max(0.5, parseFloat(e.target.value) || 1))}
                min="0.5"
                step="0.5"
                disabled={isLocked}
                className="w-full bg-[#111111] border border-[#abf600]/20 text-[#f3f3f3] px-3 py-1.5 rounded text-sm focus:outline-none focus:border-[#abf600]/60 disabled:opacity-40 disabled:cursor-not-allowed"
              />
              <div className="flex flex-wrap gap-1 mt-2">
                {[1, 1.5, 2, 2.5, 3, 4, 5, 10].map((v) => (
                  <button
                    key={v}
                    onClick={() => setGridSpacing(v)}
                    disabled={isLocked}
                    className={`px-2 py-0.5 text-xs rounded transition-all disabled:opacity-40 disabled:cursor-not-allowed ${gridSpacing === v ? 'bg-[#abf600] text-[#111111] font-bold' : 'bg-[#111111] text-[#a0a0a0] border border-[#abf600]/15 hover:border-[#abf600]/40'}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-[#abf600]/10 pt-4">
              <label className="block text-xs font-bold text-[#a0a0a0] uppercase tracking-widest mb-3">Grid Layers</label>
              <div className="space-y-2">
                {[
                  { label: 'Vertical', state: showVertical, set: () => setShowVertical(!showVertical) },
                  { label: 'Horizontal', state: showHorizontal, set: () => setShowHorizontal(!showHorizontal) },
                  { label: 'Diagonal', state: showDiagonal, set: () => setShowDiagonal(!showDiagonal) },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-sm text-[#f3f3f3]">{item.label}</span>
                    <ToggleBtn active={item.state} onClick={item.set} disabled={isLocked} />
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[#abf600]/10 pt-4">
              <label className="block text-xs font-bold text-[#a0a0a0] uppercase tracking-widest mb-2">Numbers</label>
              <div className="grid grid-cols-4 gap-1">
                {(['top', 'bottom', 'left', 'right'] as const).map((side) => (
                  <button
                    key={side}
                    onClick={() => setShowNumbers((p) => ({ ...p, [side]: !p[side] }))}
                    disabled={isLocked}
                    className={`py-1 text-xs rounded border transition-all disabled:opacity-40 disabled:cursor-not-allowed ${showNumbers[side] ? 'bg-[#abf600] text-[#111111] font-bold border-[#abf600]' : 'bg-[#111111] text-[#a0a0a0] border-[#abf600]/15 hover:border-[#abf600]/40'}`}
                  >
                    {side.charAt(0).toUpperCase() + side.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-[#abf600]/10 pt-4">
              <label className="block text-xs font-bold text-[#a0a0a0] uppercase tracking-widest mb-3">Line Color</label>
              <label className="flex items-center gap-2 text-sm text-[#f3f3f3] mb-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useGlobalColor}
                  onChange={(e) => setUseGlobalColor(e.target.checked)}
                  disabled={isLocked}
                  className="rounded accent-[#abf600]"
                />
                Same color for all
              </label>
              {useGlobalColor ? (
                <div className="flex items-center gap-3">
                  <input type="color" value={lineColor} onChange={(e) => setLineColor(e.target.value)} disabled={isLocked}
                    className="w-9 h-9 rounded cursor-pointer border border-[#abf600]/20 bg-transparent disabled:opacity-40" />
                  <span className="text-xs font-mono text-[#a0a0a0]">{lineColor.toUpperCase()}</span>
                </div>
              ) : (
                <div className="flex gap-4">
                  {[{ label: 'V', val: verColor, set: setVerColor }, { label: 'H', val: horColor, set: setHorColor }, { label: 'D', val: diagColor, set: setDiagColor }].map((c) => (
                    <div key={c.label} className="flex flex-col items-center gap-1">
                      <input type="color" value={c.val} onChange={(e) => c.set(e.target.value)} disabled={isLocked}
                        className="w-8 h-8 rounded cursor-pointer border border-[#abf600]/20 bg-transparent disabled:opacity-40" />
                      <span className="text-xs text-[#a0a0a0]">{c.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-[#abf600]/10 pt-4">
              <label className="block text-xs font-bold text-[#a0a0a0] uppercase tracking-widest mb-2">
                Thickness: <span className="text-[#abf600]">{lineThickness}px</span>
              </label>
              <input type="range" min="1" max="5" value={lineThickness}
                onChange={(e) => setLineThickness(parseInt(e.target.value))}
                disabled={isLocked} className="w-full accent-[#abf600] disabled:opacity-40" />
            </div>

            <div className="border-t border-[#abf600]/10 pt-4 space-y-2.5">
              <label className="flex items-center gap-2 text-sm text-[#f3f3f3] cursor-pointer">
                <input type="checkbox" checked={valueStudy} onChange={(e) => setValueStudy(e.target.checked)}
                  disabled={isLocked} className="rounded accent-[#abf600]" />
                B&W Value Filter
              </label>
              <label className="flex items-center gap-2 text-sm text-[#f3f3f3] cursor-pointer">
                <input type="checkbox" checked={showRuler} onChange={(e) => setShowRuler(e.target.checked)}
                  disabled={isLocked} className="rounded accent-[#abf600]" />
                Show Ruler
              </label>
            </div>

            {isRealSize && (
              <div className="border-t border-[#abf600]/10 pt-4 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#a0a0a0] uppercase tracking-widest mb-2">
                    PPI: <span className="text-[#abf600]">{ppi}</span>
                  </label>
                  <input type="range" min="72" max="220" value={ppi}
                    onChange={(e) => setPpi(parseInt(e.target.value))}
                    disabled={isLocked} className="w-full accent-[#abf600]" />
                  <div className="flex flex-wrap gap-1 mt-2">
                    {[72, 96, 110, 120, 144].map((p) => (
                      <button key={p} onClick={() => setPpi(p)} disabled={isLocked}
                        className={`px-2 py-0.5 text-xs rounded transition-all disabled:opacity-40 ${ppi === p ? 'bg-[#abf600] text-[#111111] font-bold' : 'bg-[#111111] text-[#a0a0a0] border border-[#abf600]/15 hover:border-[#abf600]/40'}`}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#a0a0a0] uppercase tracking-widest mb-2">
                    Zoom: <span className="text-[#abf600]">{Math.round(zoomLevel * 100)}%</span>
                  </label>
                  <div className="flex gap-2 items-center">
                    <Button onClick={() => setZoomLevel(Math.max(0.1, zoomLevel - 0.1))} disabled={isLocked} variant="outline" size="sm">
                      <ZoomOut size={13} />
                    </Button>
                    <input type="range" min="0.1" max="3" step="0.1" value={zoomLevel}
                      onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
                      disabled={isLocked} className="flex-1 accent-[#abf600]" />
                    <Button onClick={() => setZoomLevel(Math.min(3, zoomLevel + 0.1))} disabled={isLocked} variant="outline" size="sm">
                      <ZoomIn size={13} />
                    </Button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </aside>
      </div>
    </div>
  );
};

export default Workspace;
