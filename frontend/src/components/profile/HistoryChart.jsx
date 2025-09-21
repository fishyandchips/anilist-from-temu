"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A line chart"

const chartData = [
  { year: "2005", count: 186 },
  { year: "2006", count: 305 },
  { year: "2007", count: 237 },
  { year: "2008", count: 73 },
  { year: "2009", count: 209 },
  { year: "2010", count: 214 },
  { year: "2011", count: 186 },
  { year: "2012", count: 305 },
  { year: "2013", count: 237 },
  { year: "2014", count: 73 },
  { year: "2015", count: 209 },
  { year: "2016", count: 214 },
]

const chartConfig = {
  count: {
    label: "Count",
    color: "#7FC3FF"
  },
}

export function HistoryChart() {
  return (
    <Card className="bg-[#282828] border-0">
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[25rem]">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 4)}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="count"
              type="natural"
              stroke={chartConfig.count.color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
