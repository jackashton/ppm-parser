// The PPM file format, either "P3" (ASCII) or "P6" (binary).
export type PPMFormat = 'P3' | 'P6';

/**
 * Represents a parsed PPM image.
 */
export class PPMImage {
  /**
   * The width of the image in pixels.
   */
  width: number;

  /**
   * The height of the image in pixels.
   */
  height: number;

  /**
   * The raw pixel data as a Uint8Array.
   * Each pixel consists of three consecutive values (R, G, B).
   */
  pixelData: Uint8Array;

  /**
   * The maximum color value of the PPM file (e.g., 255 for 8-bit color).
   */
  maxColorValue: number;

  /**
   * The PPM file format.
   */
  format: PPMFormat;

  /**
   * Creates a new instance of the PPMImage class.
   * @param width - The width of the image in pixels.
   * @param height - The height of the image in pixels.
   * @param pixelData - The raw pixel data as a Uint8Array.
   * @param maxColorValue - The maximum color value of the PPM file.
   * @param format - The PPM file format ("P3" or "P6").
   */
  constructor(width: number, height: number, pixelData: Uint8Array, maxColorValue: number, format: 'P3' | 'P6') {
    this.width = width;
    this.height = height;
    this.pixelData = pixelData;
    this.maxColorValue = maxColorValue;
    this.format = format;
  }

  /**
   * The aspect ratio of the image (width / height).
   */
  aspectRatio(): number {
    return this.width / this.height;
  }

  /**
   * The total number of pixels in the image (width * height).
   */
  get pixelCount(): number {
    return this.width * this.height;
  }

  /**
   * Retrieves the RGB color values of the pixel at the specified coordinates.
   * @param x - The x-coordinate of the pixel.
   * @param y - The y-coordinate of the pixel.
   * @returns An object containing the red, green, and blue values of the pixel.
   */
  getPixel(x: number, y: number): { r: number; g: number; b: number } {
    const index = (y * this.width + x) * 3;
    return {
      r: this.pixelData[index],
      g: this.pixelData[index + 1],
      b: this.pixelData[index + 2],
    };
  }
}

/**
 * Parses the header attributes of a PPM file.
 * @param headerLines - An array of header lines from the PPM file.
 * @returns An object containing the format, width, height, and maxColorValue.
 * @throws If the maxColorValue is not 255.
 */
const parseHeaderAttributes = (headerLines: string[]) => {
  const [format, width, height, maxColorValue] = headerLines;

  if (maxColorValue !== '255') {
    throw new Error('Only 8-bit color depth (max value 255) is supported.');
  }

  return { format, width: parseInt(width), height: parseInt(height), maxColorValue: parseInt(maxColorValue) };
};

/**
 * Parses a PPM file in the P6 (binary) format.
 * @param data - The raw PPM file data as a Uint8Array.
 * @returns A PPMImage instance containing the parsed data.
 * @throws If the format is not P6 or the pixel data size is invalid.
 */
export const parsePPMP6 = (data: Uint8Array): PPMImage => {
  const header = new TextDecoder().decode(data.subarray(0, 20));
  const headerLines = header.split(/\s+/);
  const { format, width, height, maxColorValue } = parseHeaderAttributes(headerLines);

  if (format !== 'P6') {
    throw new Error('Unsupported PPM format: ' + format);
  }

  // Locate the end of the header
  const headerLength = header.indexOf('255') + 4;
  const pixelData = data.subarray(headerLength);

  if (pixelData.length !== width * height * 3) {
    throw new Error('Pixel data does not match expected size.');
  }

  return new PPMImage(width, height, pixelData, maxColorValue, 'P6');
};

/**
 * Parses a PPM file in the P3 (ASCII) format.
 * @param data - The raw PPM file data as a Uint8Array.
 * @returns A PPMImage instance containing the parsed data.
 * @throws If the format is not P3 or the pixel data size is invalid.
 */
export const parsePPMP3 = (data: Uint8Array): PPMImage => {
  const header = new TextDecoder().decode(data);
  const headerLines = header.split(/\s+/);
  const { format, width, height, maxColorValue } = parseHeaderAttributes(headerLines);

  if (format !== 'P3') {
    throw new Error('Unsupported PPM format: ' + format);
  }

  // Pixel data starts after the first 4 lines
  const pixelDataLines = headerLines.slice(4).join('\n');
  const parsedValues = pixelDataLines.split(/\s+/).map(Number);

  if (parsedValues.length !== width * height * 3) {
    throw new Error('Pixel data does not match expected size.');
  }

  const pixelData = new Uint8Array(parsedValues);

  return new PPMImage(width, height, pixelData, maxColorValue, 'P3');
};

/**
 * Parses a PPM file in either the P3 (ASCII) or P6 (binary) format.
 * @param data - The raw PPM file data as a Uint8Array.
 * @returns A PPMImage instance containing the parsed data.
 * @throws If the format is unsupported.
 */
export const parsePPM = (data: Uint8Array): PPMImage => {
  const header = new TextDecoder().decode(data.subarray(0, 20));
  const format = header.split(/\s+/)[0];

  switch (format) {
    case 'P6':
      return parsePPMP6(data);
    case 'P3':
      return parsePPMP3(data);
    default:
      throw new Error('Unsupported PPM format: ' + format);
  }
};

export default parsePPM;
