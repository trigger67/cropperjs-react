import type {
  CropperCanvas,
  CropperCrosshair,
  CropperGrid,
  CropperHandle,
  CropperImage,
  CropperSelection,
  CropperShade,
} from 'cropperjs';
import type React from 'react';

export type { CropperProps, ReactCropperElement } from './components/Cropper';
export * from './components/Cropper';
export { Cropper } from './components/Cropper';
export * from './components/CropperCanvas';
export * from './components/CropperCrosshair';
export * from './components/CropperGrid';
export * from './components/CropperHandle';
export * from './components/CropperImage';
export * from './components/CropperSelection';
export * from './components/CropperShade';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'cropper-canvas': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        ref?: React.RefObject<CropperCanvas | null>;
        background?: boolean;
        disabled?: boolean;
        'scale-step'?: number;
        'theme-color'?: string;
      };
      'cropper-image': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        ref?: React.RefObject<CropperImage | null>;
        rotatable?: boolean;
        scalable?: boolean;
        skewable?: boolean;
        translatable?: boolean;
      };
      'cropper-shade': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        ref?: React.RefObject<CropperShade | null>;
        'theme-color'?: string;
      };
      'cropper-handle': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        ref?: React.RefObject<CropperHandle | null>;
        action?: string;
        plain?: boolean;
        'theme-color'?: string;
      };
      'cropper-selection': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        ref?: React.RefObject<CropperSelection | null>;
        'aspect-ratio'?: number;
        'initial-aspect-ratio'?: number;
        'initial-coverage'?: number;
        movable?: boolean;
        resizable?: boolean;
        zoomable?: boolean;
        multiple?: boolean;
        keyboard?: boolean;
        outlined?: boolean;
        precise?: boolean;
        'theme-color'?: string;
      };
      'cropper-grid': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        ref?: React.RefObject<CropperGrid | null>;
        columns?: number;
        rows?: number;
        'theme-color'?: string;
      };
      'cropper-crosshair': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        ref?: React.RefObject<CropperCrosshair | null>;
        'theme-color'?: string;
      };
    }
  }
}
