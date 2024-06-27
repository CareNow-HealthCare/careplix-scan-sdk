# careplix-scan-sdk

Careplix Scan SDK for Web Browser Environment to generate Raw Scan Data.

# Installation

```sh
# with npm
npm install careplix-scan-sdk

# with yarn
yarn add careplix-scan-sdk
```

```js
//import Face Scan module
import * as facescan from "careplix-scan-sdk/facescan";

//import Finger Scan module
import * as fingerscan from "careplix-scan-sdk/fingerscan";
```

# Usage

Include the following html elements in the Scan Page.

```html
<div style="height: 100vh; position: relative;">
  <video id="videoInput" style="position: fixed; right: 1rem; top: 1rem; height: 1px; width: 1px;" autoplay muted playsinline></video>
  <canvas id="canvasOutput" style="width: 100%; height: 100%; transform: scaleX(-1);"></canvas>
</div>
```

## Face Scan

```js
// Initialize the Callbacks
facescan.onFrame(({ type, message, progress, timeElapsed, isLiteMode }) => {
  // Save each frame data
});
facescan.onError((err) => {
  // On any error this callback will be called
});
facescan.onScanFinish(({ raw_intensity, ppg_time, average_fps }) => {
  // Call our Cloud APIs with the given parameters
});

// Start Scan Process
facescan
  .startScan({})
  .then(() => {
    console.log("Scan Started");
  })
  .catch((err) => {
    console.log("Scan Failed");
    console.error(err);
  });
```

> Note: If you're using React, please consider the following approach...

```js
// use Ref for video & canvas elements
const videoRef = useRef();
const canvasRef = useRef();

React.useEffect(() => {
  // intialize all the callbacks like onFrame, onScanFinish, onError etc.
  ...

  // Start Scan Process
  facescan.startScan({ canvasElement: canvasRef.current, videoElement: videoRef.current });

  return () => {
    // be sure to cancel the ongoing scan in cleanup function
    facescan.stopScan();
  };
}, []);
```

### `onFrame()`

During Scan you recieve data from every processed frame through this callback.
| Property Name | Type | Description |
| --- | --- | --- |
| type | string | Type of the frame. Which can be either `"error"` or `"calibration"` or `"scan"` |
| message | string | Hint for user to correct the position of their face on the screen |
| progress | number | Progress percentage of the scan |
| timeElapsed | number | Time Elapsed in ms |
| isLiteMode | boolean | `true` when the SDK switches to [Lite-Mode](#LiteMode) |

### `onError()`

If any error occurs during Scan, this callback will be called with the `Error` object.
| Error Message | Cause/Reason |
| --- | --- |
| Please check your internet connection & try again. | SDK failed to download neccessary files for AI scan. |
| No suitable subject detected. If the issue persists, consider adjusting the framing or removing any obstructions from the view. | No human face detected for a certain duration during scan-time. |

[More Errors...](#Errors)

### `onScanFinish()`

When the scan is finished successfully, this callback will be called with raw data, which will be needed for the API call.
| Property Name | Type | Description |
| --- | --- | --- |
| raw_intensity | array | Raw Scan Data |
| ppg_time | array | Raw Scan Data |
| average_fps | number | Average FPS During Scan |

### `startScan()`

This function call starts the Scan.
| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| scanDuration | number | 60 | Duration of Scan phase in sec (30-120 in multiples of 5) |
| livelinessDetectionDuration | number | 50 | Duration after which liveliness is checked |
| models_path | string | CarePlix CDN | Path of the models directory, only if model files are self-hosted |
| videoElement | HTMLVideoElement | | Ref (React) or DOMElement refering to video element |
| canvasElement | HTMLCanvasElement | | Ref (React) or DOMElement refering to canvas element |

### `stopScan()`

This function call stops the Scan.

## LiteMode

During Calibration time we try to detect if the device has enough processing resource available to run the Face Detection continuously. If for any reason, the device does not have enough resources available, we then start the Scan in Lite Mode. In Lite Mode, we detect the face periodically and continue with the Scanning Process.

## Finger Scan

```js
// Initialize the Callbacks
fingerscan.onFrame(({ type, message, progress, timeElapsed }) => {
  // Save each frame data
});
fingerscan.onError((err) => {
  // On any error this callback will be called
});
fingerscan.onScanFinish(({ raw_intensity, ppg_time, average_fps }) => {
  // Call our Cloud APIs with the given parameters
});

// Start Scan Process
fingerscan
  .startScan({})
  .then(() => {
    console.log("Scan Started");
  })
  .catch((err) => {
    console.log("Scan Failed");
    console.error(err);
  });
```

> Note: If you're using React, please consider the following approach...

```js
// use Ref for video & canvas elements
const videoRef = useRef();
const canvasRef = useRef();

React.useEffect(() => {
  // intialize all the callbacks like onFrame, onScanFinish, onError etc.
  ...

  // Start Scan Process
  fingerscan.startScan({ canvasElement: canvasRef.current, videoElement: videoRef.current });

  return () => {
    // be sure to cancel the ongoing scan in cleanup function
    fingerscan.stopScan();
  };
}, []);
```

### `onFrame()`

During Scan you recieve data from every processed frame through this callback.
| Property Name | Type | Description |
| --- | --- | --- |
| type | string | Type of the frame. Which can be either `"error"` or `"calibration"` or `"scan"` |
| message | string | Hint for user to correct the position of their finger on the back camera |
| progress | number | Progress percentage of the scan |
| timeElapsed | number | Time Elapsed in ms |

### `onError()`

If any error occurs during Scan, this callback will be called with the `Error` object.
| Error Message | Cause/Reason |
| --- | --- |
| Flash could not be acquired. | (Non-Severe) This error will not Cancel the Scan.<br>This error will be logged in console, when device flashlight isn't accessible via the SDK or Browser. |

[More Errors...](#Errors)

### `onScanFinish()`

When the scan is finished successfully, this callback will be called with raw data, which will be needed for the API call.
| Property Name | Type | Description |
| --- | --- | --- |
| raw_intensity | array | Raw Scan Data |
| ppg_time | array | Raw Scan Data |
| average_fps | number | Average FPS During Scan |

### `startScan()`

This function call starts the Scan.
| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| scanDuration | number | 60 | Duration of Scan phase in sec (10-120 in multiples of 5) |
| videoElement | HTMLVideoElement | | Ref (React) or DOMElement refering to video element |
| canvasElement | HTMLCanvasElement | | Ref (React) or DOMElement refering to canvas element |

### `stopScan()`

This function call stops the Scan.

## Errors

Following are some Errors which are common to both Finger/Face Scan SDK
| Error Message | Cause/Reason |
| --- | --- |
| We are not able to access the Camera. Please try again. | SDK is unable to get access to camera, either browser permission is disabled, or device camera is disabled, or hardware camera is not available. |
| Sorry we're unable to compute the signal. Please try again. | SDK failed to perform some logical operation during the scan. |
| App functionality disabled in the Background. Keep it in the Foreground for proper operation. | App is moved to background, maybe due to a phone-call or other reasons. |

## Capture image during scan

```js
function captureImage() {
  let canvas = document.getElementById("canvasOutput");
  let dataURL = canvas.toDataURL("image/png");

  process(dataURL);
  /*
      with the dataURL i.e. "data:image/png;base64,*****" you can do the following things...
      1. Save as PNG image file, then upload to backend.
      2. Send the dataURL to the backend, then save it as file in server.
      3. Send & Save the dataURL as-is.
    */
}
```
