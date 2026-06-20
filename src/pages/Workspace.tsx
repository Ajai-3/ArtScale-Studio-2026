import { useWorkspace } from '../hooks/useWorkspace';
import { WorkspaceHeader } from '../components/workspace/WorkspaceHeader';
import { HorizontalRuler, VerticalRuler } from '../components/workspace/WorkspaceRulers';
import { WorkspaceCanvas } from '../components/workspace/WorkspaceCanvas';
import { WorkspaceSidebar } from '../components/workspace/WorkspaceSidebar';
import { TourPopover } from '../components/workspace/TourPopover';
import { Grid3x3 } from 'lucide-react';

const Workspace = () => {
  const ws = useWorkspace();

  return (
    <div className="h-screen flex flex-col bg-[#111111] overflow-hidden">
      <WorkspaceHeader
        project={ws.project}
        navigate={ws.navigate}
        isLocked={ws.isLocked}
        setIsLocked={ws.setIsLocked}
        isRealSize={ws.isRealSize}
        setIsRealSize={ws.setIsRealSize}
        setPpi={ws.setPpi}
        setZoomLevel={ws.setZoomLevel}
        handleDownload={ws.handleDownload}
        sidebarOpen={ws.sidebarOpen}
        setSidebarOpen={ws.setSidebarOpen}
        setTourStep={ws.setTourStep}
      />

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {ws.project ? (
            <>
              {ws.showRuler && (
                <HorizontalRuler
                  scrollOffset={ws.scrollX}
                  length={ws.width}
                  pixelsPerCm={ws.pixelsPerCm}
                  zoomLevel={ws.zoomLevel}
                />
              )}

              <div className="flex flex-1 overflow-hidden">
                {ws.showRuler && (
                  <VerticalRuler
                    scrollOffset={ws.scrollY}
                    length={ws.height}
                    pixelsPerCm={ws.pixelsPerCm}
                    zoomLevel={ws.zoomLevel}
                  />
                )}

                <WorkspaceCanvas
                  project={ws.project}
                  width={ws.width}
                  height={ws.height}
                  getImageSrc={ws.getImageSrc}
                  valueStudy={ws.valueStudy}
                  showVertical={ws.showVertical}
                  showHorizontal={ws.showHorizontal}
                  showDiagonal={ws.showDiagonal}
                  gapCm={ws.gapCm}
                  pixelsPerCm={ws.pixelsPerCm}
                  zoomLevel={ws.zoomLevel}
                  effectiveVerColor={ws.effectiveVerColor}
                  effectiveHorColor={ws.effectiveHorColor}
                  effectiveDiagColor={ws.effectiveDiagColor}
                  lineColor={ws.lineColor}
                  lineThickness={ws.lineThickness}
                  showNumbers={ws.showNumbers}
                  canvasScrollRef={ws.canvasScrollRef}
                  handleCanvasScroll={ws.handleCanvasScroll}
                  handleWheel={ws.handleWheel}
                />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full gap-4">
              <div className="w-16 h-16 bg-[#1a1a1a] border border-[#abf600]/15 rounded-2xl flex items-center justify-center">
                <Grid3x3 size={28} className="text-[#abf600]/40" />
              </div>
              <p className="text-[#a0a0a0] text-sm">No project loaded</p>
              <button
                onClick={() => ws.navigate('/gallery')}
                className="text-xs text-[#abf600] border border-[#abf600]/25 px-4 py-2 rounded hover:bg-[#abf600]/5 transition-colors"
              >
                Open from Gallery
              </button>
            </div>
          )}
        </main>

        <WorkspaceSidebar
          sidebarOpen={ws.sidebarOpen}
          setSidebarOpen={ws.setSidebarOpen}
          gridSpacing={ws.gridSpacing}
          setGridSpacing={ws.setGridSpacing}
          isLocked={ws.isLocked}
          showVertical={ws.showVertical}
          setShowVertical={ws.setShowVertical}
          showHorizontal={ws.showHorizontal}
          setShowHorizontal={ws.setShowHorizontal}
          showDiagonal={ws.showDiagonal}
          setShowDiagonal={ws.setShowDiagonal}
          showNumbers={ws.showNumbers}
          setShowNumbers={ws.setShowNumbers}
          useGlobalColor={ws.useGlobalColor}
          setUseGlobalColor={ws.setUseGlobalColor}
          lineColor={ws.lineColor}
          setLineColor={ws.setLineColor}
          verColor={ws.verColor}
          setVerColor={ws.setVerColor}
          horColor={ws.horColor}
          setHorColor={ws.setHorColor}
          diagColor={ws.diagColor}
          setDiagColor={ws.setDiagColor}
          lineThickness={ws.lineThickness}
          setLineThickness={ws.setLineThickness}
          valueStudy={ws.valueStudy}
          setValueStudy={ws.setValueStudy}
          showRuler={ws.showRuler}
          setShowRuler={ws.setShowRuler}
          isRealSize={ws.isRealSize}
          ppi={ws.ppi}
          setPpi={ws.setPpi}
          ppiInput={ws.ppiInput}
          handlePpiInputChange={ws.handlePpiInputChange}
          handlePpiInputBlur={ws.handlePpiInputBlur}
          zoomLevel={ws.zoomLevel}
          setZoomLevel={ws.setZoomLevel}
        />
      </div>

      <TourPopover
        tourStep={ws.tourStep}
        setTourStep={ws.setTourStep}
        popoverCoords={ws.popoverCoords}
      />
    </div>
  );
};

export default Workspace;
