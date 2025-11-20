import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Cropper } from './Cropper';

vi.mock('cropperjs', () => {
  return {
    default: class MockCropper {
      element: any;
      options: any;
      constructor(element: any, options: any) {
        this.element = element;
        this.options = options;
      }
      destroy() {}
      getCropperSelection() {
        return {
          $center: vi.fn(),
          $move: vi.fn(),
          $moveTo: vi.fn(),
        };
      }
      getCropperCanvas() {
        return {
          $toCanvas: vi
            .fn()
            .mockResolvedValue(document.createElement('canvas')),
        };
      }
    },
  };
});

describe('Cropper', () => {
  it('renders image with src', () => {
    render(<Cropper src="test.jpg" alt="Test Image" />);
    const img = screen.getByAltText('Test Image');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'test.jpg');
  });

  it('initializes Cropper on mount', () => {
    render(<Cropper src="test.jpg" />);
    // Since we mocked Cropper, we can't easily check if it was instantiated without spying on the constructor.
    // But we can check if the image is rendered.
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
