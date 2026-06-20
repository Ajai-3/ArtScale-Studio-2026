import React from 'react';
import { Grid3x3, X, SlidersHorizontal, ZoomOut, ZoomIn } from 'lucide-react';
import { Button } from '../ui/button';
import { type UseWorkspaceType } from '../../hooks/useWorkspace';

type WorkspaceSidebarProps = Pick<
  UseWorkspaceType,
  | 'sidebarOpen'
  | 'setSidebarOpen'
  | 'gridSpacing'
  | 'setGridSpacing'
  | 'isLocked'
  | 'showVertical'
  | 'setShowVertical'
  | 'showHorizontal'
  | 'setShowHorizontal'
  | 'showDiagonal'
  | 'setShowDiagonal'
  | 'showNumbers'
  | 'setShowNumbers'
  | 'useGlobalColor'
  | 'setUseGlobalColor'
  | 'lineColor'
  | 'setLineColor'
  | 'verColor'
  | 'setVerColor'
  | 'horColor'
  | 'setHorColor'
  | 'diagColor'
  | 'setDiagColor'
  | 'lineThickness'
  | 'setLineThickness'
  | 'valueStudy'
  | 'setValueStudy'
  | 'showRuler'
  | 'setShowRuler'
  | 'isRealSize'
  | 'ppi'
  | 'setPpi'
  | 'ppiInput'
  | 'handlePpiInputChange'
  | 'handlePpiInputBlur'
  | 'zoomLevel'
  | 'setZoomLevel'
>;

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
    className={`px-3 py-1 text-xs font-bold rounded border transition-all ${
      active
        ? 'bg-[#abf600] text-[#111111] border-[#abf600]'
        : 'bg-[#111111] text-[#a0a0a0] border-[#abf600]/20'
    } ${disabled ? 'cursor-not-allowed opacity-40' : 'hover:border-[#abf600]/50'}`}
  >
    {active ? 'ON' : 'OFF'}
  </button>
);

