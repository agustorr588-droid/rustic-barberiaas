'use client'

import { useEffect, useRef, useState } from 'react'

interface HeroAnimationProps {
  frames: string[]
}

const TARGET_WIDTH = 600

export default function HeroAnimation({ frames }: HeroAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const imagesRef = useRef<HTMLImageElement[]>([])
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
        const loaded = await Promise.all(
          frames.map((src, idx) =>
            new Promise<HTMLImageElement>((resolve, reject) => {
              const img = new Image()
              img.crossOrigin = 'anonymous'
              img.onload = () => resolve(img)
              img.onerror = () => reject(new Error(`Failed to load ${src}`))
              img.src = src
            })
          )
        )

        if (cancelled) return

        imagesRef.current = loaded
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

    const images = imagesRef.current
    if (!images.length) return

    const first = images[0]
    const scale = TARGET_WIDTH / first.naturalWidth
    canvas.width = TARGET_WIDTH
    canvas.height = Math.round(first.naturalHeight * scale)

    const drawFrame = () => {
      const frameCount = images.length
      const index = Math.min(
        Math.max(Math.floor(progressRef.current * frameCount), 0),
        frameCount - 1
      )

      if (index === currentIndexRef.current) return
      currentIndexRef.current = index

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(images[index], 0, 0, canvas.width, canvas.height)
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
        Agregá imágenes en /public/frames.
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
