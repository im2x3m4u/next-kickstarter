import { Input } from "@/components/ui/input"
import { Edit3 } from "lucide-react"

export function EditableField({ label, value, onChange, isEdit, placeholder }: {
  label: string
  value: string
  onChange: (v: string) => void
  isEdit: boolean
  placeholder?: string
}) {
  return (
    <div className="group rounded-xl border border-gray-200/70 bg-white/70 p-4 hover:border-indigo-200 hover:bg-white transition-colors">
      <p className="text-[11px] uppercase tracking-wider text-gray-500">{label}</p>
      {isEdit ? (
        <Input
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="text-gray-900 mt-1"
        />
      ) : (
        <p className="text-gray-900 font-medium mt-1">{value || "-"}</p>
      )}
    </div>
  )
}
