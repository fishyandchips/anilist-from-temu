"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A bar chart"

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

export function ScoreChart({ data }) {
  return (
    <Card className="bg-[#282828] border-0">
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[25rem]">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="score"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.toString().slice(0, 3)}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="amount" radius={9999} barSize={40}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={barColors[index]} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
