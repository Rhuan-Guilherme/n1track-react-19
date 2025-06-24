import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { getTopStfUsers } from "@/api/get-top-user-all";

export function Metrics() {
  const { data } = useQuery({
    queryKey: ["chartStfUsers"],
    queryFn: getTopStfUsers,
  });

  const chartData =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?.map((user: any) => ({
      name: user.name.split(" ")[0], // ou use login, se preferir
      chamados: user.count,
      login: user.login,
    })) || [];

  const chartConfig = {
    chamados: {
      label: "Chamados",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function CustomTooltip({ active, payload }: any) {
    if (active && payload && payload.length > 0) {
      const user = payload[0].payload;
      return (
        <div className="bg-background rounded-md border px-3 py-2 shadow-md">
          <div className="text-sm font-medium">{user.name}</div>
          <div className="text-muted-foreground text-sm">{user.login}</div>
          <div className="text-sm">Chamados: {user.chamados}</div>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="mx-20">
      <div className="w-200">
        <Card>
          <CardHeader>
            <CardTitle>Total de Chamados por Usuário (Total)</CardTitle>
            <CardDescription>Ranking entre os 10 principais</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                data={chartData}
                margin={{ top: 40, right: 0, left: 0, bottom: 0 }}
                barSize={60}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  content={<CustomTooltip />}
                />
                <Bar
                  dataKey="chamados"
                  fill="var(--chart-1)"
                  radius={[8, 8, 0, 0]}
                >
                  <LabelList
                    dataKey="chamados"
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 leading-none font-medium">
              Crescimento contínuo <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none">
              Mostrando os usuários com mais chamados registrados
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