export const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  gridSpacing,
  setGridSpacing,
  isLocked,
  showVertical,
  setShowVertical,
  showHorizontal,
  setShowHorizontal,
  showDiagonal,
  setShowDiagonal,
  showNumbers,
  setShowNumbers,
  useGlobalColor,
  setUseGlobalColor,
  lineColor,
  setLineColor,
  verColor,
  setVerColor,
  horColor,
  setHorColor,
  diagColor,
  setDiagColor,
  lineThickness,
  setLineThickness,
  valueStudy,
  setValueStudy,
  showRuler,
  setShowRuler,
  isRealSize,
  ppi,
  setPpi,
  ppiInput,
  handlePpiInputChange,
  handlePpiInputBlur,
  zoomLevel,
  setZoomLevel,
}) => {
  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-[45px] right-0 bottom-0 z-40 w-64 bg-[#1a1a1a] border-l border-[#abf600]/15 flex flex-col overflow-hidden
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}
          lg:static lg:translate-x-0 lg:flex-shrink-0 lg:top-auto lg:bottom-auto
        `}
      >
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
            <label className="block text-xs font-bold text-[#a0a0a0] uppercase tracking-widest mb-2">
              Cell Size (cm)
            </label>
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
                  className={`px-2 py-0.5 text-xs rounded transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                    gridSpacing === v
                      ? 'bg-[#abf600] text-[#111111] font-bold'
                      : 'bg-[#111111] text-[#a0a0a0] border-[#abf600]/15 hover:border-[#abf600]/40'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-[#abf600]/10 pt-4">
            <label className="block text-xs font-bold text-[#a0a0a0] uppercase tracking-widest mb-3">
              Grid Layers
            </label>
            <div className="space-y-2">
              {[
                {
                  label: 'Vertical',
                  state: showVertical,
                  set: () => setShowVertical(!showVertical),
                },
                {
                  label: 'Horizontal',
                  state: showHorizontal,
                  set: () => setShowHorizontal(!showHorizontal),
                },
                {
                  label: 'Diagonal',
                  state: showDiagonal,
                  set: () => setShowDiagonal(!showDiagonal),
                },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-[#f3f3f3]">{item.label}</span>
                  <ToggleBtn active={item.state} onClick={item.set} disabled={isLocked} />
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[#abf600]/10 pt-4">
            <label className="block text-xs font-bold text-[#a0a0a0] uppercase tracking-widest mb-2">
              Numbers
            </label>
            <div className="grid grid-cols-4 gap-1">
              {(['top', 'bottom', 'left', 'right'] as const).map((side) => (
                <button
                  key={side}
                  onClick={() => setShowNumbers((p) => ({ ...p, [side]: !p[side] }))}
                  disabled={isLocked}
                  className={`py-1 text-xs rounded border transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                    showNumbers[side]
                      ? 'bg-[#abf600] text-[#111111] font-bold border-[#abf600]'
                      : 'bg-[#111111] text-[#a0a0a0] border-[#abf600]/15 hover:border-[#abf600]/40'
                  }`}
                >
                  {side.charAt(0).toUpperCase() + side.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-[#abf600]/10 pt-4">
            <label className="block text-xs font-bold text-[#a0a0a0] uppercase tracking-widest mb-3">
              Line Color
            </label>
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
                <input
                  type="color"
                  value={lineColor}
                  onChange={(e) => setLineColor(e.target.value)}
                  disabled={isLocked}
                  className="w-9 h-9 rounded cursor-pointer border border-[#abf600]/20 bg-transparent disabled:opacity-40"
                />
                <span className="text-xs font-mono text-[#a0a0a0]">{lineColor.toUpperCase()}</span>
              </div>
            ) : (
              <div className="flex gap-4">
                {[
                  { label: 'V', val: verColor, set: setVerColor },
                  { label: 'H', val: horColor, set: setHorColor },
                  { label: 'D', val: diagColor, set: setDiagColor },
                ].map((c) => (
                  <div key={c.label} className="flex flex-col items-center gap-1">
                    <input
                      type="color"
                      value={c.val}
                      onChange={(e) => c.set(e.target.value)}
                      disabled={isLocked}
                      className="w-8 h-8 rounded cursor-pointer border border-[#abf600]/20 bg-transparent disabled:opacity-40"
                    />
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
            <input
              type="range"
              min="1"
              max="5"
              value={lineThickness}
              onChange={(e) => setLineThickness(parseInt(e.target.value))}
              disabled={isLocked}
              className="w-full accent-[#abf600] disabled:opacity-40"
            />
          </div>

          <div className="border-t border-[#abf600]/10 pt-4 space-y-2.5">
            <label className="flex items-center gap-2 text-sm text-[#f3f3f3] cursor-pointer">
              <input
                type="checkbox"
                checked={valueStudy}
                onChange={(e) => setValueStudy(e.target.checked)}
                disabled={isLocked}
                className="rounded accent-[#abf600]"
              />
              B&W Value Filter
            </label>
            <label className="flex items-center gap-2 text-sm text-[#f3f3f3] cursor-pointer">
              <input
                type="checkbox"
                checked={showRuler}
                onChange={(e) => setShowRuler(e.target.checked)}
                disabled={isLocked}
                className="rounded accent-[#abf600]"
              />
              Show Ruler
            </label>
          </div>

          {isRealSize && (
            <div className="border-t border-[#abf600]/10 pt-4 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-[#a0a0a0] uppercase tracking-widest">
                    PPI:
                  </label>
                  <input
                    type="number"
                    min="72"
                    max="220"
                    value={ppiInput}
                    onChange={handlePpiInputChange}
                    onBlur={handlePpiInputBlur}
                    disabled={isLocked}
                    className="w-16 bg-[#111111] border border-[#abf600]/20 text-[#abf600] px-2 py-0.5 rounded text-xs text-center focus:outline-none focus:border-[#abf600] disabled:opacity-40"
                  />
                </div>
                <input
                  type="range"
                  min="72"
                  max="220"
                  value={ppi}
                  onChange={(e) => setPpi(parseInt(e.target.value))}
                  disabled={isLocked}
                  className="w-full accent-[#abf600]"
                />
                <div className="flex flex-wrap gap-1 mt-2">
                  {[72, 94, 96, 110, 120, 144].map((p) => (
                    <button
                      key={p}
                      onClick={() => setPpi(p)}
                      disabled={isLocked}
                      className={`px-2 py-0.5 text-xs rounded transition-all disabled:opacity-40 ${
                        ppi === p
                          ? 'bg-[#abf600] text-[#111111] font-bold'
                          : 'bg-[#111111] text-[#a0a0a0] border border-[#abf600]/15 hover:border-[#abf600]/40'
                      }`}
                    >
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
                  <Button
                    onClick={() => setZoomLevel(Math.max(0.1, zoomLevel - 0.1))}
                    disabled={isLocked}
                    variant="outline"
                    size="sm"
                  >
                    <ZoomOut size={13} />
                  </Button>
                  <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={zoomLevel}
                    onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
                    disabled={isLocked}
                    className="flex-1 accent-[#abf600]"
                  />
                  <Button
                    onClick={() => setZoomLevel(Math.min(3, zoomLevel + 0.1))}
                    disabled={isLocked}
                    variant="outline"
                    size="sm"
                  >
                    <ZoomIn size={13} />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
