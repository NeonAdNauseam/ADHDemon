import { UniversalCamera, Vector3 } from '@babylonjs/core'

export function createPlayer(scene, canvas) {
  const camera = new UniversalCamera('playerCam', new Vector3(0, 1.8, -5), scene)
  camera.setTarget(Vector3.Zero())
  camera.attachControl(canvas, true)

  camera.speed = 1
  camera.angularSensibility = 2500
  camera.minZ = 0.1
  camera.inertia = 0
  camera.applyGravity = false
  camera.checkCollisions = true
  camera.ellipsoid = new Vector3(0.5, 0.9, 0.5)
  scene.collisionsEnabled = true

  camera.keysUp    = [87]
  camera.keysDown  = [83]
  camera.keysLeft  = [65]
  camera.keysRight = [68]

  let menuOpen = false
  let verticalVelocity = 0
  let isGrounded = false
  let spacePressed = false

const GRAVITY = -0.008    // was -0.018, lower = floatier fall
const JUMP_FORCE = 0.4   // was 0.25, tweak to taste
const PLAYER_HEIGHT = 1.8

scene.registerBeforeRender(() => {
  // Jump check at frame level, not keydown level
  if (spacePressed && isGrounded) {
    isGrounded = false
    verticalVelocity = JUMP_FORCE
    spacePressed = false  // consume it
  }

  const prevY = camera.position.y
  verticalVelocity += GRAVITY
  camera.position.y += verticalVelocity

  if (camera.position.y <= PLAYER_HEIGHT) {
    camera.position.y = PLAYER_HEIGHT
    verticalVelocity = 0
    isGrounded = true
  } else {
    const actualMove = camera.position.y - prevY
    if (Math.abs(actualMove) < Math.abs(verticalVelocity) * 0.5) {
      if (verticalVelocity < 0) {
        verticalVelocity = 0
        isGrounded = true
      } else {
        verticalVelocity = 0
      }
    } else {
      isGrounded = false
    }
  }
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
  if (e.code === 'Space') {
    e.preventDefault()
    spacePressed = true
  }
  if (e.code === 'KeyI') {
    e.preventDefault()
    menuOpen ? closeMenu() : openMenu()
  }
})

window.addEventListener('keyup', (e) => {
  if (e.code === 'Space') spacePressed = false
})


  window.addEventListener('DOMContentLoaded', () => bindUI())
  if (document.readyState !== 'loading') bindUI()

  function bindUI() {
    const sensitivitySlider = document.getElementById('sensitivity-slider')
    const sensitivityValue  = document.getElementById('sensitivity-value')
    const speedSlider       = document.getElementById('speed-slider')
    const speedValue        = document.getElementById('speed-value')
    const resumeBtn         = document.getElementById('resume-btn')

    if (!sensitivitySlider) return

    sensitivitySlider.addEventListener('input', () => {
      camera.angularSensibility = 4500 - (Number(sensitivitySlider.value) * 400)
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