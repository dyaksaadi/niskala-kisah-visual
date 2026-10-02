import './style.css'

const frameCount = 300
const framePath = (frame: number) =>
  `/frames/ezgif-frame-${String(frame).padStart(3, '0')}.jpg`

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header class="site-header">
    <a class="wordmark" href="#atas" aria-label="Niskala, kembali ke awal">
      <span class="wordmark-icon" aria-hidden="true">N</span>
      <span>NISKALA<small>SEBUAH KISAH VISUAL</small></span>
    </a>
    <a class="header-link" href="#jelajahi">Jelajahi kisah <span aria-hidden="true">↗</span></a>
  </header>

  <main id="atas">
    <section class="journey-scroll" id="perjalanan" aria-label="Perjalanan menuju negeri Niskala">
      <div class="scene">
        <canvas class="scene-canvas" aria-label="Animasi perjalanan dari gerbang menuju negeri fantasi" role="img"></canvas>
        <div class="scene-shade" aria-hidden="true"></div>
        <div class="scene-grain" aria-hidden="true"></div>

        <div class="scene-topline">
          <span class="eyebrow"><span class="live-dot"></span> CATATAN PERJALANAN · 01—04</span>
          <span class="coordinates">07° 18′ 42″ N &nbsp; 110° 27′ 11″ E</span>
        </div>

        <div class="story-copy">
          <article class="story-beat is-active" data-beat="0">
            <span class="chapter-number">01 <i>/ 04</i></span>
            <h1>Di balik gerbang,<br>ada <em>dunia lain.</em></h1>
            <p>Di tengah hutan berkabut, sebuah pintu tua menyimpan jalan menuju tempat yang belum pernah ditemukan.</p>
          </article>
          <article class="story-beat" data-beat="1">
            <span class="chapter-number">02 <i>/ 04</i></span>
            <h2>Ikuti cahaya<br>di ujung <em>jalan.</em></h2>
            <p>Langkah demi langkah, kabut menyingkap lembah dan cahaya yang memanggil dari kejauhan.</p>
          </article>
          <article class="story-beat" data-beat="2">
            <span class="chapter-number">03 <i>/ 04</i></span>
            <h2>Kota yang tumbuh<br>di antara <em>kristal.</em></h2>
            <p>Menara berkilau berdiri di tepi air; setiap sudutnya terasa seperti mimpi yang menjadi nyata.</p>
          </article>
          <article class="story-beat" data-beat="3">
            <span class="chapter-number">04 <i>/ 04</i></span>
            <h2>Sebuah dunia<br>tanpa <em>batas.</em></h2>
            <p>Di balik pintu itu, pulau-pulau melayang dan air terjun jatuh ke dalam awan.</p>
          </article>
        </div>

        <div class="scene-bottomline">
          <div class="scroll-prompt"><span class="scroll-arrow" aria-hidden="true">↓</span><span>GULIR UNTUK MENJELAJAH</span></div>
          <div class="frame-counter"><span id="frame-number">001</span><span class="counter-divider">/</span><span>300</span></div>
        </div>
        <div class="progress-track" aria-hidden="true"><span class="progress-fill"></span></div>
      </div>
    </section>

    <section class="discover" id="jelajahi">
      <div class="discover-heading">
        <span class="eyebrow dark-eyebrow">SESUDAH PERJALANAN PANJANG</span>
        <h2>Tak semua tempat<br>harus <em>dicari.</em></h2>
        <p>Ada yang ditemukan saat kita berani melangkah melewati batas yang paling kita kenal.</p>
        <a class="return-link" href="#perjalanan">Jelajahi lagi <span aria-hidden="true">↗</span></a>
      </div>
      <div class="postcard-grid" aria-label="Potongan negeri Niskala">
        <figure class="postcard postcard-city">
          <img src="/frames/ezgif-frame-180.jpg" alt="Kota megah di balik gerbang, dikelilingi pegunungan dan danau">
          <figcaption><span>01 — CAKRAWALA</span><span>Kota di atas awan</span></figcaption>
        </figure>
        <figure class="postcard postcard-islands">
          <img src="/frames/ezgif-frame-270.jpg" alt="Pulau-pulau terapung dengan air terjun di negeri fantasi">
          <figcaption><span>02 — NISKALA</span><span>Negeri yang tersembunyi</span></figcaption>
        </figure>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <a class="wordmark footer-mark" href="#atas"><span class="wordmark-icon" aria-hidden="true">N</span><span>NISKALA<small>SEBUAH KISAH VISUAL</small></span></a>
    <span>DIBUAT UNTUK PARA PEMIMPI <span aria-hidden="true">✳</span></span>
    <a class="back-top" href="#atas">KEMBALI KE ATAS ↑</a>
  </footer>
