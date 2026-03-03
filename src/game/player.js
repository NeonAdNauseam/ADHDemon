import { UniversalCamera, Vector3 } from '@babylonjs/core'

export function createPlayer(scene, canvas) {
  const camera = new UniversalCamera('playerCam', new Vector3(0, 1.8, -5), scene)
  camera.setTarget(Vector3.Zero())
  camera.attachControl(canvas, true)

  // FPS feel
  camera.speed = 0.3
  camera.angularSensibility = 800
  camera.minZ = 0.1

  // WASD keys
  camera.keysUp    = [87] // W
  camera.keysDown  = [83] // S
  camera.keysLeft  = [65] // A
  camera.keysRight = [68] // D

  // Lock pointer on click for mouse look
  scene.onPointerDown = () => {
    canvas.requestPointerLock()
  }

  return camera
}