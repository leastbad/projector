import * as THREE from 'three'
import { vertex, fragment } from './shaders'

export function firstDefined () {
  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i] !== undefined) return arguments[i]
  }
}

export function vector (c) {
  return c.oH / c.oW < c.imagesRatio
    ? new THREE.Vector4(c.oW, c.oH, 1, c.oH / c.oW / c.imagesRatio)
    : new THREE.Vector4(c.oW, c.oH, (c.oW / c.oH) * c.imagesRatio, 1)
}

export function material (c) {
  const nextFrame = c.frame < c.duration ? c.frame + 1 : c.frame

  if (c.filter > 0) {
    c.disp = c.loader.load(`${c.source}${c.dispPath}${c.filter}.jpg`, c.render)
    c.disp.magFilter = c.disp.minFilter = THREE.LinearFilter
  }

  c.texture1 = c.loader.load(
    `${c.source}${c.framePath}${c.frame}.webp`,
    c.render
  )
  c.texture2 = c.loader.load(
    `${c.source}${c.framePath}${nextFrame}.webp`,
    c.render
  )

  c.texture1.magFilter = c.texture2.magFilter = THREE.LinearFilter
  c.texture1.minFilter = c.texture2.minFilter = THREE.LinearFilter

  return new THREE.ShaderMaterial({
    uniforms: {
      intensity1: {
        type: 'f',
        value: c.intensity1
      },
      intensity2: {
        type: 'f',
        value: c.intensity2
      },
      dispFactor: {
        type: 'f',
        value: 0.0
      },
      angle1: {
        type: 'f',
        value: c.angle1
      },
      angle2: {
        type: 'f',
        value: c.angle2
      },
      texture1: {
        type: 't',
        value: c.texture1
      },
      texture2: {
        type: 't',
        value: c.texture2
      },
      disp: {
        type: 't',
        value: c.disp
      },
      res: {
        type: 'vec4',
        value: vector(c)
      },
      dpr: {
        type: 'f',
        value: window.devicePixelRatio
      }
    },
    vertexShader: vertex,
    fragmentShader: fragment
  })
}
