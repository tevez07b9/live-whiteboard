import React, { useEffect, useRef, useState } from 'react'
import Toolbar from './toolbar'
import { useCanvas } from '@/context/canvas-context'
import { Tool } from '@/types'
import { useToast } from '@/hooks/use-toast'

type CanvasProps = {
  socket: WebSocket | null
  roomId?: string
}

type Stroke = {
  startX: number
  startY: number
  x: number
  y: number
}

type DrawEvent = {
  strokes: Stroke[]
  brushColor: string
  brushSize: number
  eraserSize: number
  tool: Tool
}

const Canvas = ({ socket, roomId }: CanvasProps) => {
  const { brushColor, brushSize, eraserSize, tool } = useCanvas()
  const { toast } = useToast()

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const canvasContainerRef = useRef<HTMLDivElement | null>(null)
  const startingCords = useRef<{
    startX: number
    startY: number
  }>({
    startX: 0,
    startY: 0,
  })
  const currentStrokes = useRef<Stroke[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(
    null
  )

  const getCanvasContext = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    return ctx
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
  }

  useEffect(() => {
    if (!socket) return

    socket.onmessage = (message) => {
      const { event, data } = JSON.parse(message.data)

      if (event === 'user-joined') {
        // Show toast notification for other users joining
        toast({
          title: 'New User Joined',
          description: `${data.username} has joined the room.`,
          duration: 3000,
        })
      }

      if (event === 'draw') {
        drawOnCanvas(data)
      }

      if (event === 'update-canvas') {
        clearCanvas()
        data.forEach((drawing: DrawEvent) => {
          drawOnCanvas(drawing)
        })
      }
    }
  }, [socket])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to match parent container
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const ctx = getCanvasContext()
    if (!ctx) return

    const x = event.nativeEvent.offsetX
    const y = event.nativeEvent.offsetY
    ctx.beginPath()
    ctx.moveTo(x, y)

    startingCords.current = { startX: x, startY: y }
  }

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setMousePos({ x: event.nativeEvent.offsetX, y: event.nativeEvent.offsetY })
    if (!isDrawing) return

    const ctx = getCanvasContext()
    if (!ctx) return

    const x = event.nativeEvent.offsetX
    const y = event.nativeEvent.offsetY

    ctx.lineWidth = tool === 'eraser' ? eraserSize : brushSize
    if (tool === 'pen') ctx.strokeStyle = brushColor
    ctx.globalCompositeOperation =
      tool === 'eraser' ? 'destination-out' : 'source-over'

    ctx.lineTo(x, y)
    ctx.stroke()

    const { startX, startY } = startingCords.current
    currentStrokes.current.push({ x, y, startX, startY })
    startingCords.current = { startX: x, startY: y }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    // Emit draw event to the server
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          event: 'draw',
          data: {
            roomId,
            strokes: currentStrokes.current,
            brushColor,
            brushSize,
            eraserSize,
            tool,
          },
        })
      )
    }
    currentStrokes.current = []
  }

  const drawOnCanvas = (data: DrawEvent) => {
    const ctx = getCanvasContext()
    if (!ctx) return
    if (data.strokes.length) {
      data.strokes.forEach((stroke) => {
        ctx.lineWidth =
          data.tool === 'eraser' ? data.eraserSize : data.brushSize
        if (data.tool === 'pen') ctx.strokeStyle = data.brushColor
        ctx.globalCompositeOperation =
          data.tool === 'eraser' ? 'destination-out' : 'source-over'

        ctx.beginPath()
        ctx.moveTo(stroke.startX, stroke.startY)
        ctx.lineTo(stroke.x, stroke.y)
        ctx.stroke()
      })
    }
  }

  return (
    <div
      className="relative w-full h-full canvas-container"
      ref={canvasContainerRef}
    >
      {tool === 'eraser' && mousePos && (
        <div
          className="absolute rounded-full border-2 border-gray-500 opacity-50 pointer-events-none"
          style={{
            width: eraserSize,
            height: eraserSize,
            left: mousePos.x - eraserSize / 2,
            top: mousePos.y - eraserSize / 2,
          }}
        />
      )}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      <Toolbar socket={socket} canvasBoundaryRef={canvasContainerRef} />
    </div>
  )
}

export default Canvas
