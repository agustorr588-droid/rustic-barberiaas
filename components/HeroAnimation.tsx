'use client'

import { useEffect, useRef, useState } from 'react'

interface HeroAnimationProps {
  frames: string[]
}

const TARGET_WIDTH = 600
const GREEN_KEY = { r: 0, g: 255, b: 0 }
const THRESHOLD = 120

function isGreen(r: number, g: number, b: number): boolean {
  if (g < THRESHOLD) return false
  const rg = Math.abs(r - GREEN_KEY.r)
  const gg = Math.abs(g - GREEN_KEY.g)
  const bg = Math.abs(b - GREEN_KEY.b)
  const distance = Math.sqrt(rg * rg + gg * gg + bg * bg)
  const saturation = g - Math.max(r, b)
  return distance < 220 && saturation > 35
}

function chromaKey(image: HTMLImageElement): ImageData {
  const canvas = document.createElement('canvas')
  const scale = TARGET_WIDTH / image.width
  canvas.width = TARGET_WIDTH
  canvas.height = Math.round(image.height * scale)

  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) throw new Error('Canvas 2D not supported')

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data

  for (let i = 0; i < data.length; i += 4) {
    if (isGreen(data[i], data[i + 1], data[i + 2])) {
      data[i + 3] = 0
    }
  }

  ctx.putImageData(imageData, 0, 0)
  return ctx.getImageData(0, 0, canvas.width, canvas.height)
}

export default function HeroAnimation({ frames }: HeroAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const frameDataRef = useRef<ImageData[]>([])
  const rafRef = useRef<number>(0)
  const progressRef = useRef<number>(0)
  const currentIndexRef = useRef<number>(-1)

  useEffect(() => {
    if (!frames.length) {
      setStatus('error')
      return
    }

    let cancelled = false

    const preload = async () => {
      try {
        const entries = await Promise.all(
          frames.map((src, idx) =>
            new Promise<{ idx: number; imageData: ImageData }>((resolve, reject) => {
              const img = new Image()
              img.crossOrigin = 'anonymous'
              img.onload = () => {
                try {
                  resolve({ idx, imageData: chromaKey(img) })
                } catch (err) {
                  reject(err)
                }
              }
              img.onerror = () => reject(new Error(`Failed to load ${src}`))
              img.src = src
            })
          )
        )

        if (cancelled) return

        entries.sort((a, b) => a.idx - b.idx)
        frameDataRef.current = entries.map((e) => e.imageData)
        setStatus('ready')
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('[HeroAnimation] preload failed:', err)
        if (!cancelled) setStatus('error')
      }
    }

    preload()

    return () => {
      cancelled = true
      cancelAnimationFrame(rafRef.current)
    }
  }, [frames])

  useEffect(() => {
    if (status !== 'ready') return

    const canvas = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !wrapper) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const frameData = frameDataRef.current
    if (!frameData.length) return

    const first = frameData[0]
    canvas.width = first.width
    canvas.height = first.height

    const drawFrame = () => {
      const frameCount = frameData.length
      const index = Math.min(
        Math.max(Math.floor(progressRef.current * frameCount), 0),
        frameCount - 1
      )

      if (index === currentIndexRef.current) return
      currentIndexRef.current = index

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.putImageData(frameData[index], 0, 0)
    }

    const updateProgress = () => {
      if (!wrapper) return
      const rect = wrapper.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const elementHeight = rect.height

      // Progress goes from 0 (element top at viewport bottom) to 1 (element bottom at viewport top)
      const start = viewportHeight
      const end = -elementHeight
      const distance = start - end
      const value = (start - rect.top) / distance

      progressRef.current = Math.min(Math.max(value, 0), 1)
      rafRef.current = requestAnimationFrame(drawFrame)
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress, { passive: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [status])

  if (status === 'loading') {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="flex h-full w-full items-center justify-center text-center text-sm text-cream/60">
        No se encontraron fotogramas.
        <br />
        Agregá imágenes JPG en /public/frames.
      </div>
    )
  }

  return (
    <div ref={wrapperRef} className="hero-animation-wrapper">
      <canvas
        ref={canvasRef}
        className="hero-animation-canvas"
        aria-label="Animación de transformación de corte de pelo"
      />
    </div>
  )
}
