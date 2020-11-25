import { Controller } from 'stimulus'
import * as dat from 'dat.gui'

export default class extends Controller {
  initialize () {
    setTimeout(() => {
      this.element['dat'] = this
      this.projector = this.element.querySelector('#projector').projector
      this.howler = this.element.howler
      this.gui = new dat.GUI()
      this.obie = {
        frame: 1,
        filter: 0,
        speed: 2,
        intensity1: 0.02,
        intensity2: 0.02,
        angle1: 4,
        angle2: 4,
        playPause: () => {
          this.howler.play()
          this.projector.play()
        }
      }
      this.gui
        .add(this.obie, 'frame', 1, 7296, 1)
        .listen()
        .onChange(value => {
          this.projector.seek(value)
          this.howler.seek(value)
        })
      this.gui.add(this.obie, 'filter', 0, 16, 1).onChange(value => {
        this.projector.filter = value
      })
      this.gui.add(this.obie, 'speed', 0.1, 10, 0.1).onChange(value => {
        this.projector.speed = value
      })
      this.gui.add(this.obie, 'angle1', 2, 10, 0.5).onChange(value => {
        this.projector.angle1 = value
      })
      this.gui.add(this.obie, 'angle2', 2, 10, 0.5).onChange(value => {
        this.projector.angle2 = value
      })
      this.gui.add(this.obie, 'intensity1', 0, 1, 0.01).onChange(value => {
        this.projector.intensity1 = value
      })
      this.gui.add(this.obie, 'intensity2', 0, 1, 0.01).onChange(value => {
        this.projector.intensity2 = value
      })
      this.gui.add(this.obie, 'playPause')
    }, 5)
  }
}
