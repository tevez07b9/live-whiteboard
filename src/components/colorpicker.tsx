import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { Input } from './ui/input'

const commonColors = [
  '#ff6900',
  '#fcb900',
  '#7bdcb5',
  '#00d084',
  '#8ed1fc',
  '#0693e3',
  '#abb83c',
  '#eb144c',
  '#f78da7',
  '#9900ef',
]

type ColorPickerType = {
  color: string
  onChange: (color: string) => void
}

const ColorPicker = ({ color, onChange }: ColorPickerType) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="w-8 h-8 rounded-full"
          style={{ backgroundColor: color }}
        />
      </PopoverTrigger>

      <PopoverContent
        className="w-[17.5rem] p-3 space-y-3"
        side="top"
        align="center"
        sideOffset={20}
      >
        <div className="w-full flex flex-wrap">
          {commonColors.map((c, i) => (
            <span key={`color-picker-${i}`}>
              <div
                title={c}
                tabIndex={i}
                onClick={() => onChange(c)}
                className="w-8 h-8 cursor-pointer relative outline-none rounded-full mr-2 mb-2"
                style={{ backgroundColor: c }}
              ></div>
            </span>
          ))}
          <Input
            type="text"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="w-20"
            placeholder="#0693E3"
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ColorPicker
