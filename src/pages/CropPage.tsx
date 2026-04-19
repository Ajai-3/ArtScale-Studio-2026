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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-8">
            Upload Reference Image
          </h1>
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="bg-card border p-12 hover:shadow-lg transition-all rounded-lg">
              <Upload size={64} className="mx-auto mb-4 text-primary" />
              <p className="text-foreground text-lg">Click to upload image</p>
              <p className="text-muted-foreground mt-2">
                Supports JPG, PNG, WebP
              </p>
            </div>
          </label>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b">
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
          <div className="relative h-[600px] bg-card border rounded-lg">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={getCurrentAspectRatio()}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              cropShape="rect"
              showGrid={false}
              style={{
                containerStyle: {
                  background: 'hsl(var(--card))',
                },
              }}
            />
          </div>

          {/* Zoom Controls */}
          <div className="mt-4 bg-card border rounded-lg p-4">
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
          <div className="bg-card border rounded-lg p-6">
            <label className="block text-sm font-bold text-muted-foreground mb-2">
              Project Name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full bg-secondary border border-input text-foreground px-4 py-3 rounded focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          {/* Paper Size Selection */}
          <div className="bg-card border rounded-lg p-6">
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
                      ? 'border-primary bg-primary/10'
                      : 'border-input hover:border-primary/50'
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
                    ? 'border-primary bg-primary/10'
                    : 'border-input hover:border-primary/50'
                }`}
              >
                <span className="font-bold text-foreground">Custom</span>
              </button>
            </div>
          </div>

          {/* Custom Dimensions */}
          {isCustom && (
            <div className="bg-card border rounded-lg p-6">
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
                    className="w-full bg-secondary border border-input text-foreground px-4 py-3 rounded focus:ring-2 focus:ring-primary outline-none"
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
                    className="w-full bg-secondary border border-input text-foreground px-4 py-3 rounded focus:ring-2 focus:ring-primary outline-none"
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
          <div className="bg-card border rounded-lg p-6">
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
