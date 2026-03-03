import { Scene, HemisphericLight, Vector3 } from '@babylonjs/core'
import { createPlayer } from './player.js'
import { createWorld } from './world.js'

export function createScene(engine, canvas) {
  const scene = new Scene(engine)

  // Basic ambient light
  const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene)
  light.intensity = 0.8

  createWorld(scene)
  createPlayer(scene, canvas)

  return scene
}