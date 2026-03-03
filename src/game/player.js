import { UniversalCamera, Vector3 } from '@babylonjs/core'

export function createPlayer(scene, canvas) {
  const camera = new UniversalCamera('playerCam', new Vector3(0, 1.8, -5), scene)
  camera.setTarget(Vector3.Zero())
  camera.attachControl(canvas, true)

  camera.speed = 0.3
  camera.angularSensibility = 2000
  camera.minZ = 0.1

  camera.applyGravity = true
  camera.checkCollisions = true
  camera.ellipsoid = new Vector3(0.5, 0.9, 0.5)
  scene.gravity = new Vector3(0, -0.98, 0)
  scene.collisionsEnabled = true

  camera.keysUp    = [87] // W
  camera.keysDown  = [83] // S
  camera.keysLeft  = [65] // A
  camera.keysRight = [68] // D

  let menuOpen = false
  let isGrounded = false

  // Track grounded state for jump
  scene.registerBeforeRender(() => {
    const prevY = camera.position.y
    // If velocity is near zero vertically and close to ground level, we're grounded
    isGrounded = camera.position.y <= 1.82
  })

  function openMenu() {
    menuOpen = true
    document.getElementById('escape-menu').classList.add('visible')
    document.exitPointerLock()
    camera.detachControl()
  }

  function closeMenu() {
    menuOpen = false
    document.getElementById('escape-menu').classList.remove('visible')
    camera.attachControl(canvas, true)
    canvas.requestPointerLock()
  }

  scene.onPointerDown = () => {
    if (!menuOpen) canvas.requestPointerLock()
  }

  window.addEventListener('keydown', (e) => {
    // I key toggles menu
    if (e.code === 'KeyI') {
      e.preventDefault()
      menuOpen ? closeMenu() : openMenu()
    }

    // Spacebar jump
    if (e.code === 'Space' && isGrounded) {
      e.preventDefault()
      camera.cameraDirection.y += 0.5
    }
  })

  // Wire up sliders and resume button after DOM is ready
  window.addEventListener('DOMContentLoaded', () => bindUI())
  // If DOM already loaded (likely), bind immediately too
  if (document.readyState !== 'loading') bindUI()

  function bindUI() {
    const sensitivitySlider = document.getElementById('sensitivity-slider')
    const sensitivityValue  = document.getElementById('sensitivity-value')
    const speedSlider       = document.getElementById('speed-slider')
    const speedValue        = document.getElementById('speed-value')
    const resumeBtn         = document.getElementById('resume-btn')

    if (!sensitivitySlider) return // guard if called before DOM

    sensitivitySlider.addEventListener('input', () => {
      camera.angularSensibility = Number(sensitivitySlider.value)
      sensitivityValue.textContent = sensitivitySlider.value
    })

    speedSlider.addEventListener('input', () => {
      camera.speed = Number(speedSlider.value) / 10
      speedValue.textContent = speedSlider.value
    })

    resumeBtn.addEventListener('click', () => closeMenu())
  }

  return camera
}