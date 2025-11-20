# Cropper.js React

A modern, lightweight React wrapper for [Cropper.js v2](https://github.com/fengyuanchen/cropperjs).

## Features

- ⚛️ **React 18+ Support**: Built for modern React applications.
- 📦 **Cropper.js v2**: Leverages the latest features of Cropper.js 2.0 (Web Components based).
- 🟦 **TypeScript**: Fully typed for excellent developer experience.
- 🚀 **ESM Only**: Modern module format.
- 🎨 **Customizable**: Full access to Cropper.js options and methods.

## Installation

```bash
npm install cropperjs-react cropperjs
# or
yarn add cropperjs-react cropperjs
# or
pnpm add cropperjs-react cropperjs
# or
bun add cropperjs-react cropperjs
```

## Usage

### Basic Example

```tsx
import React, { useRef } from 'react';
import { Cropper, type ReactCropperElement } from 'cropperjs-react';

const App = () => {
  const cropperRef = useRef<ReactCropperElement>(null);

  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    console.log(cropper?.getCropperSelection()?.$toCanvas());
  };

  return (
    <Cropper
      ref={cropperRef}
      src="https://fengyuanchen.github.io/cropperjs/images/picture.jpg"
      style={{ height: 400, width: '100%' }}
      aspectRatio={16 / 9}
    />
  );
};

export default App;
```

### Props

The `Cropper` component accepts the following props:

| Prop | Type | Description |
| --- | --- | --- |
| `src` | `string` | The URL of the image to crop. |
| `alt` | `string` | The alt text for the image. |
| `crossOrigin` | `'anonymous' \| 'use-credentials'` | The crossOrigin attribute for the image. |
| `aspectRatio` | `number` | The aspect ratio of the crop box. |
| `initialAspectRatio` | `number` | The initial aspect ratio of the crop box. |
| `movable` | `boolean` | Enable to move the crop box. |
| `resizable` | `boolean` | Enable to resize the crop box. |
| `zoomable` | `boolean` | Enable to zoom the image. |
| `background` | `boolean` | Show the grid background. |
| ...and more | | See `CropperProps` for full list. |

### Accessing the Cropper Instance

You can access the underlying `Cropper` instance via the `ref`:

```tsx
const cropperRef = useRef<ReactCropperElement>(null);

// Access methods
cropperRef.current?.cropper?.getCropperSelection();
cropperRef.current?.cropper?.getCropperCanvas();
```

## Development

### Commands

- `bun run dev`: Start the development server.
- `bun run build`: Build the library.
- `bun run test`: Run tests using Vitest.
- `bun run lint`: Run linting using Biome.

> **Note**: Use `bun run test` to run tests. The native `bun test` command is not supported for this project.

## License

MIT