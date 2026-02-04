// ===============================================
// AI TERRACE PREVIEW COMPONENT
// Mock implementation with 3 states: Upload, Processing, Result
// ===============================================

import { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  Upload, 
  Image as ImageIcon, 
  Sparkles, 
  Leaf,
  ArrowRight,
  RotateCcw,
  ZoomIn
} from 'lucide-react';
import Button from './ui/Button';

type PreviewState = 'upload' | 'processing' | 'result';

export default function TerracePreview() {
  const [state, setState] = useState<PreviewState>('upload');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Placeholder "after" image - simulated AI result
  const afterImage = 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop';

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    setState('processing');

    // Simulate AI processing time
    setTimeout(() => {
      setState('result');
    }, 3000);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleReset = useCallback(() => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
    }
    setUploadedImage(null);
    setState('upload');
    setSliderPosition(50);
  }, [uploadedImage]);

  const handleSliderMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  }, []);

  return (
    <section className="bg-gradient-to-br from-forest/5 to-moss/10 rounded-2xl p-6 md:p-10 mb-12 border border-moss/20">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-moss/10 rounded-full text-moss text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          AI-Powered Preview
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-3">
          Visualize your Jungle
        </h2>
        <p className="text-charcoal/70 max-w-lg mx-auto">
          Upload a photo of your terrace and see the transformation in seconds.
        </p>
      </div>

      {/* State 1: Upload */}
      {state === 'upload' && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            relative border-2 border-dashed rounded-2xl p-8 md:p-12
            transition-all duration-300 cursor-pointer
            ${isDragging 
              ? 'border-moss bg-moss/10 scale-[1.02]' 
              : 'border-sand hover:border-moss/50 bg-white/50 hover:bg-white'
            }
          `}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
          />
          
          <div className="text-center">
            {/* Icon */}
            <div className={`
              w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center
              transition-all duration-300
              ${isDragging ? 'bg-moss text-white scale-110' : 'bg-moss/10 text-moss'}
            `}>
              <Upload className="w-10 h-10" />
            </div>

            {/* Text */}
            <h3 className="font-display text-xl font-semibold text-charcoal mb-2">
              {isDragging ? 'Drop your image here' : 'Drag & drop your terrace photo'}
            </h3>
            <p className="text-charcoal/60 mb-6">
              or click to browse from your device
            </p>

            {/* Button */}
            <Button variant="primary" className="pointer-events-none">
              <ImageIcon className="w-4 h-4 mr-2" />
              Upload Terrace Photo
            </Button>

            {/* Supported formats */}
            <p className="text-xs text-charcoal/40 mt-6">
              Supports JPG, PNG, WEBP • Max 10MB
            </p>
          </div>
        </div>
      )}

      {/* State 2: Processing */}
      {state === 'processing' && (
        <div className="bg-white rounded-2xl p-8 md:p-12 text-center">
          {/* Animated loader */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            {/* Outer ring */}
            <div className="absolute inset-0 border-4 border-sand rounded-full" />
            {/* Spinning ring */}
            <div className="absolute inset-0 border-4 border-transparent border-t-moss rounded-full animate-spin" />
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Leaf className="w-10 h-10 text-moss animate-pulse" />
            </div>
          </div>

          {/* Text */}
          <h3 className="font-display text-2xl font-semibold text-charcoal mb-3">
            AI is analyzing your space
          </h3>
          <p className="text-charcoal/60 mb-4">
            and planting seeds...
          </p>

          {/* Progress dots */}
          <div className="flex justify-center gap-2">
            <span className="w-2 h-2 bg-moss rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 bg-moss rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 bg-moss rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>

          {/* Preview thumbnail */}
          {uploadedImage && (
            <div className="mt-8 pt-8 border-t border-sand">
              <p className="text-xs text-charcoal/40 mb-3">Your photo</p>
              <img 
                src={uploadedImage} 
                alt="Uploaded terrace" 
                className="w-32 h-24 object-cover rounded-lg mx-auto opacity-50"
              />
            </div>
          )}
        </div>
      )}

      {/* State 3: Result */}
      {state === 'result' && uploadedImage && (
        <div className="space-y-6">
          {/* Before/After Slider */}
          <div 
            ref={sliderRef}
            className="relative aspect-[4/3] md:aspect-video rounded-2xl overflow-hidden cursor-ew-resize select-none bg-charcoal"
            onMouseMove={(e) => e.buttons === 1 && handleSliderMove(e)}
            onMouseDown={handleSliderMove}
            onTouchMove={handleSliderMove}
          >
            {/* After Image (Full width, underneath) */}
            <img
              src={afterImage}
              alt="AI Generated Preview"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Before Image (Clipped by slider) */}
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={uploadedImage}
                alt="Original terrace"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ 
                  width: sliderRef.current ? `${sliderRef.current.offsetWidth}px` : '100%',
                  maxWidth: 'none'
                }}
              />
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              {/* Handle circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                <div className="flex gap-0.5">
                  <div className="w-0.5 h-4 bg-charcoal/30 rounded" />
                  <div className="w-0.5 h-4 bg-charcoal/30 rounded" />
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-charcoal/80 text-white text-sm font-medium rounded-full">
              Before
            </div>
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-moss text-white text-sm font-medium rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              After
            </div>

            {/* Zoom hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-white/90 text-charcoal/70 text-xs font-medium rounded-full flex items-center gap-1">
              <ZoomIn className="w-3 h-3" />
              Drag to compare
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              onClick={handleReset}
              className="order-2 sm:order-1"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Another Photo
            </Button>
            
            <Link to="/kit-finder" className="order-1 sm:order-2">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Get this Kit
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Disclaimer */}
          <p className="text-center text-xs text-charcoal/50">
            * This is a preview visualization. Actual results may vary based on your space and chosen plants.
          </p>
        </div>
      )}
    </section>
  );
}
