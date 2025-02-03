import { Button } from './ui/button'
import { Toggle } from './ui/toggle'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Slider } from './ui/slider'
import ColorPicker from './colorpicker'
import { Eraser, Pen, Redo, RotateCcw, Undo } from 'lucide-react'
import { useCanvas } from '@/context/canvas-context'

type ToolbarProps = {
  socket: WebSocket | null
  canvasBoundaryRef: React.RefObject<HTMLDivElement>
}

const Toolbar = ({ socket, canvasBoundaryRef }: ToolbarProps) => {
  const {
    brushColor,
    brushSize,
    eraserSize,
    tool,
    setBrushColor,
    setBrushSize,
    setEraserSize,
    setTool,
  } = useCanvas()
  return (
    <div className="absolute bottom-4 left-4 p-4 bg-card shadow rounded-lg flex items-center gap-4">
      {/* Tools */}
      <Popover>
        <PopoverTrigger asChild>
          <Toggle
            onPressedChange={() => setTool('pen')}
            pressed={tool === 'pen'}
            variant="outline"
            aria-label="Toggle pen"
          >
            <Pen />
          </Toggle>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          collisionBoundary={
            canvasBoundaryRef.current ? [canvasBoundaryRef.current] : undefined
          }
          align="center"
          sideOffset={30}
          collisionPadding={10}
          avoidCollisions={true}
        >
          <Slider
            value={[brushSize]}
            min={1}
            max={10}
            step={1}
            onValueChange={(value) => setBrushSize(Number(value))}
          />
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Toggle
            onPressedChange={() => setTool('eraser')}
            pressed={tool === 'eraser'}
            variant="outline"
            aria-label="Toggle eraser"
          >
            <Eraser />
          </Toggle>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          collisionBoundary={
            canvasBoundaryRef.current ? [canvasBoundaryRef.current] : undefined
          }
          align="center"
          sideOffset={30}
          collisionPadding={10}
          avoidCollisions={true}
        >
          <Slider
            value={[eraserSize]}
            min={20}
            max={60}
            step={1}
            onValueChange={(value) => setEraserSize(Number(value))}
          />
        </PopoverContent>
      </Popover>

      {/* Color Picker */}
      <ColorPicker
        color={brushColor}
        onChange={(color) => setBrushColor(color)}
      />

      <Button
        variant="outline"
        onClick={() => {
          if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(
              JSON.stringify({
                event: 'undo',
              })
            )
          }
        }}
      >
        <Undo />
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(
              JSON.stringify({
                event: 'redo',
              })
            )
          }
        }}
      >
        <Redo />
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(
              JSON.stringify({
                event: 'clear',
              })
            )
          }
        }}
      >
        <RotateCcw />
      </Button>
    </div>
  )
}

export default Toolbar
