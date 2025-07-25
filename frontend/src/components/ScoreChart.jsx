"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A bar chart"

const chartData = [
  { score: "10", count: 346 },
  { score: "20", count: 81 },
  { score: "30", count: 173 },
  { score: "40", count: 247 },
  { score: "50", count: 775 },
  { score: "60", count: 1540 },
  { score: "70", count: 6260 },
  { score: "80", count: 16667 },
  { score: "90", count: 32568 },
  { score: "100", count: 27565 },
]

const chartConfig = {
  count: {
    label: "Count",
    color: "#7FC3FF"
  },
}

const barColors = [
  "#FF7F7F",
  "#FF967F",
  "#FFBA7F",
  "#FFE57F",
  "#E5FF7F",
  "#B6FF7F",
  "#83FF7F",
  "#7FFFBD",
  "#7FFFDD",
  "#7FF6FF",
]

export function ScoreChart() {
  return (
    <Card className="bg-[#282828] border-0">
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[25rem]">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="score"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" radius={9999} barSize={40}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={barColors[index]} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
