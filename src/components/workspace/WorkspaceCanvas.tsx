import React from 'react';
import { type UseWorkspaceType } from '../../hooks/useWorkspace';

type WorkspaceCanvasProps = Pick<
  UseWorkspaceType,
  | 'project'
  | 'width'
  | 'height'
  | 'getImageSrc'
  | 'valueStudy'
  | 'showVertical'
  | 'showHorizontal'
  | 'showDiagonal'
  | 'gapCm'
  | 'pixelsPerCm'
  | 'zoomLevel'
  | 'effectiveVerColor'
  | 'effectiveHorColor'
  | 'effectiveDiagColor'
  | 'lineColor'
  | 'lineThickness'
  | 'showNumbers'
  | 'canvasScrollRef'
  | 'handleCanvasScroll'
  | 'handleWheel'
>;

export const WorkspaceCanvas: React.FC<WorkspaceCanvasProps> = ({
  project,
  width,
  height,
  getImageSrc,
  valueStudy,
  showVertical,
  showHorizontal,
  showDiagonal,
  gapCm,
  pixelsPerCm,
  zoomLevel,
  effectiveVerColor,
  effectiveHorColor,
  effectiveDiagColor,
  lineColor,
  lineThickness,
  showNumbers,
  canvasScrollRef,
  handleCanvasScroll,
  handleWheel,
}) => {
  if (!project) return null;

  const renderGridLines = () => {
    const lines = [];
    const maxCols = Math.floor((project.widthCm || 21) / gapCm);
    const maxRows = Math.floor((project.heightCm || 29.7) / gapCm);

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
          />
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
          />
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
            </g>
          );
        }
      }
    }
    return lines;
  };

  const renderNumbers = () => {
    const nums = [];
    const maxCols = Math.floor((project.widthCm || 21) / gapCm) + 1;
    const maxRows = Math.floor((project.heightCm || 29.7) / gapCm) + 1;
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
          </text>
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
          </text>
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
          </text>
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
          </text>
        );
      }
    }
    return nums;
  };

  return (
    <div
      ref={canvasScrollRef}
      id="tour-canvas"
      className="flex-1 overflow-auto bg-[#0d0d0d]"
      onScroll={handleCanvasScroll}
      onWheel={handleWheel}
    >
      <div className="p-6 inline-block min-w-full min-h-full">
        <div className="relative inline-block shadow-2xl" style={{ width, height }}>
          <img
            src={getImageSrc()}
            alt={project.name}
            className={`absolute top-0 left-0 ${valueStudy ? 'grayscale' : ''}`}
            style={{ width, height, objectFit: 'cover', display: 'block' }}
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
  );
};
