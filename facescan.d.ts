import { ScanRawData } from "./common";

/**
 * Registers the per-frame callback for Face Scan.
 *
 * During the scan you receive data from every processed frame through this callback.
 *
 * @param callback - Invoked on each processed frame.
 * - `type` — Type of the frame: `"error"`, `"calibration"` or `"scan"`.
 * - `message` — Hint for the user to correct the position of their face on the screen.
 * - `progress` — Progress percentage of the scan.
 * - `timeElapsed` — Time elapsed in ms.
 * - `isLiteMode` — `true` when the SDK switches to Lite-Mode (device lacks resources to run face detection continuously, so faces are detected periodically).
 * - `isThrottling` — `true` when the device performance is likely throttling.
 *
 * @example
 * ```js
 * facescan.onFrame(({ type, message, progress, timeElapsed, isLiteMode, isThrottling }) => {
 *   // Save each frame data
 * });
 * ```
 */
export function onFrame(
  callback: ({
    type,
    message,
    progress,
    timeElapsed,
    isLiteMode,
    isThrottling,
  }: {
    /** Type of the frame. */
    type: "error" | "calibration" | "scan";
    /** Hint for the user to correct the position of their face on the screen. */
    message: string;
    /** Progress percentage of the scan. */
    progress: number;
    /** Time elapsed in ms. */
    timeElapsed: number;
    /** `true` when the SDK switches to Lite-Mode. */
    isLiteMode: boolean;
    /** `true` when the device performance is likely throttling. */
    isThrottling: boolean;
  }) => void
): void;

/**
 * Registers the callback fired when the scan finishes successfully.
 *
 * @param callback - Invoked with the raw scan data ({@link ScanRawData}) needed for the CarePlix Cloud API call.
 *
 * @example
 * ```js
 * facescan.onScanFinish(({ raw_intensity, ppg_time, average_fps }) => {
 *   // Call the Cloud APIs with the given parameters
 * });
 * ```
 */
export function onScanFinish(callback: ({ raw_intensity, ppg_time, average_fps }: ScanRawData) => void): void;

/**
 * Registers the error callback. Called whenever an error occurs during the scan.
 *
 * @param callback - Invoked with the `Error` object, an error `code` string, and an optional stack trace.
 *
 * @example
 * ```js
 * facescan.onError((err, code, stackTrace) => {
 *   // Handle the error
 * });
 * ```
 */
export function onError(callback: (err: Error, code: string, stackTrace?: string | undefined) => void): void;

/**
 * Starts the Face Scan.
 *
 * @param options - Scan configuration.
 * @returns A promise that resolves once the scan has started.
 *
 * @example
 * ```js
 * facescan
 *   .startScan({ canvasElement: canvasRef.current, videoElement: videoRef.current })
 *   .then(() => console.log("Scan Started"))
 *   .catch((err) => console.error(err));
 * ```
 */
export function startScan({
  scanDuration,
  livelinessDetectionDuration,
  models_path,
  videoElement,
  canvasElement,
  strictness,
  drawConfig: { type, color, lineSize },
  deviceModel,
  tryHDCamera,
}: {
  /** Duration of the Scan phase in seconds (30-120). @defaultValue 60 */
  scanDuration?: number;
  /** Duration in seconds (10 to `scanDuration`) within which liveliness is detected. @defaultValue 50 */
  livelinessDetectionDuration?: number;
  /** Path of the models directory, only if model files are self-hosted. @defaultValue CarePlix CDN */
  models_path?: string;
  /** Ref (React) or DOMElement referring to the video element. */
  videoElement: HTMLVideoElement;
  /** Ref (React) or DOMElement referring to the canvas element. */
  canvasElement: HTMLCanvasElement;
  /** Level of strictness between 1 and 5. @defaultValue 4 */
  strictness?: 1 | 2 | 3 | 4 | 5;
  /**
   * Configuration for the shape drawn around the face during the scan.
   * @defaultValue `{ type: "rounded-corners", color: "#fff", lineSize: 5 }`
   */
  drawConfig?: {
    /** Shape drawn around the face. */
    type?: "face-circle" | "face-mesh" | "rounded-corners";
    /** Stroke color of the drawn shape. */
    color?: string;
    /** Line thickness of the drawn shape. */
    lineSize?: number;
  };
  /**
   * Model name/number of the device, e.g. `"SM-S918B"` (Samsung S23 Ultra).
   * If omitted, the model is assumed from userAgentData/userAgent.
   */
  deviceModel?: string;
  /**
   * Scan is started with the camera at standard resolution by default for better performance.
   * Set this to `true` to start the camera in HD. Note: the SDK may still drop back to the
   * standard resolution automatically if runtime performance is poor.
   * @defaultValue false
   */
  tryHDCamera?: boolean;
}): Promise<void>;

/** Stops the ongoing Face Scan. */
export function stopScan(): void;
