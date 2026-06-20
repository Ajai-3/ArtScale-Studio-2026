import React from 'react';
import { X } from 'lucide-react';
import { TOUR_STEPS } from '../../constants/workspace';
import { type UseWorkspaceType } from '../../hooks/useWorkspace';

type TourPopoverProps = Pick<UseWorkspaceType, 'tourStep' | 'setTourStep' | 'popoverCoords'>;

export const TourPopover: React.FC<TourPopoverProps> = ({
  tourStep,
  setTourStep,
  popoverCoords,
}) => {
  if (tourStep === null || !popoverCoords) return null;

  const currentStep = TOUR_STEPS[tourStep];

  return (
    <div
      className="fixed z-50 bg-[#161616]/95 border border-[#abf600]/30 shadow-[0_0_20px_rgba(171,246,0,0.15)] rounded-lg p-4 w-[320px] backdrop-blur-md transition-all duration-300 text-left font-sans"
      style={{
        top: popoverCoords.top,
        left: popoverCoords.left,
      }}
    >
      {popoverCoords.arrow !== 'center' && (
        <div
          className={`absolute w-3 h-3 bg-[#161616] border-[#abf600]/30 ${
            popoverCoords.arrow === 'top'
              ? '-top-1.5 border-t border-l'
              : popoverCoords.arrow === 'bottom'
              ? '-bottom-1.5 border-r border-b'
              : popoverCoords.arrow === 'left'
              ? '-left-1.5 border-l border-b'
              : '-right-1.5 border-t border-r'
          }`}
          style={{
            left:
              popoverCoords.arrowLeft !== undefined
                ? `${popoverCoords.arrowLeft}px`
                : popoverCoords.arrow === 'left' || popoverCoords.arrow === 'right'
                ? undefined
                : '50%',
            top:
              popoverCoords.arrowTop !== undefined
                ? `${popoverCoords.arrowTop}px`
                : popoverCoords.arrow === 'top' || popoverCoords.arrow === 'bottom'
                ? undefined
                : '50%',
            transform: `translate(${popoverCoords.arrowLeft !== undefined ? '-50%' : '0px'}, ${
              popoverCoords.arrowTop !== undefined ? '-50%' : '0px'
            }) rotate(45deg)`,
          }}
        />
      )}

      <div className="relative">
        <button
          onClick={() => {
            setTourStep(null);
            localStorage.setItem('artscale-tour-done', 'true');
          }}
          className="absolute top-0 right-0 text-[#a0a0a0] hover:text-[#abf600] transition-colors"
        >
          <X size={15} />
        </button>

        <h3 className="text-sm font-bold text-[#f3f3f3] mb-1.5 pr-5">{currentStep.title}</h3>
        <p className="text-xs text-[#a0a0a0] leading-relaxed mb-4">{currentStep.content}</p>

        <div className="flex items-center justify-between">
          <span className="text-[10px] text-[#a0a0a0] font-mono">
            {tourStep + 1} / {TOUR_STEPS.length}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setTourStep(null);
                localStorage.setItem('artscale-tour-done', 'true');
              }}
              className="px-2 py-1 text-[11px] font-bold text-[#a0a0a0] hover:text-[#f3f3f3] transition-colors"
            >
              Skip
            </button>
            {tourStep > 0 && (
              <button
                onClick={() => setTourStep(tourStep - 1)}
                className="px-2.5 py-1 text-[11px] font-bold rounded border border-[#abf600]/20 text-[#a0a0a0] hover:border-[#abf600]/50 hover:text-[#f3f3f3] transition-all"
              >
                Back
              </button>
            )}
            <button
              onClick={() => {
                if (tourStep < TOUR_STEPS.length - 1) {
                  setTourStep(tourStep + 1);
                } else {
                  setTourStep(null);
                  localStorage.setItem('artscale-tour-done', 'true');
                }
              }}
              className="px-3 py-1 text-[11px] font-bold rounded bg-[#abf600] text-[#111111] hover:bg-[#c5ff1a] transition-all shadow-[0_0_10px_rgba(171,246,0,0.2)]"
            >
              {tourStep === TOUR_STEPS.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
