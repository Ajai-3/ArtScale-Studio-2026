import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Download,
  Lock,
  Unlock,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
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
  const [showNumbers, setShowNumbers] = useState({
    top: false,
    bottom: true,
    left: true,
    right: false,
  });
  const [useGlobalColor, setUseGlobalColor] = useState(true);
  const [verColor, setVerColor] = useState('#ffffff');
  const [horColor, setHorColor] = useState('#ffffff');
  const [diagColor, setDiagColor] = useState('#ffffff');
  const [isRealSize, setIsRealSize] = useState(false);
  const [ppi, setPpi] = useState(96);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isLocked, setIsLocked] = useState(false);
  const [showRuler, setShowRuler] = useState(true);

  useEffect(() => {
    if (id) loadProject();
  }, [id]);

  const loadProject = async () => {
    if (id) {
      const p = await db.projects.get(parseInt(id));
      setProject(p || null);
    }
  };

  // Calculate real size: 1 cm = ppi / 2.54 pixels
  const pixelsPerCm = isRealSize ? ppi / 2.54 : 37.8;
  const width = (project?.widthCm || 21) * pixelsPerCm * zoomLevel;
  const height = (project?.heightCm || 29.7) * pixelsPerCm * zoomLevel;
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
        const x = i * gapCm * pixelsPerCm * zoomLevel;
        lines.push(
          <line
            key={`v-${i}`}
            x1={x}
            y1={0}
            x2={x}
            y2={height}
            stroke={effectiveVerColor}
            strokeWidth={lineThickness}
            opacity="0.8"
          />,
        );
      }
    }

    if (showHorizontal) {
      for (let i = 1; i <= maxRows; i++) {
        const y = i * gapCm * pixelsPerCm * zoomLevel;
        lines.push(
          <line
            key={`h-${i}`}
            x1={0}
            y1={y}
            x2={width}
            y2={y}
            stroke={effectiveHorColor}
            strokeWidth={lineThickness}
            opacity="0.8"
          />,
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
              <line
                x1={xIn}
                y1={yIn}
                x2={x}
                y2={y}
                stroke={effectiveDiagColor}
                strokeWidth={lineThickness}
                opacity="0.8"
              />
              <line
                x1={x}
                y1={yIn}
                x2={xIn}
                y2={y}
                stroke={effectiveDiagColor}
                strokeWidth={lineThickness}
                opacity="0.8"
              />
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
      if (showNumbers.top) {
        nums.push(
          <text
            key={`nt-${i}`}
            x={i * gapCm * pixelsPerCm * zoomLevel + 4}
            y={14}
            fill={lineColor}
            fontSize="11"
            fontFamily="monospace"
          >
            {i}
          </text>,
        );
      }
      if (showNumbers.bottom) {
        nums.push(
          <text
            key={`nb-${i}`}
            x={i * gapCm * pixelsPerCm * zoomLevel + 4}
            y={height - 4}
            fill={lineColor}
            fontSize="11"
            fontFamily="monospace"
          >
            {i}
          </text>,
        );
      }
    }

    for (let i = 0; i < maxRows; i++) {
      if (showNumbers.left) {
        nums.push(
          <text
            key={`nl-${i}`}
            x={4}
            y={i * gapCm * pixelsPerCm * zoomLevel + 12}
            fill={lineColor}
            fontSize="11"
            fontFamily="monospace"
          >
            {i}
          </text>,
        );
      }
      if (showNumbers.right) {
        nums.push(
          <text
            key={`nr-${i}`}
            x={width - 28}
            y={i * gapCm * pixelsPerCm * zoomLevel + 12}
            fill={lineColor}
            fontSize="11"
            fontFamily="monospace"
          >
            {i}
          </text>,
        );
      }
    }

    return nums;
  };

  const renderRuler = () => {
    const rulers = [];
    const tickInterval = pixelsPerCm; // 1 cm

    // Horizontal ruler marks (for top ruler, 40px height)
    for (let i = 0; i <= width; i += tickInterval) {
      const isMajor = Math.round((i / tickInterval) % 5) === 0;
      const tickHeight = isMajor ? 12 : 6;

      rulers.push(
        <line
          key={`h-ruler-tick-${i}`}
          x1={i}
          y1={40 - tickHeight}
          x2={i}
          y2={40}
          stroke="#ffff00"
          strokeWidth="1"
          opacity="0.7"
        />,
      );

      if (isMajor && i % (tickInterval * 5) === 0) {
        const cmValue = Math.round(i / pixelsPerCm);
        rulers.push(
          <text
            key={`h-ruler-label-${i}`}
            x={i - 6}
            y={18}
            fontSize="9"
            fill="#ffff00"
            fontFamily="monospace"
            fontWeight="bold"
            opacity="0.8"
          >
            {cmValue}
          </text>,
        );
      }
    }

    // Vertical ruler marks (for left ruler, 40px width)
    for (let i = 0; i <= height; i += tickInterval) {
      const isMajor = Math.round((i / tickInterval) % 5) === 0;
      const tickWidth = isMajor ? 12 : 6;

      rulers.push(
        <line
          key={`v-ruler-tick-${i}`}
          x1={40 - tickWidth}
          y1={i}
          x2={40}
          y2={i}
          stroke="#ffff00"
          strokeWidth="1"
          opacity="0.7"
        />,
      );

      if (isMajor && i % (tickInterval * 5) === 0) {
        const cmValue = Math.round(i / pixelsPerCm);
        rulers.push(
          <text
            key={`v-ruler-label-${i}`}
            x={6}
            y={i + 4}
            fontSize="9"
            fill="#ffff00"
            fontFamily="monospace"
            fontWeight="bold"
            opacity="0.8"
          >
            {cmValue}
          </text>,
        );
      }
    }

    return rulers;
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
    img.src = getImageSrc();

    const onImgLoad = () => {
      // Draw the cropped image scaled to fill the canvas
      ctx.drawImage(img, 0, 0, width, height);
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineThickness;

      const maxCols = Math.floor((project.widthCm || 21) / gapCm);
      const maxRows = Math.floor((project.heightCm || 29.7) / gapCm);

      if (showVertical) {
        for (let i = 1; i <= maxCols; i++) {
          ctx.beginPath();
          ctx.moveTo(i * gapCm * pixelsPerCm * zoomLevel, 0);
          ctx.lineTo(i * gapCm * pixelsPerCm * zoomLevel, height);
          ctx.stroke();
        }
      }
      if (showHorizontal) {
        for (let i = 1; i <= maxRows; i++) {
          ctx.beginPath();
          ctx.moveTo(0, i * gapCm * pixelsPerCm * zoomLevel);
          ctx.lineTo(width, i * gapCm * pixelsPerCm * zoomLevel);
          ctx.stroke();
        }
      }
      if (showDiagonal) {
        for (let i = 1; i <= maxCols; i++) {
          for (let j = 1; j <= maxRows; j++) {
            const x = i * gapCm * pixelsPerCm * zoomLevel;
            const y = j * gapCm * pixelsPerCm * zoomLevel;
            const xIn = (i - 1) * gapCm * pixelsPerCm * zoomLevel;
            const yIn = (j - 1) * gapCm * pixelsPerCm * zoomLevel;
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

      // Draw numbers
      ctx.fillStyle = lineColor;
      ctx.font = '11px monospace';
      ctx.textAlign = 'left';

      const maxColsNum = Math.floor((project.widthCm || 21) / gapCm) + 1;
      const maxRowsNum = Math.floor((project.heightCm || 29.7) / gapCm) + 1;

      for (let i = 0; i < maxColsNum; i++) {
        if (showNumbers.top) {
          ctx.fillText(String(i), i * gapCm * pixelsPerCm * zoomLevel + 4, 14);
        }
        if (showNumbers.bottom) {
          ctx.fillText(
            String(i),
            i * gapCm * pixelsPerCm * zoomLevel + 4,
            height - 4,
          );
        }
      }

      ctx.textAlign = 'left';
      for (let i = 0; i < maxRowsNum; i++) {
        if (showNumbers.left) {
          ctx.fillText(String(i), 4, i * gapCm * pixelsPerCm * zoomLevel + 12);
        }
        if (showNumbers.right) {
          ctx.fillText(
            String(i),
            width - 28,
            i * gapCm * pixelsPerCm * zoomLevel + 12,
          );
        }
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

  const ToggleBtn = ({
    active,
    onClick,
    disabled = false,
  }: {
    active: boolean;
    onClick: () => void;
    disabled?: boolean;
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-12 h-6 text-xs font-bold border-2 ${active ? 'bg-grass-500 text-dark-950 border-grass-400' : 'bg-dark-800 text-gray-400 border-white/30'} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      {active ? 'ON' : 'OFF'}
    </button>
  );

  return (
    <div className="h-screen flex bg-dark-950">
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-dark-900 border-b border-white px-4 py-2 flex justify-between items-center">
          <button
            onClick={() => navigate('/gallery')}
            disabled={isLocked}
            className={`text-sm flex items-center gap-1 ${isLocked ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 hover:text-white'}`}
          >
            <ArrowLeft size={16} /> Gallery
          </button>
          <h1 className="text-lg font-bold text-grass-400">
            {project?.name || 'Untitled'}
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRealSize(!isRealSize)}
              disabled={isLocked}
              className={`px-3 py-1 text-sm font-bold border-2 ${isRealSize ? 'bg-grass-500 text-dark-950 border-grass-400' : 'bg-dark-800 text-gray-400 border-white/30'} ${isLocked ? 'cursor-not-allowed opacity-50' : 'hover:border-grass-400'}`}
            >
              Real Size
            </button>
            <button
              onClick={() => setIsLocked(!isLocked)}
              className={`px-3 py-1 text-sm font-bold border-2 ${isLocked ? 'bg-red-600 text-white border-red-400' : 'bg-dark-800 text-gray-400 border-white/30'}`}
            >
              {isLocked ? (
                <Lock size={14} className="inline" />
              ) : (
                <Unlock size={14} className="inline" />
              )}
            </button>
            <button
              onClick={handleDownload}
              disabled={isLocked}
              className={`bg-grass-500 text-dark-950 px-3 py-1 text-sm font-bold border-2 border-white ${isLocked ? 'cursor-not-allowed opacity-50' : 'hover:shadow-neubrutal'}`}
            >
              <Download size={14} className="inline" /> Download
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-hidden bg-dark-800 flex flex-col">
          {project ? (
            <>
              {/* Top Ruler - Fixed Height, Scrolls Horizontally */}
              {showRuler && (
                <div className="flex flex-shrink-0 h-10 bg-dark-900 border-b border-white/20">
                  {/* Top-Left Corner */}
                  <div className="w-10 h-10 bg-dark-950 border-r border-white/20 flex-shrink-0" />
                  {/* Top Ruler SVG */}
                  <div className="flex-1 overflow-x-hidden">
                    <svg
                      width={width}
                      height="40"
                      style={{ display: 'block' }}
                      className="bg-dark-900"
                    >
                      {renderRuler().filter((r: any) =>
                        r.key?.toString().startsWith('h-ruler'),
                      )}
                    </svg>
                  </div>
                </div>
              )}

              {/* Main Content Area - Image + Left Ruler */}
              <div className="flex flex-1 overflow-hidden">
                {/* Left Ruler - Fixed Width, Scrolls Vertically */}
                {showRuler && (
                  <div className="w-10 flex-shrink-0 bg-dark-900 border-r border-white/20 overflow-y-hidden">
                    <svg width="40" height={height} className="bg-dark-900">
                      {renderRuler().filter((r: any) =>
                        r.key?.toString().startsWith('v-ruler'),
                      )}
                    </svg>
                  </div>
                )}

                {/* Image Canvas - Scrollable */}
                <div className="flex-1 overflow-auto bg-dark-800 scrollbar-hidden">
                  <div
                    className="relative inline-block"
                    style={{ width: width + 4, height: height + 4 }}
                  >
                    <img
                      src={getImageSrc()}
                      alt={project.name}
                      className={`absolute top-0 left-0 ${valueStudy ? 'grayscale' : ''}`}
                      style={{ width, height, objectFit: 'cover' }}
                    />
                    <svg
                      className="absolute top-0 left-0"
                      width={width}
                      height={height}
                      style={{ pointerEvents: 'none' }}
                    >
                      {renderGridLines()}
                    </svg>
                    <svg
                      className="absolute top-0 left-0"
                      width={width}
                      height={height}
                      style={{ pointerEvents: 'none' }}
                    >
                      {renderNumbers()}
                    </svg>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-500">
              Select a project from gallery
            </div>
          )}
        </div>
      </main>

      <aside className="w-72 bg-dark-900 border-l border-white flex flex-col">
        <div className="p-3 border-b border-white">
          <h2 className="text-lg font-bold text-grass-400">Settings</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-white">
          <div>
            <label className="block text-sm font-bold mb-2">
              Cell Size (cm)
            </label>
            <input
              type="number"
              value={gridSpacing}
              onChange={(e) =>
                setGridSpacing(Math.max(1, parseFloat(e.target.value) || 1))
              }
              min="1"
              step="0.5"
              disabled={isLocked}
              className={`w-full bg-dark-950 border border-white/30 px-2 py-1 ${isLocked ? 'cursor-not-allowed opacity-50' : ''}`}
            />
            <div className="flex flex-wrap gap-1 mt-2">
              {[1, 1.5, 2, 2.5, 3, 4, 5, 10].map((v) => (
                <button
                  key={v}
                  onClick={() => setGridSpacing(v)}
                  disabled={isLocked}
                  className={`px-2 py-1 text-xs ${gridSpacing === v ? 'bg-grass-500 text-dark-950' : 'bg-dark-800'} ${isLocked ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Vertical</span>
              <ToggleBtn
                active={showVertical}
                onClick={() => setShowVertical(!showVertical)}
                disabled={isLocked}
              />
            </div>
            <div className="flex justify-between">
              <span>Horizontal</span>
              <ToggleBtn
                active={showHorizontal}
                onClick={() => setShowHorizontal(!showHorizontal)}
                disabled={isLocked}
              />
            </div>
            <div className="flex justify-between">
              <span>Diagonal</span>
              <ToggleBtn
                active={showDiagonal}
                onClick={() => setShowDiagonal(!showDiagonal)}
                disabled={isLocked}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Numbers</label>
            <div className="grid grid-cols-4 gap-1">
              <button
                onClick={() => setShowNumbers((p) => ({ ...p, top: !p.top }))}
                disabled={isLocked}
                className={`py-1 text-xs ${showNumbers.top ? 'bg-grass-500 text-dark-950' : 'bg-dark-800'} ${isLocked ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                Top
              </button>
              <button
                onClick={() =>
                  setShowNumbers((p) => ({ ...p, bottom: !p.bottom }))
                }
                disabled={isLocked}
                className={`py-1 text-xs ${showNumbers.bottom ? 'bg-grass-500 text-dark-950' : 'bg-dark-800'} ${isLocked ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                Bottom
              </button>
              <button
                onClick={() => setShowNumbers((p) => ({ ...p, left: !p.left }))}
                disabled={isLocked}
                className={`py-1 text-xs ${showNumbers.left ? 'bg-grass-500 text-dark-950' : 'bg-dark-800'} ${isLocked ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                Left
              </button>
              <button
                onClick={() =>
                  setShowNumbers((p) => ({ ...p, right: !p.right }))
                }
                disabled={isLocked}
                className={`py-1 text-xs ${showNumbers.right ? 'bg-grass-500 text-dark-950' : 'bg-dark-800'} ${isLocked ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                Right
              </button>
            </div>
          </div>

          <div>
            <label className="flex gap-2 text-sm">
              <input
                type="checkbox"
                checked={useGlobalColor}
                onChange={(e) => setUseGlobalColor(e.target.checked)}
                disabled={isLocked}
              />{' '}
              Same color
            </label>
            {useGlobalColor ? (
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="color"
                  value={lineColor}
                  onChange={(e) => setLineColor(e.target.value)}
                  disabled={isLocked}
                  className={`w-8 h-8 ${isLocked ? 'cursor-not-allowed opacity-50' : ''}`}
                />
                <span className="text-sm">{lineColor}</span>
              </div>
            ) : (
              <div className="flex gap-2 mt-1">
                <div className="flex flex-col items-center">
                  <input
                    type="color"
                    value={verColor}
                    onChange={(e) => setVerColor(e.target.value)}
                    disabled={isLocked}
                    className={`w-7 h-7 ${isLocked ? 'cursor-not-allowed opacity-50' : ''}`}
                  />
                  <span className="text-xs">V</span>
                </div>
                <div className="flex flex-col items-center">
                  <input
                    type="color"
                    value={horColor}
                    onChange={(e) => setHorColor(e.target.value)}
                    disabled={isLocked}
                    className={`w-7 h-7 ${isLocked ? 'cursor-not-allowed opacity-50' : ''}`}
                  />
                  <span className="text-xs">H</span>
                </div>
                <div className="flex flex-col items-center">
                  <input
                    type="color"
                    value={diagColor}
                    onChange={(e) => setDiagColor(e.target.value)}
                    disabled={isLocked}
                    className={`w-7 h-7 ${isLocked ? 'cursor-not-allowed opacity-50' : ''}`}
                  />
                  <span className="text-xs">D</span>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold mb-1">
              Thickness: {lineThickness}px
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={lineThickness}
              onChange={(e) => setLineThickness(parseInt(e.target.value))}
              disabled={isLocked}
              className={`w-full ${isLocked ? 'cursor-not-allowed opacity-50' : ''}`}
            />
          </div>

          <label className="flex gap-2 text-sm">
            <input
              type="checkbox"
              checked={valueStudy}
              onChange={(e) => setValueStudy(e.target.checked)}
              disabled={isLocked}
            />{' '}
            B&W Filter
          </label>

          <label className="flex gap-2 text-sm">
            <input
              type="checkbox"
              checked={showRuler}
              onChange={(e) => setShowRuler(e.target.checked)}
              disabled={isLocked}
            />{' '}
            Show Ruler
          </label>

          {isRealSize && (
            <>
              <div className="border-t border-dark-700 pt-4">
                <label className="block text-sm font-bold mb-2">
                  PPI: {ppi}
                </label>
                <input
                  type="range"
                  min="72"
                  max="220"
                  value={ppi}
                  onChange={(e) => setPpi(parseInt(e.target.value))}
                  disabled={isLocked}
                  className="w-full"
                />
                <div className="flex flex-wrap gap-1 mt-2">
                  {[72, 96, 110, 120, 144].map((p) => (
                    <button
                      key={p}
                      onClick={() => setPpi(p)}
                      disabled={isLocked}
                      className={`px-2 py-1 text-xs ${ppi === p ? 'bg-grass-500 text-dark-950' : 'bg-dark-800'} ${isLocked ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">
                  Zoom: {Math.round(zoomLevel * 100)}%
                </label>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => setZoomLevel(Math.max(0.1, zoomLevel - 0.1))}
                    disabled={isLocked}
                    className={`px-2 py-1 bg-dark-800 border border-white/30 ${isLocked ? 'cursor-not-allowed opacity-50' : 'hover:border-white'}`}
                  >
                    <ZoomOut size={14} />
                  </button>
                  <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={zoomLevel}
                    onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
                    disabled={isLocked}
                    className="flex-1"
                  />
                  <button
                    onClick={() => setZoomLevel(Math.min(3, zoomLevel + 0.1))}
                    disabled={isLocked}
                    className={`px-2 py-1 bg-dark-800 border border-white/30 ${isLocked ? 'cursor-not-allowed opacity-50' : 'hover:border-white'}`}
                  >
                    <ZoomIn size={14} />
                  </button>
                </div>
              </div>
            </>
          )}

          {project && (
            <div className="text-sm text-gray-400 pt-2 border-t border-dark-700">
              {project.paperSize}: {project.widthCm}×{project.heightCm}cm
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default Workspace;
