import { MeshBuilder, StandardMaterial, Color3, Vector3 } from '@babylonjs/core'

export function createWorld(scene) {
  // Floor
  const floor = MeshBuilder.CreateGround('floor', { width: 20, height: 20 }, scene)
  const floorMat = new StandardMaterial('floorMat', scene)
  floorMat.diffuseColor = new Color3(0.3, 0.3, 0.3)
  floor.material = floorMat

  // Some boxes to walk around
  for (let i = 0; i < 6; i++) {
    const box = MeshBuilder.CreateBox(`box${i}`, { size: 1.5 }, scene)
    box.position = new Vector3(
      (Math.random() - 0.5) * 14,
      0.75,
      (Math.random() - 0.5) * 14
    )
    const mat = new StandardMaterial(`mat${i}`, scene)
    mat.diffuseColor = new Color3(Math.random(), Math.random(), Math.random())
    box.material = mat
  }
}