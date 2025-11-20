import type {
  CropperCanvas as CropperCanvasElement,
  CropperSelection as CropperSelectionElement,
} from 'cropperjs';
import {
  CropperCanvas,
  CropperCrosshair,
  CropperGrid,
  CropperHandle,
  CropperImage,
  CropperSelection,
  CropperShade,
} from 'cropperjs-react';
import { useRef, useState } from 'react';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';

const App = () => {
  const cropperRef = useRef<CropperCanvasElement>(null);
  const selectionRef = useRef<CropperSelectionElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Image state
  const [imgSrc, setImgSrc] = useState(image1);
  const [croppedImage, setCroppedImage] = useState<string | undefined>();
  const [livePreview, setLivePreview] = useState<string | undefined>();

  // Canvas controls
  const [canvasBackground, setCanvasBackground] = useState(true);
  const [canvasDisabled, setCanvasDisabled] = useState(false);

  // Image transformation controls
  const [rotation, setRotation] = useState(0);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);

  // Selection controls
  const [showShade, setShowShade] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [showCrosshair, setShowCrosshair] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);
  const [themeColor, setThemeColor] = useState('#3399ff');
  const [movable, setMovable] = useState(true);
  const [resizable, setResizable] = useState(true);
  const [zoomable, setZoomable] = useState(true);

  // Grid controls
  const [gridRows, setGridRows] = useState(3);
  const [gridColumns, setGridColumns] = useState(3);

  // Export controls
  const [exportFormat, setExportFormat] = useState<'png' | 'jpeg' | 'webp'>('png');
  const [exportQuality, setExportQuality] = useState(0.92);

  // UI state
  const [activeTab, setActiveTab] = useState<'basic' | 'transform' | 'advanced'>('basic');

  const updateLivePreview = async () => {
    const selection = selectionRef.current;
    if (selection) {
      const canvas = await selection.$toCanvas();
      setLivePreview(canvas.toDataURL());
    }
  };

  const onCrop = () => {
    updateLivePreview();
    const selection = selectionRef.current;
    if (selection) {
      console.log('Selection:', {
        x: selection.x,
        y: selection.y,
        width: selection.width,
        height: selection.height,
      });
    }
  };

  const handleGetResult = async () => {
    const selection = selectionRef.current;
    if (selection) {
      const canvas = await selection.$toCanvas();
      const mimeType = `image/${exportFormat}`;
      const dataUrl = canvas.toDataURL(mimeType, exportQuality);
      setCroppedImage(dataUrl);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          setImgSrc(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRotate = (degrees: number) => {
    setRotation((prev) => (prev + degrees) % 360);
  };

  const handleFlipHorizontal = () => {
    setScaleX((prev) => prev * -1);
  };

  const handleFlipVertical = () => {
    setScaleY((prev) => prev * -1);
  };

  const handleReset = () => {
    setRotation(0);
    setScaleX(1);
    setScaleY(1);
  };

  const handleZoom = (delta: number) => {
    const canvas = cropperRef.current;
    if (canvas) {
      // Zoom functionality would use canvas methods
      console.log('Zoom:', delta);
    }
  };

  const applyPreset = (preset: 'profile' | 'banner' | 'thumbnail') => {
    switch (preset) {
      case 'profile':
        setAspectRatio(1);
        break;
      case 'banner':
        setAspectRatio(16 / 9);
        break;
      case 'thumbnail':
        setAspectRatio(4 / 3);
        break;
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>CropperJS-React Demo</h1>

        <div className="cropper-container">
          <CropperCanvas
            style={{ height: '500px' }}
            ref={cropperRef}
            background={canvasBackground}
            disabled={canvasDisabled}
            themeColor={themeColor}
          >
            <CropperImage
              src={imgSrc}
              alt="Picture"
              rotatable={true}
              scalable={true}
              skewable={true}
              translatable={true}
            />
            {showShade && <CropperShade themeColor={themeColor} />}
            <CropperHandle action="select" plain />
            <CropperSelection
              ref={selectionRef}
              initialAspectRatio={16 / 9}
              aspectRatio={aspectRatio}
              initialCoverage={0.5}
              movable={movable}
              resizable={resizable}
              zoomable={zoomable}
              keyboard={true}
              outlined={true}
              onChange={onCrop}
              themeColor={themeColor}
            >
              {showGrid && <CropperGrid rows={gridRows} columns={gridColumns} themeColor={themeColor} />}
              {showCrosshair && <CropperCrosshair themeColor={themeColor} />}
              <CropperHandle action="move" themeColor="rgba(255, 255, 255, 0.35)" />
              <CropperHandle action="n-resize" themeColor={themeColor} />
              <CropperHandle action="e-resize" themeColor={themeColor} />
              <CropperHandle action="s-resize" themeColor={themeColor} />
              <CropperHandle action="w-resize" themeColor={themeColor} />
              <CropperHandle action="ne-resize" themeColor={themeColor} />
              <CropperHandle action="nw-resize" themeColor={themeColor} />
              <CropperHandle action="se-resize" themeColor={themeColor} />
              <CropperHandle action="sw-resize" themeColor={themeColor} />
            </CropperSelection>
          </CropperCanvas>
        </div>

        {livePreview && (
          <div className="live-preview-section">
            <h3>Live Preview</h3>
            <img src={livePreview} alt="Live Preview" className="live-preview-image" />
          </div>
        )}

        <div className="tabs">
          <button
            className={activeTab === 'basic' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('basic')}
          >
            Basic Controls
          </button>
          <button
            className={activeTab === 'transform' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('transform')}
          >
            Transformations
          </button>
          <button
            className={activeTab === 'advanced' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('advanced')}
          >
            Advanced
          </button>
        </div>

        <div className="controls">
          {activeTab === 'basic' && (
            <>
              <div className="control-section">
                <h3>Image Source</h3>
                <div className="control-group">
                  <button type="button" onClick={() => setImgSrc(image1)}>
                    Image 1
                  </button>
                  <button type="button" onClick={() => setImgSrc(image2)}>
                    Image 2
                  </button>
                  <button type="button" onClick={() => fileInputRef.current?.click()}>
                    Upload Image
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                  />
                </div>
              </div>

              <div className="control-section">
                <h3>Selection Options</h3>
                <div className="control-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={showShade}
                      onChange={(e) => setShowShade(e.target.checked)}
                    />
                    Show Shade
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={showGrid}
                      onChange={(e) => setShowGrid(e.target.checked)}
                    />
                    Show Grid
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={showCrosshair}
                      onChange={(e) => setShowCrosshair(e.target.checked)}
                    />
                    Show Crosshair
                  </label>
                </div>
                <div className="control-group">
                  <label>
                    Aspect Ratio:
                    <select
                      value={aspectRatio}
                      onChange={(e) => setAspectRatio(Number(e.target.value))}
                    >
                      <option value={16 / 9}>16:9 (Landscape)</option>
                      <option value={4 / 3}>4:3</option>
                      <option value={1}>1:1 (Square)</option>
                      <option value={3 / 4}>3:4 (Portrait)</option>
                      <option value={9 / 16}>9:16 (Story)</option>
                      <option value={NaN}>Free</option>
                    </select>
                  </label>
                  <label>
                    Theme Color:
                    <input
                      type="color"
                      value={themeColor}
                      onChange={(e) => setThemeColor(e.target.value)}
                    />
                  </label>
                </div>
              </div>

              <div className="control-section">
                <h3>Presets</h3>
                <div className="control-group">
                  <button type="button" onClick={() => applyPreset('profile')}>
                    Profile Picture (1:1)
                  </button>
                  <button type="button" onClick={() => applyPreset('banner')}>
                    Banner (16:9)
                  </button>
                  <button type="button" onClick={() => applyPreset('thumbnail')}>
                    Thumbnail (4:3)
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'transform' && (
            <>
              <div className="control-section">
                <h3>Rotation</h3>
                <div className="control-group">
                  <button type="button" onClick={() => handleRotate(90)}>
                    Rotate 90° CW
                  </button>
                  <button type="button" onClick={() => handleRotate(-90)}>
                    Rotate 90° CCW
                  </button>
                  <button type="button" onClick={() => handleRotate(180)}>
                    Rotate 180°
                  </button>
                  <span>Current: {rotation}°</span>
                </div>
              </div>

              <div className="control-section">
                <h3>Flip</h3>
                <div className="control-group">
                  <button type="button" onClick={handleFlipHorizontal}>
                    Flip Horizontal
                  </button>
                  <button type="button" onClick={handleFlipVertical}>
                    Flip Vertical
                  </button>
                  <button type="button" onClick={handleReset}>
                    Reset All
                  </button>
                </div>
              </div>

              <div className="control-section">
                <h3>Zoom</h3>
                <div className="control-group">
                  <button type="button" onClick={() => handleZoom(0.1)}>
                    Zoom In (+)
                  </button>
                  <button type="button" onClick={() => handleZoom(-0.1)}>
                    Zoom Out (-)
                  </button>
                  <button type="button" onClick={() => handleZoom(0)}>
                    Reset Zoom
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === 'advanced' && (
            <>
              <div className="control-section">
                <h3>Canvas Options</h3>
                <div className="control-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={canvasBackground}
                      onChange={(e) => setCanvasBackground(e.target.checked)}
                    />
                    Show Background
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={canvasDisabled}
                      onChange={(e) => setCanvasDisabled(e.target.checked)}
                    />
                    Disable Canvas
                  </label>
                </div>
              </div>

              <div className="control-section">
                <h3>Selection Behavior</h3>
                <div className="control-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={movable}
                      onChange={(e) => setMovable(e.target.checked)}
                    />
                    Movable
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={resizable}
                      onChange={(e) => setResizable(e.target.checked)}
                    />
                    Resizable
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={zoomable}
                      onChange={(e) => setZoomable(e.target.checked)}
                    />
                    Zoomable
                  </label>
                </div>
              </div>

              <div className="control-section">
                <h3>Grid Customization</h3>
                <div className="control-group">
                  <label>
                    Rows:
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={gridRows}
                      onChange={(e) => setGridRows(Number(e.target.value))}
                    />
                  </label>
                  <label>
                    Columns:
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={gridColumns}
                      onChange={(e) => setGridColumns(Number(e.target.value))}
                    />
                  </label>
                </div>
              </div>

              <div className="control-section">
                <h3>Export Options</h3>
                <div className="control-group">
                  <label>
                    Format:
                    <select
                      value={exportFormat}
                      onChange={(e) => setExportFormat(e.target.value as 'png' | 'jpeg' | 'webp')}
                    >
                      <option value="png">PNG</option>
                      <option value="jpeg">JPEG</option>
                      <option value="webp">WebP</option>
                    </select>
                  </label>
                  {exportFormat !== 'png' && (
                    <label>
                      Quality: {Math.round(exportQuality * 100)}%
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={exportQuality}
                        onChange={(e) => setExportQuality(Number(e.target.value))}
                      />
                    </label>
                  )}
                </div>
              </div>
            </>
          )}

          <div className="control-section">
            <h3>Actions</h3>
            <div className="control-group">
              <button type="button" onClick={onCrop}>
                Log Data (Console)
              </button>
              <button type="button" onClick={handleGetResult} className="primary">
                Crop Image
              </button>
            </div>
          </div>
        </div>

        {croppedImage && (
          <div className="result-section">
            <h2>Cropped Result</h2>
            <img src={croppedImage} alt="Cropped" className="preview-image" />
            <div className="control-group">
              <a href={croppedImage} download={`cropped.${exportFormat}`}>
                <button type="button">Download</button>
              </a>
            </div>
          </div>
        )}

        <div className="info-section">
          <h3>Keyboard Shortcuts</h3>
          <ul>
            <li><kbd>Arrow Keys</kbd> - Move selection</li>
            <li><kbd>Shift + Arrow Keys</kbd> - Resize selection</li>
            <li><kbd>Enter</kbd> - Confirm selection</li>
            <li><kbd>Escape</kbd> - Cancel selection</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
