import { Controller } from 'stimulus'
import { Howl } from 'howler'

export default class extends Controller {
  initialize () {
    this.element['howler'] = this
    this.howl = new Howl({
      src: [
        '//dxmyymj4iibfv.cloudfront.net/obie.webm',
        '//dxmyymj4iibfv.cloudfront.net/obie.mp3'
      ],
      html5: true
    })
      .on('load', () => {
        const projector = document.getElementById('projector').projector
        projector.duration = Math.ceil(this.howl.duration()) * projector.fps
      })
      .on('end', () => {
        this.playing = false
        this.howl.seek(0)
      })
    this.playing = false
  }

  play = () => {
    this.playing = !this.playing
    if (this.playing) this.howl.play()
    else this.howl.pause()
  }

  get duration () {
    return this.howl.duration()
  }

  get seek () {
    return this.howl.seek() + 1
  }

  seek = position => {
    const projector = document.getElementById('projector').projector
    this.howl.seek((position - 1) / projector.fps)
  }
}
