/** RGB intensity values of a single processed frame. */
type Intensity = { r: number; g: number; b: number };

/** Raw scan data returned when a scan finishes successfully. Pass these values to the CarePlix Cloud APIs. */
export type ScanRawData = { raw_intensity: Intensity[]; ppg_time: number[]; average_fps: number };

/**
 * Resolves the Model name/number of the current device.
 *
 * Derived from {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgentData | userAgentData}
 * or {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent | userAgent}.
 * e.g. `"SM-S918B"` denotes a "Samsung S23 Ultra" device.
 *
 * @example
 * ```js
 * import { getDeviceModelName } from "careplix-scan-sdk";
 * const deviceModel = await getDeviceModelName();
 * ```
 */
export function getDeviceModelName(): Promise<string>;
