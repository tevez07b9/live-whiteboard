import { Tool } from '@/types'
import { createContext, useContext, useState } from 'react'

type CanvasContextType = {
  brushColor: string
  brushSize: number
  eraserSize: number
  tool: Tool
  setBrushColor: (color: string) => void
  setBrushSize: (size: number) => void
  setEraserSize: (size: number) => void
  setTool: (tool: Tool) => void
}

const CanvasContext = createContext<CanvasContextType | null>(null)

export const CanvasProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [brushColor, setBrushColor] = useState('#000000')
  const [brushSize, setBrushSize] = useState(5)
  const [eraserSize, setEraserSize] = useState(30)
  const [tool, setTool] = useState<Tool>('pen')

  return (
    <CanvasContext.Provider
      value={{
        brushColor,
        setBrushColor,
        brushSize,
        setBrushSize,
        eraserSize,
        setEraserSize,
        tool,
        setTool,
      }}
    >
      {children}
    </CanvasContext.Provider>
  )
}

export const useCanvas = () => {
  const context = useContext(CanvasContext)
  if (!context) {
    throw new Error('useCanvas must be used within a CanvasProvider')
  }
  return context
}
