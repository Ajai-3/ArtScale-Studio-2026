import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { db, type Project } from '../lib/db';
import { PX_PER_CM, TOUR_STEPS } from '../constants/workspace';

export const useWorkspace = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
  const [ppiInput, setPpiInput] = useState('96');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isLocked, setIsLocked] = useState(false);
  const [showRuler, setShowRuler] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const canvasScrollRef = useRef<HTMLDivElement>(null);
  const [tourStep, setTourStep] = useState<number | null>(null);
  const [popoverCoords, setPopoverCoords] = useState<{
    top: number;
    left: number;
    arrow: 'top' | 'bottom' | 'left' | 'right' | 'center';
    arrowLeft?: number;
    arrowTop?: number;
  } | null>(null);

  useEffect(() => {
    const tourDone = localStorage.getItem('artscale-tour-done');
    if (!tourDone && project) {
      setTourStep(0);
    }
  }, [project]);

  useEffect(() => {
    setPpiInput(ppi.toString());
  }, [ppi]);

  useEffect(() => {
    if (tourStep === null || tourStep >= TOUR_STEPS.length) {
      setPopoverCoords(null);
      return;
    }

    const updatePosition = () => {
      const step = TOUR_STEPS[tourStep];
      const targetId = `tour-${step.target}`;
      const el = document.getElementById(targetId);
      const popoverWidth = 320;
      const popoverHeight = 180;

      if (!el) {
        setPopoverCoords({
          top: window.innerHeight / 2 - 100,
          left: window.innerWidth / 2 - 150,
          arrow: 'center',
        });
        return;
      }

      const rect = el.getBoundingClientRect();

      let top = 0;
      let left = 0;
      let arrow: 'top' | 'bottom' | 'left' | 'right' | 'center' = 'top';

      if (step.target === 'realsize' || step.target === 'controls') {
        top = rect.bottom + 12;
        left = rect.left + rect.width / 2 - popoverWidth / 2;
        arrow = 'top';
      } else if (step.target === 'settings') {
        left = rect.left - popoverWidth - 12;
        top = rect.top + rect.height / 2 - 80;
        arrow = 'right';
      } else if (step.target === 'rulers') {
        top = rect.bottom + 12;
        left = rect.left + 80;
        arrow = 'top';
      } else if (step.target === 'canvas') {
        left = rect.left + rect.width / 2 - popoverWidth / 2;
        top = rect.top + rect.height / 2 - 80;
        arrow = 'center';
      } else {
        top = rect.bottom + 12;
        left = rect.left + rect.width / 2 - popoverWidth / 2;
        arrow = 'top';
      }

      if (left < 16) left = 16;
      if (left + popoverWidth > window.innerWidth - 16) left = window.innerWidth - popoverWidth - 16;

      if (top < 16) {
        top = rect.bottom + 12;
        arrow = 'top';
      } else if (top + popoverHeight > window.innerHeight - 16) {
        top = rect.top - popoverHeight - 12;
        arrow = 'bottom';
      }

      const targetCenterX = rect.left + rect.width / 2;
      const targetCenterY = rect.top + rect.height / 2;

      let arrowLeft: number | undefined = undefined;
      let arrowTop: number | undefined = undefined;

      if (arrow === 'top' || arrow === 'bottom') {
        arrowLeft = targetCenterX - left;
        arrowLeft = Math.max(16, Math.min(popoverWidth - 16, arrowLeft));
      } else if ((arrow as string) === 'left' || arrow === 'right') {
        arrowTop = targetCenterY - top;
        arrowTop = Math.max(16, Math.min(popoverHeight - 16, arrowTop));
      }

      setPopoverCoords({ top, left, arrow, arrowLeft, arrowTop });
    };

    const timer = setTimeout(updatePosition, 100);
    window.addEventListener('resize', updatePosition);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updatePosition);
    };
  }, [tourStep, sidebarOpen, isRealSize]);

  useEffect(() => {
    if (isRealSize) {
      localStorage.setItem('artscale-realsize-ppi', ppi.toString());
    }
  }, [ppi, isRealSize]);

  useEffect(() => {
    if (isRealSize) {
      localStorage.setItem('artscale-realsize-zoom', zoomLevel.toString());
    }
  }, [zoomLevel, isRealSize]);

  useEffect(() => {
    if (tourStep === 2) {
      setIsRealSize(true);
      const savedPpi = localStorage.getItem('artscale-realsize-ppi');
      const savedZoom = localStorage.getItem('artscale-realsize-zoom');
      setPpi(savedPpi ? parseInt(savedPpi) : 94);
      setZoomLevel(savedZoom ? parseFloat(savedZoom) : 1.2);
    } else if (tourStep === 4) {
      setSidebarOpen(true);
    }
  }, [tourStep]);

  useEffect(() => {
    if (id) loadProject();
  }, [id]);

  const loadProject = async () => {
    if (id) {
      const p = await db.projects.get(parseInt(id));
      setProject(p || null);
    }
  };

  const gapCm = gridSpacing;
  const pixelsPerCm = isRealSize ? ppi / 2.54 : PX_PER_CM;
  const width = (project?.widthCm || 21) * pixelsPerCm * zoomLevel;
  const height = (project?.heightCm || 29.7) * pixelsPerCm * zoomLevel;
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

  const handlePpiInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valStr = e.target.value;
    setPpiInput(valStr);
    const parsed = parseInt(valStr);
    if (!isNaN(parsed) && parsed >= 72 && parsed <= 220) {
      setPpi(parsed);
    }
  };

  const handlePpiInputBlur = () => {
    const parsed = parseInt(ppiInput);
    if (isNaN(parsed) || parsed < 72) {
      setPpi(72);
      setPpiInput('72');
    } else if (parsed > 220) {
      setPpi(220);
      setPpiInput('220');
    } else {
      setPpi(parsed);
      setPpiInput(parsed.toString());
    }
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

  return {
    id,
    navigate,
    project,
    gridSpacing,
    setGridSpacing,
    showVertical,
    setShowVertical,
    showHorizontal,
    setShowHorizontal,
    showDiagonal,
    setShowDiagonal,
    valueStudy,
    setValueStudy,
    lineColor,
    setLineColor,
    lineThickness,
    setLineThickness,
    showNumbers,
    setShowNumbers,
    useGlobalColor,
    setUseGlobalColor,
    verColor,
    setVerColor,
    horColor,
    setHorColor,
    diagColor,
    setDiagColor,
    isRealSize,
    setIsRealSize,
    ppi,
    setPpi,
    ppiInput,
    setPpiInput,
    zoomLevel,
    setZoomLevel,
    isLocked,
    setIsLocked,
    showRuler,
    setShowRuler,
    sidebarOpen,
    setSidebarOpen,
    scrollX,
    scrollY,
    canvasScrollRef,
    tourStep,
    setTourStep,
    popoverCoords,
    gapCm,
    pixelsPerCm,
    width,
    height,
    effectiveVerColor,
    effectiveHorColor,
    effectiveDiagColor,
    handleCanvasScroll,
    handleWheel,
    getImageSrc,
    handlePpiInputChange,
    handlePpiInputBlur,
    handleDownload,
  };
};
export type UseWorkspaceType = ReturnType<typeof useWorkspace>;
