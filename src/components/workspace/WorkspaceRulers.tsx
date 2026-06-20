import React from 'react';
import { RULER_SIZE } from '../../constants/workspace';

interface RulerProps {
  scrollOffset: number;
  length: number;
  pixelsPerCm: number;
  zoomLevel: number;
}

export const HorizontalRuler: React.FC<RulerProps> = ({
  scrollOffset,
  length,
  pixelsPerCm,
  zoomLevel,
}) => {
  const ticks = [];
  const offset = 24; // 24px padding-left of the canvas scroll container
  const spacing = pixelsPerCm * zoomLevel;
  const maxCm = Math.ceil(length / spacing) + 2;

  let step = 1;
  if (spacing >= 35) {
    step = 0.1;
  } else if (spacing >= 15) {
    step = 0.5;
  }

  const stepMm = Math.round(step * 10);
  const endMm = Math.round(maxCm * 10);

  for (let mm = 0; mm <= endMm; mm += stepMm) {
    const cm = mm / 10;
    const x = offset + cm * spacing;

    const isMajor = mm % 50 === 0; // 5 cm
    const isMid = mm % 10 === 0;   // 1 cm
    const isHalf = mm % 5 === 0;   // 0.5 cm

    let tickH = 4;
    if (isMajor) {
      tickH = 14;
    } else if (isMid) {
      tickH = 9;
    } else if (isHalf) {
      tickH = 6;
    }

    ticks.push(
      <line
        key={`ht-${mm}`}
        x1={x}
        y1={RULER_SIZE - tickH}
        x2={x}
        y2={RULER_SIZE}
        stroke="#ABF600"
        strokeWidth={isMajor ? 1.5 : 1}
        opacity={isMajor ? 0.9 : isMid ? 0.6 : 0.3}
      />
    );

    if (isMajor && cm >= 0) {
      ticks.push(
        <text
          key={`hl-${mm}`}
          x={x + 2}
          y={12}
          fontSize="9"
          fill="#ABF600"
          fontFamily="monospace"
          fontWeight="bold"
          opacity="0.9"
        >
          {cm}
        </text>
      );
    } else if (isMid && cm > 0 && spacing >= 20) {
      ticks.push(
        <text
          key={`hl-mid-${mm}`}
          x={x + 2}
          y={15}
          fontSize="8"
          fill="#ABF600"
          fontFamily="monospace"
          opacity="0.6"
        >
          {cm}
        </text>
      );
    }
  }

  return (
    <div className="flex flex-shrink-0" style={{ height: RULER_SIZE }}>
      <div
        className="flex-shrink-0 bg-[#161616] border-r border-b border-[#abf600]/20"
        style={{ width: RULER_SIZE, height: RULER_SIZE }}
      />
      <div className="flex-1 overflow-hidden bg-[#161616] border-b border-[#abf600]/20">
        <div style={{ transform: `translateX(-${scrollOffset}px)`, willChange: 'transform' }}>
          <svg width={Math.max(length + 200, 2000)} height={RULER_SIZE} style={{ display: 'block' }}>
            {ticks}
          </svg>
        </div>
      </div>
    </div>
  );
};

export const VerticalRuler: React.FC<RulerProps> = ({
  scrollOffset,
  length,
  pixelsPerCm,
  zoomLevel,
}) => {
  const ticks = [];
  const offset = 24; // 24px padding-top of the canvas scroll container
  const spacing = pixelsPerCm * zoomLevel;
  const maxCm = Math.ceil(length / spacing) + 2;

  let step = 1;
  if (spacing >= 35) {
    step = 0.1;
  } else if (spacing >= 15) {
    step = 0.5;
  }

  const stepMm = Math.round(step * 10);
  const endMm = Math.round(maxCm * 10);

  for (let mm = 0; mm <= endMm; mm += stepMm) {
    const cm = mm / 10;
    const y = offset + cm * spacing;

    const isMajor = mm % 50 === 0; // 5 cm
    const isMid = mm % 10 === 0;   // 1 cm
    const isHalf = mm % 5 === 0;   // 0.5 cm

    let tickW = 4;
    if (isMajor) {
      tickW = 14;
    } else if (isMid) {
      tickW = 9;
    } else if (isHalf) {
      tickW = 6;
    }

    ticks.push(
      <line
        key={`vt-${mm}`}
        x1={RULER_SIZE - tickW}
        y1={y}
        x2={RULER_SIZE}
        y2={y}
        stroke="#ABF600"
        strokeWidth={isMajor ? 1.5 : 1}
        opacity={isMajor ? 0.9 : isMid ? 0.6 : 0.3}
      />
    );

    if (isMajor && cm >= 0) {
      ticks.push(
        <text
          key={`vl-${mm}`}
          x={2}
          y={y + 10}
          fontSize="9"
          fill="#ABF600"
          fontFamily="monospace"
          fontWeight="bold"
          opacity="0.9"
        >
          {cm}
        </text>
      );
    } else if (isMid && cm > 0 && spacing >= 20) {
      ticks.push(
        <text
          key={`vl-mid-${mm}`}
          x={2}
          y={y + 8}
          fontSize="8"
          fill="#ABF600"
          fontFamily="monospace"
          opacity="0.6"
        >
          {cm}
        </text>
      );
    }
  }

  return (
    <div
      className="flex-shrink-0 overflow-hidden bg-[#161616] border-r border-[#abf600]/20"
      style={{ width: RULER_SIZE }}
    >
      <div style={{ transform: `translateY(-${scrollOffset}px)`, willChange: 'transform' }}>
        <svg width={RULER_SIZE} height={Math.max(length + 200, 2000)} style={{ display: 'block' }}>
          {ticks}
        </svg>
      </div>
    </div>
  );
};
