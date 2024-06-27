import { ScanRawData } from "./common";
export function onFrame(callback: ({ type, message, progress, timeElapsed }: {
    type: "error" | "calibration" | "scan";
    message: string;
    progress: number;
    timeElapsed: number;
}) => void): void;
export function onScanFinish(callback: ({ raw_intensity, ppg_time, average_fps }: ScanRawData) => void): void;
export function onError(callback: (err: Error) => void): void;
export function startScan({ scanDuration, videoElement, canvasElement }: {
    scanDuration?: number;
    videoElement: HTMLVideoElement;
    canvasElement: HTMLCanvasElement;
}): Promise<void>;
export function stopScan(): void;
