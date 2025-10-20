import React, { useState, useRef } from 'react';

interface ImageZoomProps {
  src: string;
  alt: string;
}

const ZOOM_FACTOR = 2.5;
const LENS_SIZE = 150;
const ZOOM_PANE_DIM = 500; 

const ImageZoom: React.FC<ImageZoomProps> = ({ src, alt }) => {
  const [showZoom, setShowZoom] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const imgRef = useRef<HTMLImageElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!imgRef.current) return;
    
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    
    // Position of cursor relative to the image
    const x = e.clientX - left;
    const y = e.clientY - top;

    // If cursor is outside image, hide zoom
    if (x < 0 || x > width || y < 0 || y > height) {
        setShowZoom(false);
        return;
    }
    
    setShowZoom(true);
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setShowZoom(false);
  };

  // Calculate lens position, clamping it to the image boundaries
  const lensX = Math.min(
    Math.max(position.x - LENS_SIZE / 2, 0),
    (imgRef.current?.width ?? LENS_SIZE) - LENS_SIZE
  );
  const lensY = Math.min(
    Math.max(position.y - LENS_SIZE / 2, 0),
    (imgRef.current?.height ?? LENS_SIZE) - LENS_SIZE
  );

  const lensStyle: React.CSSProperties = {
    position: 'absolute',
    border: '2px solid #a0aec0', // gray-400
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: `${LENS_SIZE}px`,
    height: `${LENS_SIZE}px`,
    top: `${lensY}px`,
    left: `${lensX}px`,
    pointerEvents: 'none',
    display: showZoom ? 'block' : 'none',
  };

  const zoomPaneStyle: React.CSSProperties = {
    position: 'absolute',
    top: '0',
    left: '105%', // A little gap
    width: `${ZOOM_PANE_DIM}px`,
    height: `${ZOOM_PANE_DIM}px`,
    backgroundColor: 'white',
    border: '1px solid #e2e8f0', // gray-300
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
    zIndex: 20, // Higher z-index to appear over everything
    pointerEvents: 'none',
    display: showZoom ? 'block' : 'none',
    backgroundImage: `url(${src})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${(imgRef.current?.width ?? 0) * ZOOM_FACTOR}px ${(imgRef.current?.height ?? 0) * ZOOM_FACTOR}px`,
    backgroundPosition: `-${lensX * ZOOM_FACTOR}px -${lensY * ZOOM_FACTOR}px`,
  };

  return (
    <div 
      className="relative cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        ref={imgRef}
        className="w-full h-auto object-cover rounded-lg shadow-md aspect-[1/1]"
        src={src}
        alt={alt}
      />
      
      <div style={lensStyle} />
      {/* Hide on medium and smaller screens where hover is not the primary interaction */}
      <div className="hidden lg:block" style={zoomPaneStyle} />
    </div>
  );
};

export default ImageZoom;
