/** Lightweight WebGL feature-detection — deliberately has zero dependency on
 * three.js/@react-three so checking for support never triggers loading the
 * heavy lazy-loaded 3D chunk just to decide whether to show it. */
export function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
  } catch {
    return false
  }
}
