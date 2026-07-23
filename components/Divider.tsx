import { Scissors } from 'lucide-react'

export default function Divider() {
  return (
    <div className="divider-rustic py-8">
      <Scissors className="h-5 w-5 rotate-[-90deg]" />
      <span className="text-xl">✦</span>
      <Scissors className="h-5 w-5 rotate-90" />
    </div>
  )
}
