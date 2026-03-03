import { Engine } from '@babylonjs/core'

export function createEngine(canvas) {
  const engine = new Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
  })
  return engine
}