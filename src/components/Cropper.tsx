import Cropper from 'cropperjs';
import type React from 'react';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { cleanImageProps } from '../utils';

const REQUIRED_IMAGE_STYLES = { opacity: 0, maxWidth: '100%' };

export interface CropperProps {
  src?: string;
  alt?: string;
  crossOrigin?: '' | 'anonymous' | 'use-credentials';
  className?: string;
  style?: React.CSSProperties;

  // Canvas options
  background?: boolean;
  disabled?: boolean;
  scaleStep?: number;
  themeColor?: string;

  // Selection options
  aspectRatio?: number;
  initialAspectRatio?: number;
  initialCoverage?: number;
  movable?: boolean;
  resizable?: boolean;
  zoomable?: boolean;
  multiple?: boolean;
  keyboard?: boolean;
  outlined?: boolean;
  precise?: boolean;

  // Events
  onAction?: (event: CustomEvent) => void;
  onActionStart?: (event: CustomEvent) => void;
  onActionMove?: (event: CustomEvent) => void;
  onActionEnd?: (event: CustomEvent) => void;
  onChange?: (event: CustomEvent) => void;
  onLoad?: (event: CustomEvent) => void;
  onError?: (event: CustomEvent) => void;
  onResize?: (event: CustomEvent) => void;
  onTransform?: (event: CustomEvent) => void;
  // onWheel and onKeyDown are standard React props, but we might want to intercept them or let them bubble.
  // Cropper.js v2 dispatches custom events for these too?
}

export type ReactCropperElement = HTMLImageElement & {
  cropper?: Cropper;
};

const ReactCropper = forwardRef<ReactCropperElement, CropperProps>(
  (
    {
      src,
      alt,
      crossOrigin,
      className,
      style,
      background,
      disabled,
      scaleStep,
      themeColor,
      aspectRatio,
      initialAspectRatio,
      initialCoverage,
      movable,
      resizable,
      zoomable,
      multiple,
      keyboard,
      outlined,
      precise,
      onAction,
      onActionStart,
      onActionMove,
      onActionEnd,
      onChange,
      onLoad,
      onError,
      onResize,
      onTransform,
      ...rest
    },
    ref,
  ) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const cropperRef = useRef<Cropper | null>(null);

    useImperativeHandle(ref, () => {
      const image = imageRef.current;
      if (image) {
        (image as ReactCropperElement).cropper =
          cropperRef.current || undefined;
      }
      return image as ReactCropperElement;
    }, []);

    // Capture initial props
    const initialProps = useRef({
      aspectRatio,
      initialAspectRatio,
      initialCoverage,
      movable,
      resizable,
      zoomable,
      multiple,
      keyboard,
      outlined,
      precise,
      background,
      disabled,
      scaleStep,
      themeColor,
    });

    useEffect(() => {
      const image = imageRef.current;
      if (image && src) {
        // Destroy previous instance if it exists
        if (cropperRef.current) {
          cropperRef.current.destroy();
        }

        // Initialize new instance
        cropperRef.current = new Cropper(image);
        (image as ReactCropperElement).cropper = cropperRef.current;

        // Apply initial props
        const selection = cropperRef.current.getCropperSelection();
        const canvas = cropperRef.current.getCropperCanvas();
        const props = initialProps.current;

        if (selection) {
          if (props.aspectRatio !== undefined)
            selection.aspectRatio = props.aspectRatio;
          if (props.initialAspectRatio !== undefined)
            selection.initialAspectRatio = props.initialAspectRatio;
          if (props.initialCoverage !== undefined)
            selection.initialCoverage = props.initialCoverage;
          if (props.movable !== undefined) selection.movable = props.movable;
          if (props.resizable !== undefined)
            selection.resizable = props.resizable;
          if (props.zoomable !== undefined) selection.zoomable = props.zoomable;
          if (props.multiple !== undefined) selection.multiple = props.multiple;
          if (props.keyboard !== undefined) selection.keyboard = props.keyboard;
          if (props.outlined !== undefined) selection.outlined = props.outlined;
          if (props.precise !== undefined) selection.precise = props.precise;
        }

        if (canvas) {
          if (props.background !== undefined)
            canvas.background = props.background;
          if (props.disabled !== undefined) canvas.disabled = props.disabled;
          if (props.scaleStep !== undefined) canvas.scaleStep = props.scaleStep;
          if (props.themeColor !== undefined)
            canvas.themeColor = props.themeColor;
        }
      }

      return () => {
        if (cropperRef.current) {
          cropperRef.current.destroy();
          cropperRef.current = null;
          if (image) {
            (image as ReactCropperElement).cropper = undefined;
          }
        }
      };
    }, [src]);

    // Update props dynamically
    useEffect(() => {
      if (!cropperRef.current) return;
      const selection = cropperRef.current.getCropperSelection();
      if (selection) {
        if (aspectRatio !== undefined) selection.aspectRatio = aspectRatio;
        if (movable !== undefined) selection.movable = movable;
        if (resizable !== undefined) selection.resizable = resizable;
        if (zoomable !== undefined) selection.zoomable = zoomable;
        if (multiple !== undefined) selection.multiple = multiple;
        if (keyboard !== undefined) selection.keyboard = keyboard;
        if (outlined !== undefined) selection.outlined = outlined;
        if (precise !== undefined) selection.precise = precise;
      }
    }, [
      aspectRatio,
      movable,
      resizable,
      zoomable,
      multiple,
      keyboard,
      outlined,
      precise,
    ]);

    useEffect(() => {
      if (!cropperRef.current) return;
      const canvas = cropperRef.current.getCropperCanvas();
      if (canvas) {
        if (background !== undefined) canvas.background = background;
        if (disabled !== undefined) canvas.disabled = disabled;
        if (scaleStep !== undefined) canvas.scaleStep = scaleStep;
        if (themeColor !== undefined) canvas.themeColor = themeColor;
      }
    }, [background, disabled, scaleStep, themeColor]);

    // Event listeners
    useEffect(() => {
      const image = imageRef.current;
      if (!image) return;

      const eventMap: Record<string, ((event: any) => void) | undefined> = {
        action: onAction,
        actionstart: onActionStart,
        actionmove: onActionMove,
        actionend: onActionEnd,
        change: onChange,
        load: onLoad,
        error: onError,
        resize: onResize,
        transform: onTransform,
      };

      Object.entries(eventMap).forEach(([event, handler]) => {
        if (handler) {
          image.addEventListener(event, handler);
        }
      });

      return () => {
        Object.entries(eventMap).forEach(([event, handler]) => {
          if (handler) {
            image.removeEventListener(event, handler);
          }
        });
      };
    }, [
      onAction,
      onActionStart,
      onActionMove,
      onActionEnd,
      onChange,
      onLoad,
      onError,
      onResize,
      onTransform,
    ]);

    const imageProps = cleanImageProps({ ...rest, crossOrigin, src, alt });

    return (
      <div className={className} style={style}>
        <img
          style={REQUIRED_IMAGE_STYLES}
          alt="Cropper"
          {...imageProps}
          ref={imageRef}
        />
      </div>
    );
  },
);

ReactCropper.displayName = 'Cropper';

export { ReactCropper as Cropper };
