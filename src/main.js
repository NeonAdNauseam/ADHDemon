import { createEngine } from './game/engine.js'
import { createScene } from './game/scene.js'

const canvas = document.getElementById('renderCanvas')
const engine = createEngine(canvas)
const scene = createScene(engine, canvas)

engine.runRenderLoop(() => scene.render())
window.addEventListener('resize', () => engine.resize())