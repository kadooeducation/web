"use client"

import { Tooltip } from "@/presentation/external/components/ui/tooltip";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

type PendingMentor = {
  id: number; name: string; area: string; years: number; tags: string[]; avatar?: string; profileUrl?: string
}
const initialPendingMentors: PendingMentor[] = [
  { id: 101, name: "Ana Silva", area: "Marketing", years: 8, tags: ["Growth", "Branding"], profileUrl: "/mentores/101" },
  { id: 102, name: "Bruno Santos", area: "Tech", years: 10, tags: ["Arquitetura", "DevOps"], profileUrl: "/mentores/102" },
  { id: 103, name: "Mariana Costa", area: "Produto", years: 6, tags: ["Discovery", "Métricas"], profileUrl: "/mentores/103" },
]

const mentorAreas = [
  { area: "Produto", value: 32, color: "#5127FF" },
  { area: "Marketing", value: 21, color: "#F4DA02" },
  { area: "Tech", value: 27, color: "#10B981" },
  { area: "Finanças", value: 14, color: "#F97316" },
  { area: "Jurídico", value: 9, color: "#EF4444" },
]

export function MentorAreasPieChart() {
  const total = mentorAreas.reduce((acc, cur) => acc + cur.value, 0)
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Áreas dos mentores</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip />
            <Pie
              data={mentorAreas}
              dataKey="value"
              nameKey="area"
              innerRadius={60}
              outerRadius={90}
              strokeWidth={4}
            >
              {mentorAreas.map((entry, idx) => (
                <Cell key={idx} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm text-gray-600 mt-2">Total de mentores: <span className="font-medium">{total}</span></p>
      <div className="mt-2 flex flex-wrap gap-2">
        {mentorAreas.map((m) => (
          <span key={m.area} className="inline-flex items-center gap-2 text-xs bg-gray-50 rounded-full px-2.5 py-1">
            <span className="inline-block w-2 h-2 rounded-full" style={{ background: m.color }} />
            {m.area} • {m.value}
          </span>
        ))}
      </div>
    </div>
  )
}