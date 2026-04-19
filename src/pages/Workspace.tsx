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
import { Button } from '../components/ui/button';

const Workspace = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [gridSpacing, setGridSpacing] = useState(2.5);
  const [showVertical, setShowVertical] = useState(true);
  const [showHorizontal, setShowHorizontal] = useState(true);
  const [showDiagonal, setShowDiagonal] = useState(false);
  const [valueStudy, setValueStudy] = useState(false);
  const [lineColor, setLineColor] = useState('#3B82F6');
  const [lineThickness, setLineThickness] = useState(1);
  const [showNumbers, setShowNumbers] = useState({
    top: false,
    bottom: true,
    left: true,
    right: false,
  });
  const [useGlobalColor, setUseGlobalColor] = useState(true);
  const [verColor, setVerColor] = useState('#3B82F6');
  const [horColor, setHorColor] = useState('#3B82F6');
  const [diagColor, setDiagColor] = useState('#3B82F6');
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
          stroke="hsl(210, 100%, 50%)"
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
            fill="hsl(210, 100%, 50%)"
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
          stroke="hsl(210, 100%, 50%)"
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
            fill="hsl(210, 100%, 50%)"
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

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (isLocked) return;

    e.preventDefault();

    // Scroll up (negative deltaY) = zoom in, Scroll down (positive deltaY) = zoom out
    const zoomFactor = 0.1;
    let newZoom = zoomLevel;

    if (e.deltaY < 0) {
      // Scroll up - zoom in
      newZoom = Math.min(3, zoomLevel + zoomFactor);
    } else {
      // Scroll down - zoom out
      newZoom = Math.max(0.1, zoomLevel - zoomFactor);
    }

    setZoomLevel(newZoom);
  };

  const handleDownload = () => {
    if (!project) return;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#0A0A0A';
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
      className={`px-3 py-1 text-xs font-bold rounded border transition-all ${active ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground border-border'} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      {active ? 'ON' : 'OFF'}
    </button>
  );

  return (
    <div className="h-screen flex bg-background">
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-card border-b px-4 py-2 flex justify-between items-center">
          <Button
            onClick={() => navigate('/gallery')}
            disabled={isLocked}
            variant="ghost"
            size="sm"
            className="gap-1"
          >
            <ArrowLeft size={16} /> Gallery
          </Button>
          <h1 className="text-lg font-bold text-primary">
            {project?.name || 'Untitled'}
          </h1>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setIsRealSize(!isRealSize)}
              disabled={isLocked}
              variant={isRealSize ? 'default' : 'outline'}
              size="sm"
            >
              Real Size
            </Button>
            <Button
              onClick={() => setIsLocked(!isLocked)}
              variant={isLocked ? 'destructive' : 'outline'}
              size="sm"
            >
              {isLocked ? <Lock size={14} /> : <Unlock size={14} />}
            </Button>
            <Button
              onClick={handleDownload}
              disabled={isLocked}
              size="sm"
              className="gap-1"
            >
              <Download size={14} /> Download
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-hidden bg-card flex flex-col">
          {project ? (
            <>
              {/* Top Ruler - Fixed Height, Scrolls Horizontally */}
              {showRuler && (
                <div className="flex flex-shrink-0 h-10 bg-secondary border-b">
                  {/* Top-Left Corner */}
                  <div className="w-10 h-10 bg-background border-r flex-shrink-0" />
                  {/* Top Ruler SVG */}
                  <div className="flex-1 overflow-x-hidden">
                    <svg
                      width={width}
                      height="40"
                      style={{ display: 'block' }}
                      className="bg-secondary"
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
                  <div className="w-10 flex-shrink-0 bg-secondary border-r overflow-y-hidden">
                    <svg width="40" height={height} className="bg-secondary">
                      {renderRuler().filter((r: any) =>
                        r.key?.toString().startsWith('v-ruler'),
                      )}
                    </svg>
                  </div>
                )}

                {/* Image Canvas - Scrollable */}
                <div
                  className="flex-1 overflow-auto bg-background scrollbar-hidden"
                  onWheel={handleWheel}
                >
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
            <div className="flex items-center justify-center w-full h-full text-muted-foreground">
              Select a project from gallery
            </div>
          )}
        </div>
      </main>

      <aside className="w-72 bg-card border-l flex flex-col">
        <div className="p-3 border-b">
          <h2 className="text-lg font-bold text-primary">Settings</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-foreground">
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
              className={`w-full bg-background border border-input px-2 py-1 rounded focus:ring-2 focus:ring-primary outline-none ${isLocked ? 'cursor-not-allowed opacity-50' : ''}`}
            />
            <div className="flex flex-wrap gap-1 mt-2">
              {[1, 1.5, 2, 2.5, 3, 4, 5, 10].map((v) => (
                <button
                  key={v}
                  onClick={() => setGridSpacing(v)}
                  disabled={isLocked}
                  className={`px-2 py-1 text-xs rounded transition-all ${gridSpacing === v ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground'} ${isLocked ? 'cursor-not-allowed opacity-50' : ''}`}
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
              {(['top', 'bottom', 'left', 'right'] as const).map((side) => (
                <Button
                  key={side}
                  onClick={() =>
                    setShowNumbers((p) => ({ ...p, [side]: !p[side] }))
                  }
                  disabled={isLocked}
                  variant={showNumbers[side] ? 'default' : 'outline'}
                  size="sm"
                  className="text-xs"
                >
                  {side.charAt(0).toUpperCase() + side.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex gap-2 text-sm items-center">
              <input
                type="checkbox"
                checked={useGlobalColor}
                onChange={(e) => setUseGlobalColor(e.target.checked)}
                disabled={isLocked}
                className="rounded"
              />{' '}
              Same color
            </label>
            {useGlobalColor ? (
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="color"
                  value={lineColor}
                  onChange={(e) => setLineColor(e.target.value)}
                  disabled={isLocked}
                  className={`w-8 h-8 rounded ${isLocked ? 'cursor-not-allowed opacity-50' : ''}`}
                />
                <span className="text-sm text-muted-foreground">
                  {lineColor}
                </span>
              </div>
            ) : (
              <div className="flex gap-2 mt-2">
                <div className="flex flex-col items-center">
                  <input
                    type="color"
                    value={verColor}
                    onChange={(e) => setVerColor(e.target.value)}
                    disabled={isLocked}
                    className={`w-7 h-7 rounded ${isLocked ? 'cursor-not-allowed opacity-50' : ''}`}
                  />
                  <span className="text-xs text-muted-foreground">V</span>
                </div>
                <div className="flex flex-col items-center">
                  <input
                    type="color"
                    value={horColor}
                    onChange={(e) => setHorColor(e.target.value)}
                    disabled={isLocked}
                    className={`w-7 h-7 rounded ${isLocked ? 'cursor-not-allowed opacity-50' : ''}`}
                  />
                  <span className="text-xs text-muted-foreground">H</span>
                </div>
                <div className="flex flex-col items-center">
                  <input
                    type="color"
                    value={diagColor}
                    onChange={(e) => setDiagColor(e.target.value)}
                    disabled={isLocked}
                    className={`w-7 h-7 rounded ${isLocked ? 'cursor-not-allowed opacity-50' : ''}`}
                  />
                  <span className="text-xs text-muted-foreground">D</span>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">
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

          <label className="flex gap-2 text-sm items-center">
            <input
              type="checkbox"
              checked={valueStudy}
              onChange={(e) => setValueStudy(e.target.checked)}
              disabled={isLocked}
              className="rounded"
            />{' '}
            B&W Filter
          </label>

          <label className="flex gap-2 text-sm items-center">
            <input
              type="checkbox"
              checked={showRuler}
              onChange={(e) => setShowRuler(e.target.checked)}
              disabled={isLocked}
              className="rounded"
            />{' '}
            Show Ruler
          </label>

          {isRealSize && (
            <>
              <div className="border-t pt-4">
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
                      className={`px-2 py-1 text-xs rounded transition-all ${ppi === p ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground'} ${isLocked ? 'cursor-not-allowed opacity-50' : ''}`}
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
                  <Button
                    onClick={() => setZoomLevel(Math.max(0.1, zoomLevel - 0.1))}
                    disabled={isLocked}
                    variant="outline"
                    size="sm"
                  >
                    <ZoomOut size={14} />
                  </Button>
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
                  <Button
                    onClick={() => setZoomLevel(Math.min(3, zoomLevel + 0.1))}
                    disabled={isLocked}
                    variant="outline"
                    size="sm"
                  >
                    <ZoomIn size={14} />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </aside>
    </div>
  );
};

export default Workspace;