`

const canvas = document.querySelector<HTMLCanvasElement>('.scene-canvas')!
const context = canvas.getContext('2d')
const scrollSection = document.querySelector<HTMLElement>('.journey-scroll')!
const progressFill = document.querySelector<HTMLElement>('.progress-fill')!
const frameNumber = document.querySelector<HTMLElement>('#frame-number')!
const storyBeats = Array.from(document.querySelectorAll<HTMLElement>('.story-beat'))
const images: Array<HTMLImageElement | undefined> = new Array(frameCount)
let currentFrame = 1
let displayedImage: HTMLImageElement | undefined
let animationFrame = 0
let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function loadFrame(frame: number) {
  const index = Math.max(1, Math.min(frameCount, frame)) - 1
  const cached = images[index]

  if (cached) return cached

  const image = new Image()
  image.decoding = 'async'
  image.src = framePath(index + 1)
  image.onload = () => {
    if (index + 1 === currentFrame) drawFrame(image)
  }
  images[index] = image
  return image
}

function drawFrame(image: HTMLImageElement) {
  if (!context || !image.naturalWidth) return

  const scale = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight)
  const width = image.naturalWidth * scale
  const height = image.naturalHeight * scale
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height)
  displayedImage = image
}

function resizeCanvas() {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = Math.round(canvas.clientWidth * pixelRatio)
  canvas.height = Math.round(canvas.clientHeight * pixelRatio)
  if (displayedImage) drawFrame(displayedImage)
}

function updateScene() {
  animationFrame = 0
  const sectionBounds = scrollSection.getBoundingClientRect()
  const scrollRange = scrollSection.offsetHeight - window.innerHeight
  const progress = reducedMotion || scrollRange <= 0
    ? 0
    : Math.max(0, Math.min(1, -sectionBounds.top / scrollRange))
  const nextFrame = Math.round(progress * (frameCount - 1)) + 1

  progressFill.style.transform = `scaleX(${progress})`
  frameNumber.textContent = String(nextFrame).padStart(3, '0')
  storyBeats.forEach((beat, index) => {
    const active = index === Math.min(Math.floor(progress * storyBeats.length), storyBeats.length - 1)
    beat.classList.toggle('is-active', active)
    beat.setAttribute('aria-hidden', String(!active))
  })

  if (nextFrame !== currentFrame || !images[0]) {
    currentFrame = nextFrame
    for (let offset = -3; offset <= 5; offset += 1) {
      const image = loadFrame(currentFrame + offset)
      if (offset === 0 && image.complete && image.naturalWidth) drawFrame(image)
    }
  }
}

function requestSceneUpdate() {
  if (!animationFrame) animationFrame = window.requestAnimationFrame(updateScene)
}

function handleMotionPreference(event: MediaQueryListEvent) {
  reducedMotion = event.matches
  requestSceneUpdate()
}

window.addEventListener('scroll', requestSceneUpdate, { passive: true })
window.addEventListener('resize', () => {
  resizeCanvas()
  requestSceneUpdate()
})
window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', handleMotionPreference)

resizeCanvas()
for (let frame = 1; frame <= 8; frame += 1) loadFrame(frame)
requestSceneUpdate()
