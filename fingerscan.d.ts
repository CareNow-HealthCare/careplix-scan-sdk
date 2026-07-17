import { ScanRawData } from "./common";

/**
 * Registers the per-frame callback for Finger Scan.
 *
 * During the scan you receive data from every processed frame through this callback.
 *
 * @param callback - Invoked on each processed frame.
 * - `type` — Type of the frame: `"error"`, `"calibration"` or `"scan"`.
 * - `message` — Hint for the user to correct the position of their finger on the back camera.
 * - `progress` — Progress percentage of the scan.
 * - `timeElapsed` — Time elapsed in ms.
 * - `isThrottling` — `true` when the device performance is likely throttling.
 *
 * @example
 * ```js
 * fingerscan.onFrame(({ type, message, progress, timeElapsed, isThrottling }) => {
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
    isThrottling,
  }: {
    /** Type of the frame. */
    type: "error" | "calibration" | "scan";
    /** Hint for the user to correct the position of their finger on the back camera. */
    message: string;
    /** Progress percentage of the scan. */
    progress: number;
    /** Time elapsed in ms. */
    timeElapsed: number;
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
 * fingerscan.onScanFinish(({ raw_intensity, ppg_time, average_fps }) => {
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
 * fingerscan.onError((err, code, stackTrace) => {
 *   // Handle the error
 * });
 * ```
 */
export function onError(callback: (err: Error, code: string, stackTrace?: string | undefined) => void): void;

/**
 * Starts the Finger Scan.
 *
 * @param options - Scan configuration.
 * @returns A promise that resolves once the scan has started.
 *
 * @example
 * ```js
 * fingerscan
 *   .startScan({ canvasElement: canvasRef.current, videoElement: videoRef.current })
 *   .then(() => console.log("Scan Started"))
 *   .catch((err) => console.error(err));
 * ```
 */
export function startScan({
  scanDuration,
  videoElement,
  canvasElement,
}: {
  /** Duration of the Scan phase in seconds (10-120). @defaultValue 60 */
  scanDuration?: number;
  /** Ref (React) or DOMElement referring to the video element. */
  videoElement: HTMLVideoElement;
  /** Ref (React) or DOMElement referring to the canvas element. */
  canvasElement: HTMLCanvasElement;
}): Promise<void>;

/** Stops the ongoing Finger Scan. */
export function stopScan(): void;
