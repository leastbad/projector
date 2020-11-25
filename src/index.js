import { Controller } from 'stimulus'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { firstDefined, vector, material } from './utils'

export default class extends Controller {
  // static values = {
  //   imagesRatio: Number,
  //   intensity: Number,
  //   intensity1: Number,
  //   intensity2: Number,
  //   commonAngle: Number,
  //   angle: Number,
  //   angle1: Number,
  //   angle2: Number,
  //   speed: Number,
  //   speedIn: Number,
  //   speedOut: Number,
  //   userHover: Boolean,
  //   easing: String
  // }

  // https://github.com/stimulusjs/dev-builds/archive/b8cc8c4/stimulus.tar.gz
  // MP4 1262MB
  // JPG 185MB
  // MP3 113MB
  // WEBP 88MB ┐ 175MB total
  // WEBM 87MB ┘ 86.1% bandwidth savings
  // (Math.floor(Math.random() * 10) + 1)

  initialize () {
    setTimeout(() => {
      // this.imagesRatio = firstDefined(this.imagesRatioValue, 1.0)
      // this.intensity1 = firstDefined(this.intensity1Value, this.intensityValue, 1)
      // this.intensity2 = firstDefined(this.intensity2Value, this.intensityValue, 1)
      // this.commonAngle = firstDefined(this.angleValue, Math.PI / 4) // 45 degrees by default, so grayscale images work correctly
      // this.angle1 = firstDefined(this.angle1Value, this.commonAngle)
      // this.angle2 = firstDefined(this.angle2Value, -this.commonAngle * 3)
      // this.speedIn = firstDefined(this.speedInValue, this.speedValue, 1.6)
      // this.speedOut = firstDefined(this.speedOutValue, this.speedValue, 1.2)
      // this.easing = firstDefined(this.easingValue, 'expo.out')

      this.imagesRatio = 720 / 1280
      this.intensity1 = 0.02
      this.intensity2 = 0.02
      this.commonAngle = Math.PI / 4
      this.angle1 = this.commonAngle
      this.angle2 = -this.commonAngle * 3
      this.speed = 1
      this.easing = 'expo.out'

      this.element['projector'] = this

      this.playing = false
      this.oW = this.element.offsetWidth
      this.oH = this.element.offsetHeight
      this.frame = 1
      this.duration = 2
      this.filter = 0
      this.fps = 1
      this.source = '//dxmyymj4iibfv.cloudfront.net'
      this.framePath = `/${this.fps}fps/`
      this.dispPath = '/dispImages/'

      this.scene = new THREE.Scene()
      const camera = new THREE.OrthographicCamera(
        this.oW / -2,
        this.oW / 2,
        this.oH / 2,
        this.oH / -2,
        1,
        1000
      )

      camera.position.z = 1

      this.renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true
      })

      this.renderer.setPixelRatio(2.0)
      this.renderer.setClearColor(0xffffff, 0.0)
      this.renderer.setSize(this.oW, this.oH)
      this.element.appendChild(this.renderer.domElement)

      this.render = () => this.renderer.render(this.scene, camera)

      this.loader = new THREE.TextureLoader()
      this.loader.crossOrigin = ''

      this.mat = material(this)
      this.geometry = new THREE.PlaneBufferGeometry(this.oW, this.oH, 1)

      this.mesh = new THREE.Mesh(this.geometry, this.mat)
      this.scene.add(this.mesh)
    })
  }

  play = () => {
    this.playing = !this.playing
    if (this.playing)
      this.runLoop = setInterval(() => {
        document.getElementById('container').dat.obie.frame = this.frame
        this.mat = material(this)
        this.scene.children[0].material = this.mat
        gsap.to(this.mat.uniforms.dispFactor, {
          value: 1,
          ease: this.easing,
          duration: this.speed,
          onUpdate: this.render,
          onComplete: this.render
        })
        if (this.frame < this.duration) this.frame++
        else {
          clearInterval(this.runLoop)
          this.playing = false
          this.seek(1)
        }
      }, 1000 / this.fps)
    else clearInterval(this.runLoop)
  }

  seek = position => {
    this.frame = position
  }

  resize = () => {
    this.mesh.material.uniforms.res.value = vector(this)
    this.renderer.setSize(this.oW, this.oH)
    this.render()
  }
}
