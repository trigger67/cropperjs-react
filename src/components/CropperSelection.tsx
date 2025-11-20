import type { CropperSelection as CropperSelectionElement } from 'cropperjs';
import {
  type DetailedHTMLProps,
  forwardRef,
  type HTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

export interface CropperSelectionProps
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
    'onChange'
  > {
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
  themeColor?: string;
  onAction?: (event: CustomEvent) => void;
  onActionStart?: (event: CustomEvent) => void;
  onActionMove?: (event: CustomEvent) => void;
  onActionEnd?: (event: CustomEvent) => void;
  onChange?: (event: CustomEvent) => void;
}

export const CropperSelection = forwardRef<
  CropperSelectionElement,
  CropperSelectionProps
>(
  (
    {
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
      themeColor,
      onAction,
      onActionStart,
      onActionMove,
      onActionEnd,
      onChange,
      children,
      ...rest
    },
    ref,
  ) => {
    const elementRef = useRef<CropperSelectionElement>(null);

    useImperativeHandle(ref, () => elementRef.current!, []);

    // Update props
    useEffect(() => {
      if (!elementRef.current) return;
      const element = elementRef.current;

      if (aspectRatio !== undefined) element.aspectRatio = aspectRatio;
      if (initialAspectRatio !== undefined)
        element.initialAspectRatio = initialAspectRatio;
      if (initialCoverage !== undefined)
        element.initialCoverage = initialCoverage;
      if (movable !== undefined) element.movable = movable;
      if (resizable !== undefined) element.resizable = resizable;
      if (zoomable !== undefined) element.zoomable = zoomable;
      if (multiple !== undefined) element.multiple = multiple;
      if (keyboard !== undefined) element.keyboard = keyboard;
      if (outlined !== undefined) element.outlined = outlined;
      if (precise !== undefined) element.precise = precise;
      if (themeColor !== undefined) element.themeColor = themeColor;
    }, [
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
      themeColor,
    ]);

    // Event listeners
    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      const eventMap: Record<string, ((event: any) => void) | undefined> = {
        action: onAction,
        actionstart: onActionStart,
        actionmove: onActionMove,
        actionend: onActionEnd,
        change: onChange,
      };

      Object.entries(eventMap).forEach(([event, handler]) => {
        if (handler) {
          element.addEventListener(event, handler);
        }
      });

      return () => {
        Object.entries(eventMap).forEach(([event, handler]) => {
          if (handler) {
            element.removeEventListener(event, handler);
          }
        });
      };
    }, [onAction, onActionStart, onActionMove, onActionEnd, onChange]);

    return (
      // @ts-expect-error
      <cropper-selection ref={elementRef} {...rest}>
        {children}
        {/* @ts-ignore */}
      </cropper-selection>
    );
  },
);
