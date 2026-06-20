import React from 'react';
import { ArrowLeft, Lock, Unlock, Download, SlidersHorizontal, HelpCircle } from 'lucide-react';
import { type UseWorkspaceType } from '../../hooks/useWorkspace';

type WorkspaceHeaderProps = Pick<
  UseWorkspaceType,
  | 'project'
  | 'navigate'
  | 'isLocked'
  | 'setIsLocked'
  | 'isRealSize'
  | 'setIsRealSize'
  | 'setPpi'
  | 'setZoomLevel'
  | 'handleDownload'
  | 'sidebarOpen'
  | 'setSidebarOpen'
  | 'setTourStep'
>;

export const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({
  project,
  navigate,
  isLocked,
  setIsLocked,
  isRealSize,
  setIsRealSize,
  setPpi,
  setZoomLevel,
  handleDownload,
  sidebarOpen,
  setSidebarOpen,
  setTourStep,
}) => {
  return (
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
          onClick={() => {
            setTourStep(0);
          }}
          className="text-xs font-bold px-3 py-1.5 rounded border border-[#abf600]/25 text-[#a0a0a0] hover:border-[#abf600]/50 hover:text-[#f3f3f3] transition-all flex items-center gap-1.5"
          title="Start Walkthrough Tour"
        >
          <HelpCircle size={13} />
          <span className="hidden sm:inline">Tour</span>
        </button>
        <button
          id="tour-realsize"
          onClick={() => {
            const nextVal = !isRealSize;
            setIsRealSize(nextVal);
            if (nextVal) {
              const savedPpi = localStorage.getItem('artscale-realsize-ppi');
              const savedZoom = localStorage.getItem('artscale-realsize-zoom');
              setPpi(savedPpi ? parseInt(savedPpi) : 94);
              setZoomLevel(savedZoom ? parseFloat(savedZoom) : 1.2);
            }
          }}
          disabled={isLocked}
          className={`hidden sm:block text-xs font-bold px-3 py-1.5 rounded border transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
            isRealSize
              ? 'bg-[#abf600] text-[#111111] border-[#abf600]'
              : 'border-[#abf600]/25 text-[#a0a0a0] hover:border-[#abf600]/50 hover:text-[#f3f3f3]'
          }`}
        >
          Real Size
        </button>
        <div id="tour-controls" className="flex items-center gap-2">
          <button
            onClick={() => setIsLocked(!isLocked)}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded border transition-all ${
              isLocked
                ? 'bg-[#ff6b6b]/20 border-[#ff6b6b]/40 text-[#ff6b6b]'
                : 'border-[#abf600]/25 text-[#a0a0a0] hover:border-[#abf600]/50 hover:text-[#f3f3f3]'
            }`}
          >
            {isLocked ? (
              <>
                <Lock size={12} /> <span className="hidden sm:inline">Locked</span>
              </>
            ) : (
              <>
                <Unlock size={12} /> <span className="hidden sm:inline">Lock</span>
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            disabled={isLocked}
            className="flex items-center gap-1.5 bg-[#abf600] text-[#111111] font-bold text-xs px-3 py-1.5 rounded hover:bg-[#c5ff1a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Download size={12} /> <span className="hidden sm:inline">Export</span>
          </button>
        </div>
        <button
          id="tour-settings"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded border transition-all ${
            sidebarOpen
              ? 'bg-[#abf600]/15 border-[#abf600]/50 text-[#abf600]'
              : 'border-[#abf600]/25 text-[#a0a0a0] hover:border-[#abf600]/50 hover:text-[#f3f3f3]'
          }`}
          aria-label="Toggle settings"
        >
          <SlidersHorizontal size={14} />
          <span className="hidden sm:inline">Settings</span>
        </button>
      </div>
    </header>
  );
};
