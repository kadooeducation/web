'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/presentation/external/components/ui/chart'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'blue',
  },
  mobile: {
    label: 'Mobile',
    color: 'orange',
  },
} satisfies ChartConfig

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
]

export function ApplicantsBarChart() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Inscrições x Aprovações (últimos 6 meses)
      </h3>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical horizontal />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip
            content={<ChartTooltipContent className="bg-black text-white" />}
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="desktop" fill="blue" radius={4} />
          <Bar dataKey="mobile" fill="orange" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
