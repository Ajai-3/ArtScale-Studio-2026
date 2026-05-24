import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Cropper from 'react-easy-crop';
import { Upload, Save, ArrowLeft, ZoomIn, ZoomOut } from 'lucide-react';
import { db, type Project } from '../lib/db';
import { Button } from '../components/ui/button';

interface PaperSize {
  name: string;
  widthCm: number;
  heightCm: number;
}

const PAPER_SIZES: PaperSize[] = [
  { name: 'A1', widthCm: 59.4, heightCm: 84.1 },
  { name: 'A2', widthCm: 42.0, heightCm: 59.4 },
  { name: 'A3', widthCm: 29.7, heightCm: 42.0 },
  { name: 'A4', widthCm: 21.0, heightCm: 29.7 },
  { name: 'A5', widthCm: 14.8, heightCm: 21.0 },
];

const CropPage = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [selectedPaper, setSelectedPaper] = useState<PaperSize>(PAPER_SIZES[3]);
  const [customWidth, setCustomWidth] = useState<number>(21.0);
  const [customHeight, setCustomHeight] = useState<number>(29.7);
  const [isCustom, setIsCustom] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [projectName, setProjectName] = useState('Untitled Project');
  const [showRuler, setShowRuler] = useState(true);
  const cropperRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCurrentAspectRatio = () => {
    if (isCustom) {
      return customWidth / customHeight;
    }
    return selectedPaper.widthCm / selectedPaper.heightCm;
  };

  const handleSave = async () => {
    if (!image || !croppedAreaPixels) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = image;
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
      img,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
    );

    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => resolve(blob!), 'image/png');
    });

    const aspectRatio = getCurrentAspectRatio();
    const project: Omit<Project, 'id'> = {
      name: projectName,
      imageData: blob,
      aspectRatio,
      paperSize: isCustom ? 'Custom' : selectedPaper.name,
      widthCm: isCustom ? customWidth : selectedPaper.widthCm,
      heightCm: isCustom ? customHeight : selectedPaper.heightCm,
      crop: croppedAreaPixels,
      createdAt: new Date(),
    };

    const id = await db.projects.add(project as Project);
    navigate(`/workspace/${id}`);
  };

  if (!image) {
    return (
      <div className="min-h-screen bg-[#111111] flex flex-col">
        <header className="border-b border-[#abf600]/10 bg-[#1a1a1a] px-6 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-[#a0a0a0] hover:text-[#abf600] transition-colors"
          >
            <ArrowLeft size={16} /> Back to Home
          </button>
        </header>
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-md w-full">
            <h1 className="text-3xl font-bold text-[#f3f3f3] mb-2">
              Upload Reference Image
            </h1>
            <p className="text-[#a0a0a0] mb-8">Choose a photo or artwork to scale onto your paper</p>
            <label className="cursor-pointer block">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="bg-[#1a1a1a] border-2 border-dashed border-[#abf600]/25 hover:border-[#abf600]/60 hover:bg-[#1e1e1e] transition-all rounded-xl p-14 group">
                <Upload size={52} className="mx-auto mb-4 text-[#abf600]/60 group-hover:text-[#abf600] transition-colors" />
                <p className="text-[#f3f3f3] text-lg font-medium">Click to upload image</p>
                <p className="text-[#a0a0a0] text-sm mt-2">Supports JPG, PNG, WebP</p>
              </div>
            </label>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-muted">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Button
            onClick={() => setImage(null)}
            variant="ghost"
            size="sm"
            className="gap-2"
          >
            <ArrowLeft size={20} /> Back
          </Button>
          <h1 className="text-2xl font-bold text-primary">Crop Image</h1>
          <Button onClick={handleSave} size="sm" className="gap-2">
            <Save size={20} /> Save & Continue
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 grid lg:grid-cols-3 gap-6">
        {/* Crop Area */}
        <div className="lg:col-span-2">
          <div className="relative h-[600px] bg-background border border-primary rounded-lg overflow-hidden">
            <style>{`
              .cropper-container {
                background: hsl(var(--background)) !important;
              }
              .cropper-crop-box {
                background: hsl(var(--primary)) !important;
                opacity: 0.15;
              }
              .cropper-drag-box {
                background: rgba(0, 0, 0, 0.8);
              }
              .cropper-modal {
                background: rgba(0, 0, 0, 0.7);
              }
              .cropper-grid {
                background-image: linear-gradient(0deg, transparent 24%, rgba(171, 246, 0, 0.15) 25%, rgba(171, 246, 0, 0.15) 26%, transparent 27%, transparent 74%, rgba(171, 246, 0, 0.15) 75%, rgba(171, 246, 0, 0.15) 76%, transparent 77%, transparent);
                background-size: 40px 40px;
              }
              .cropper-center {
                background-color: rgba(171, 246, 0, 0.5);
              }
              .cropper-face {
                background: rgba(171, 246, 0, 0.3);
              }
              .cropper-line {
                background-color: rgba(171, 246, 0, 0.6);
              }
              .cropper-point {
                background-color: rgba(171, 246, 0, 0.8);
                box-shadow: 0 0 5px rgba(171, 246, 0, 0.9);
              }
            `}</style>
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={getCurrentAspectRatio()}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              cropShape="rect"
              showGrid={true}
              gridProps={{
                strokeColor: 'rgba(171, 246, 0, 0.15)',
                strokeWidth: 1,
              }}
              style={{
                containerStyle: {
                  background: 'rgb(17, 17, 17)',
                },
              }}
            />
          </div>

          {/* Zoom Controls */}
          <div className="mt-4 bg-card border rounded-lg p-4">
            <style>{`
              input[type="range"] {
                appearance: none;
                width: 100%;
                height: 6px;
                border-radius: 5px;
                background: linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) 50%, hsl(var(--muted)) 50%, hsl(var(--muted)) 100%);
                outline: none;
              }
              input[type="range"]::-webkit-slider-thumb {
                appearance: none;
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: hsl(var(--primary));
                cursor: pointer;
                box-shadow: 0 0 8px rgba(171, 246, 0, 0.6);
              }
              input[type="range"]::-moz-range-thumb {
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: hsl(var(--primary));
                cursor: pointer;
                border: none;
                box-shadow: 0 0 8px rgba(171, 246, 0, 0.6);
              }
            `}</style>
            <div className="flex items-center gap-4">
              <ZoomOut size={20} className="text-muted-foreground" />
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="flex-1"
              />
              <ZoomIn size={20} className="text-muted-foreground" />
              <span className="text-foreground font-mono w-16 text-right">
                {Math.round(zoom * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        <div className="space-y-6">
          {/* Project Name */}
          <div className="bg-card border border-muted rounded-lg p-6">
            <label className="block text-sm font-bold text-muted-foreground mb-2">
              Project Name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full bg-input border border-primary text-foreground px-4 py-3 rounded focus:ring-2 focus:ring-primary outline-none placeholder-muted-foreground"
              placeholder="Enter project name"
            />
          </div>

          {/* Paper Size Selection */}
          <div className="bg-card border border-muted rounded-lg p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">
              Paper Size
            </h3>
            <div className="space-y-2">
              {PAPER_SIZES.map((paper) => (
                <button
                  key={paper.name}
                  onClick={() => {
                    setSelectedPaper(paper);
                    setIsCustom(false);
                  }}
                  className={`w-full p-4 border rounded transition-all ${
                    !isCustom && selectedPaper.name === paper.name
                      ? 'border-primary bg-primary/20 shadow-lg shadow-primary/20'
                      : 'border-muted hover:border-primary hover:bg-primary/5'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-foreground">
                      {paper.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {paper.widthCm} × {paper.heightCm} cm
                    </span>
                  </div>
                </button>
              ))}
              <button
                onClick={() => setIsCustom(true)}
                className={`w-full p-4 border rounded transition-all ${
                  isCustom
                    ? 'border-primary bg-primary/20 shadow-lg shadow-primary/20'
                    : 'border-muted hover:border-primary hover:bg-primary/5'
                }`}
              >
                <span className="font-bold text-foreground">Custom</span>
              </button>
            </div>
          </div>

          {/* Custom Dimensions */}
          {isCustom && (
            <div className="bg-card border border-muted rounded-lg p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">
                Custom Dimensions
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">
                    Width (cm)
                  </label>
                  <input
                    type="number"
                    value={customWidth}
                    onChange={(e) => setCustomWidth(Number(e.target.value))}
                    className="w-full bg-input border border-primary text-foreground px-4 py-3 rounded focus:ring-2 focus:ring-primary outline-none placeholder-muted-foreground"
                    step={0.1}
                    min={1}
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    value={customHeight}
                    onChange={(e) => setCustomHeight(Number(e.target.value))}
                    className="w-full bg-input border border-primary text-foreground px-4 py-3 rounded focus:ring-2 focus:ring-primary outline-none placeholder-muted-foreground"
                    step={0.1}
                    min={1}
                  />
                </div>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                Aspect Ratio: {(customWidth / customHeight).toFixed(3)}
              </div>
            </div>
          )}

          {/* Current Settings Info */}
          <div className="bg-card border border-muted rounded-lg p-6">
            <h3 className="text-lg font-bold text-foreground mb-2">
              Current Settings
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Format:</span>
                <span className="text-foreground">
                  {isCustom ? 'Custom' : selectedPaper.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Dimensions:</span>
                <span className="text-foreground">
                  {isCustom ? customWidth : selectedPaper.widthCm} ×{' '}
                  {isCustom ? customHeight : selectedPaper.heightCm} cm
                </span>
              </div>
              <div className="flex justify-between">
                <span>Aspect Ratio:</span>
                <span className="text-foreground">
                  {getCurrentAspectRatio().toFixed(3)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropPage;
