import type { CropperGrid as CropperGridElement } from 'cropperjs';
import {
  type DetailedHTMLProps,
  forwardRef,
  type HTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

export interface CropperGridProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  columns?: number;
  rows?: number;
  themeColor?: string;
}

export const CropperGrid = forwardRef<CropperGridElement, CropperGridProps>(
  ({ columns, rows, themeColor, ...rest }, ref) => {
    const elementRef = useRef<CropperGridElement>(null);

    useImperativeHandle(ref, () => elementRef.current!, []);

    // Update props
    useEffect(() => {
      if (!elementRef.current) return;
      const element = elementRef.current;

      if (columns !== undefined) element.columns = columns;
      if (rows !== undefined) element.rows = rows;
      if (themeColor !== undefined) element.themeColor = themeColor;
    }, [columns, rows, themeColor]);

    return (
      // @ts-expect-error
      <cropper-grid ref={elementRef} {...rest} />
    );
  },
);
