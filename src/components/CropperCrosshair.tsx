import type { CropperCrosshair as CropperCrosshairElement } from 'cropperjs';
import {
  type DetailedHTMLProps,
  forwardRef,
  type HTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

export interface CropperCrosshairProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  themeColor?: string;
}

export const CropperCrosshair = forwardRef<
  CropperCrosshairElement,
  CropperCrosshairProps
>(({ themeColor, ...rest }, ref) => {
  const elementRef = useRef<CropperCrosshairElement>(null);

  useImperativeHandle(ref, () => elementRef.current!, []);

  // Update props
  useEffect(() => {
    if (!elementRef.current) return;
    const element = elementRef.current;

    if (themeColor !== undefined) element.themeColor = themeColor;
  }, [themeColor]);

  return (
    // @ts-expect-error
    <cropper-crosshair ref={elementRef} {...rest} />
  );
});
