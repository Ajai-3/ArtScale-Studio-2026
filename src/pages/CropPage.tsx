import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Cropper from 'react-easy-crop';
import { Upload, Save, ArrowLeft, ZoomIn, ZoomOut } from 'lucide-react';
import { db, type Project } from '../lib/db';

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
      croppedAreaPixels.height
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

    await db.projects.add(project as Project);
    navigate('/workspace');
  };

  if (!image) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-8">Upload Reference Image</h1>
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="bg-dark-800 border-3 border-white shadow-neubrutal-lg p-12 hover:shadow-neubrutal-xl hover:-translate-y-1 transition-all">
              <Upload size={64} className="mx-auto mb-4 text-grass-400" />
              <p className="text-white text-lg">Click to upload image</p>
              <p className="text-gray-400 mt-2">Supports JPG, PNG, WebP</p>
            </div>
          </label>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <header className="bg-dark-900 border-b-3 border-white shadow-neubrutal">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => setImage(null)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} /> Back
          </button>
          <h1 className="text-2xl font-bold text-grass-400">Crop Image</h1>
          <button
            onClick={handleSave}
            className="bg-grass-500 text-dark-950 px-6 py-3 font-bold border-3 border-white shadow-neubrutal hover:shadow-neubrutal-md hover:translate-x-1 hover:translate-y-1 transition-all flex items-center gap-2"
          >
            <Save size={20} /> Save & Continue
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 grid lg:grid-cols-3 gap-6">
        {/* Crop Area */}
        <div className="lg:col-span-2">
          <div className="relative h-[600px] bg-dark-800 border-3 border-white shadow-neubrutal-lg">
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
                  background: '#1e293b',
                },
              }}
            />
          </div>

          {/* Zoom Controls */}
          <div className="mt-4 bg-dark-800 border-3 border-white shadow-neubrutal p-4">
            <div className="flex items-center gap-4">
              <ZoomOut size={20} className="text-gray-400" />
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="flex-1"
              />
              <ZoomIn size={20} className="text-gray-400" />
              <span className="text-white font-mono w-16 text-right">{Math.round(zoom * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        <div className="space-y-6">
          {/* Project Name */}
          <div className="bg-dark-800 border-3 border-white shadow-neubrutal p-6">
            <label className="block text-sm font-bold text-gray-300 mb-2">Project Name</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full bg-dark-900 border-2 border-white/20 text-white px-4 py-3 focus:border-grass-400 outline-none"
            />
          </div>

          {/* Paper Size Selection */}
          <div className="bg-dark-800 border-3 border-white shadow-neubrutal p-6">
            <h3 className="text-lg font-bold text-white mb-4">Paper Size</h3>
            <div className="space-y-2">
              {PAPER_SIZES.map((paper) => (
                <button
                  key={paper.name}
                  onClick={() => {
                    setSelectedPaper(paper);
                    setIsCustom(false);
                  }}
                  className={`w-full p-4 border-3 transition-all ${
                    !isCustom && selectedPaper.name === paper.name
                      ? 'border-grass-400 bg-grass-500/10'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">{paper.name}</span>
                    <span className="text-sm text-gray-400">
                      {paper.widthCm} × {paper.heightCm} cm
                    </span>
                  </div>
                </button>
              ))}
              <button
                onClick={() => setIsCustom(true)}
                className={`w-full p-4 border-3 transition-all ${
                  isCustom
                    ? 'border-grass-400 bg-grass-500/10'
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                <span className="font-bold text-white">Custom</span>
              </button>
            </div>
          </div>

          {/* Custom Dimensions */}
          {isCustom && (
            <div className="bg-dark-800 border-3 border-white shadow-neubrutal p-6">
              <h3 className="text-lg font-bold text-white mb-4">Custom Dimensions</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Width (cm)</label>
                  <input
                    type="number"
                    value={customWidth}
                    onChange={(e) => setCustomWidth(Number(e.target.value))}
                    className="w-full bg-dark-900 border-2 border-white/20 text-white px-4 py-3 focus:border-grass-400 outline-none"
                    step={0.1}
                    min={1}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Height (cm)</label>
                  <input
                    type="number"
                    value={customHeight}
                    onChange={(e) => setCustomHeight(Number(e.target.value))}
                    className="w-full bg-dark-900 border-2 border-white/20 text-white px-4 py-3 focus:border-grass-400 outline-none"
                    step={0.1}
                    min={1}
                  />
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-400">
                Aspect Ratio: {(customWidth / customHeight).toFixed(3)}
              </div>
            </div>
          )}

          {/* Current Settings Info */}
          <div className="bg-dark-800 border-3 border-white shadow-neubrutal p-6">
            <h3 className="text-lg font-bold text-white mb-2">Current Settings</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex justify-between">
                <span>Format:</span>
                <span className="text-white">{isCustom ? 'Custom' : selectedPaper.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Dimensions:</span>
                <span className="text-white">
                  {isCustom ? customWidth : selectedPaper.widthCm} × {isCustom ? customHeight : selectedPaper.heightCm} cm
                </span>
              </div>
              <div className="flex justify-between">
                <span>Aspect Ratio:</span>
                <span className="text-white">{getCurrentAspectRatio().toFixed(3)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropPage;
