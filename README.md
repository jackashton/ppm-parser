# `ppm-parser`

A lightweight library for parsing PPM (Portable Pixmap) image files in P3 and P6 formats. This package allows users to extract pixel data from PPM images and provides a simple and extensible API for developers to build upon.

---

## Installation

To install the package, use your favorite package manager:

```bash
# Using npm
npm install ppm-parser

# Using Yarn
yarn add ppm-parser

# Using pnpm
pnpm add ppm-parser
```

---

## Usage

This library provides an easy-to-use API for parsing PPM images. It supports both P3 (plain text) and P6 (binary) formats.

### Example: Parsing a PPM Image

```typescript
import parsePPM from 'ppm-parser';

// Load your PPM data into a Uint8Array (e.g., from a file)
const ppmData = new Uint8Array([
    // Example data for demonstration purposes
]);

// Parse the PPM data
const { width, height, values } = parsePPM(ppmData);

console.log('Image Width:', width);
console.log('Image Height:', height);
console.log('Pixel Values:', values);
```

### Supported Formats
- **P3**: Plain-text PPM files with pixel data represented as ASCII numbers.
- **P6**: Binary PPM files with raw pixel data.

---

## API Reference

### `parsePPM(data: Uint8Array): PPMImage`
- **Description**: Automatically detects and parses PPM data in either P3 or P6 format.
- **Parameters**:
    - `data`: A `Uint8Array` containing the PPM file's binary data.
- **Returns**: A `PPMImage` instance containing:
    - `width`: The width of the image.
    - `height`: The height of the image.
    - `pixelData`: A `Uint8Array` with interleaved RGB values.
    - `maxColorValue`: The maximum color value of the PPM file.
    - `format`: The PPM file format ("P3" or "P6").

### `parsePPMP3(data: Uint8Array): PPMImage`
- **Description**: Parses PPM files in P3 format (plain text).
- **Parameters**:
    - `data`: A `Uint8Array` containing the PPM file's binary data.
- **Returns**: Same as `parsePPM`.

### `parsePPMP6(data: Uint8Array): PPMImage`
- **Description**: Parses PPM files in P6 format (binary).
- **Parameters**:
    - `data`: A `Uint8Array` containing the PPM file's binary data.
- **Returns**: Same as `parsePPM`.

---

## Extended Features

### `PPMImage` Class
The library now provides a `PPMImage` class to encapsulate parsed image data. This class includes the following:

#### Properties:
- `width`: The width of the image in pixels.
- `height`: The height of the image in pixels.
- `pixelData`: The raw pixel data as a `Uint8Array`. Each pixel consists of three consecutive values (R, G, B).
- `maxColorValue`: The maximum color value of the PPM file (e.g., 255 for 8-bit color).
- `format`: The PPM file format ("P3" or "P6").

#### Methods:
- `aspectRatio(): number`
    - Returns the aspect ratio of the image (width / height).
- `pixelCount: number`
    - The total number of pixels in the image (width * height).
- `getPixel(x: number, y: number): { r: number; g: number; b: number }`
    - Retrieves the RGB color values of the pixel at the specified coordinates.

---

## Development Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/jackashton/ppm-parser.git
   cd ppm-parser
   ```

2. **Install Development Dependencies**:
   ```bash
   pnpm install
   ```

3. **Run Linting**:
   Ensure code consistency using ESLint and Prettier:
   ```bash
   pnpm lint
   ```

4. **Run Tests**:
   Run unit tests using Vitest:
   ```bash
   pnpm test
   ```

5. **Build the Project**:
   Compile the TypeScript code:
   ```bash
   pnpm build
   ```

### Adding a New Parser
If you want to support additional formats (e.g., a hypothetical P7 format), follow these steps:

1. **Create a New Parser Function**:
   Add a new function, e.g., `parsePPMP7`, in the `parsePPM.ts` file.

2. **Update the Main Function**:
   Modify the `parsePPM` function to detect and handle the new format.

3. **Write Tests**:
   Add comprehensive unit tests for the new format in the `parsePPM.test.ts` file.

4. **Export the Function**:
   Ensure your new parser is exported in `index.ts`.

### Code Structure
- **`src/`**: Contains the source code for the library.
- **`dist/`**: The output directory for the built package.

---

## Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request. Ensure all code is linted and tested before submitting.

### Guidelines
- Follow the existing coding style enforced by Prettier and ESLint.
- Write unit tests for all new features or bug fixes.
- Update the README if you add new features or modify existing functionality.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
