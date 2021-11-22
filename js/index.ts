class Wheel {
    sections = [
        { color: '#3244a8', value: '1' },
        { color: '#3244a8', value: '2' },
        { color: '#3244a8', value: '3' },
        { color: '#3244a8', value: '4' },
        { color: '#3244a8', value: '5' },
        { color: '#3244a8', value: '6' },
        { color: '#3244a8', value: '8' },
        { color: '#3244a8', value: '9' },
        { color: '#3244a8', value: '0' }
    ]
    canvas = document.querySelector<HTMLCanvasElement>('canvas')
    ctx = this.canvas?.getContext('2d')
    width = this.ctx?.canvas.width ?? 300
    rad = this.width / 2
    start = document.querySelector<HTMLButtonElement>("button")
    friction: number = 0.995
    angVel = 0
    tau = 2 * Math.PI
    arc = this.tau / this.sections?.length
    ang = 0
    sectionCount = this.sections.length
    rand = (m: any, M: any) => Math.random() * (M - m) + m
    getIndex = () => Math.floor(this.sectionCount - this.ang / this.tau * this.sectionCount) % this.sectionCount

    constructor() {
        this.sections.forEach(this.drawSection)
        this.rotate()
        this.engine()
        if (this.start != null) {
            this.start.onclick = () => {
                if (!this.angVel)
                    this.angVel = this.rand(0.25, 0.35)
            }
        }
    }

    drawSection = (section: any, i: number) => {
        this.ang = this.arc * i
        this.ctx?.save()
        this.ctx?.beginPath()
        if (this.ctx != null)
            this.ctx.fillStyle = section.color
        this.ctx?.moveTo(this.rad, this.rad)
        this.ctx?.arc(this.rad, this.rad, this.rad, this.ang, this.ang + this.arc)
        this.ctx?.lineTo(this.rad, this.rad)
        this.ctx?.fill

        this.ctx?.translate(this.rad, this.rad)
        this.ctx?.rotate(this.ang + this.arc / 2)
        if (this.ctx != null) {
            this.ctx.textAlign = "right"
            this.ctx.fillStyle = "fff"
            this.ctx.font = "bold 1.5rem sans-serif"
        }
        this.ctx?.fillText(section.value, this.rad - 10, 10)

        this.ctx?.restore()
    }

    rotate = () => {
        const section = this.sections[this.getIndex()]
        if (this.ctx != null)
            this.ctx.canvas.style.transform = `rotate(${this.ang - Math.PI / 2})`
        if (this.start != null) {
            this.start.textContent = !this.angVel ? "Test" : section.value
            this.start.style.background = section.color
        }
    }

    frame = () => {
        const section = this.sections[this.getIndex()]
        if (!this.angVel)
            return
        this.angVel *= this.friction
        if (this.angVel < 0.002)
            this.angVel = 0
        this.ang += this.angVel
        this.ang %= this.tau

        if (this.angVel <= 0.000) {
            alert("Resultaat: " + section.value)
        }

        this.rotate()
    }

    engine = () => {
        this.frame()
        requestAnimationFrame(this.engine)
    }
}

const start = document.querySelector<HTMLButtonElement>("button")
if (start != null) {
    start.onclick = () => {
        new Wheel()
    }
}