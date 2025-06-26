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
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { getTopStfUsers } from "@/api/get-top-user-all";
import { getTopStfUsersMonth } from "@/api/get-top-user-all-month";
import { getAllTicketMetrics } from "@/api/get-all-tickets-metrics";

export function Metrics() {
  const { data } = useQuery({
    queryKey: ["chartStfUsers"],
    queryFn: getTopStfUsers,
  });

  const { data: dataMonth } = useQuery({
    queryKey: ["chartStfUsersMonth"],
    queryFn: getTopStfUsersMonth,
  });

  const { data: dataMetrics } = useQuery({
    queryKey: ["ticketMetrics"],
    queryFn: getAllTicketMetrics,
  });

  console.log(dataMetrics);

  const chartData =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?.map((user: any) => ({
      name: user.name.split(" ")[0], // ou use login, se preferir
      chamados: user.count,
      login: user.login,
    })) || [];

  const chartDataMetrics =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataMetrics?.map((user: any) => ({
      name: user.name.split(" ")[0], // ou use login, se preferir
      chamados: user.ticketcount,
    })) || [];

  const chartDataMonth =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataMonth?.map((user: any) => ({
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
    <div className="px-4 py-4 md:px-10 lg:px-20">
      <title>N1Track | Métricas</title>
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex flex-col gap-6 lg:basis-1/2">
          <div className="w-full">
            <div className="w-full sm:w-[300px] md:w-[350px] lg:w-[400px] xl:w-[600px]">
              <Card>
                <CardHeader>
                  <CardTitle>Total de Chamados por Usuário (Total)</CardTitle>
                  <CardDescription>
                    Ranking entre os 10 principais
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig}>
                    <BarChart
                      data={chartData}
                      margin={{ top: 40, right: 0, left: 0, bottom: 0 }}
                      barSize={40}
                    >
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tickMargin={10}
                        fontSize={10}
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
          <div className="w-full">
            <div className="w-full sm:w-[300px] md:w-[350px] lg:w-[400px] xl:w-[600px]">
              <Card>
                <CardHeader>
                  <CardTitle>Total de Chamados por Usuário (Mês)</CardTitle>
                  <CardDescription>
                    Ranking entre os 10 principais
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig}>
                    <BarChart
                      data={chartDataMonth}
                      margin={{ top: 40, right: 0, left: 0, bottom: 0 }}
                      barSize={40}
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
                        fill="var(--chart-2)"
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
        </div>
        <div className="w-full lg:basis-1/2">
          <div className="w-full sm:w-[300px] md:w-[350px] lg:w-[400px] xl:w-[600px]">
            <Card>
              <CardHeader>
                <CardTitle>Total de Chamados por Usuário (Geral)</CardTitle>
                <CardDescription>
                  Inclui todos os usuários do sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <BarChart
                    data={chartDataMetrics}
                    layout="vertical"
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    barSize={40}
                  >
                    <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                    <YAxis
                      dataKey="name"
                      type="category"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={10}
                      fontSize={12}
                    />
                    <XAxis type="number" hide />
                    <Tooltip
                      cursor={{ fill: "transparent" }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length > 0) {
                          const user = payload[0].payload;
                          return (
                            <div className="bg-background rounded-md border px-3 py-2 shadow-md">
                              <div className="text-sm font-medium">
                                {user.name}
                              </div>
                              <div className="text-sm">
                                Chamados: {user.chamados}
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar
                      dataKey="chamados"
                      fill="var(--chart-4)"
                      radius={[0, 8, 8, 0]}
                    >
                      <LabelList
                        dataKey="chamados"
                        position="right"
                        offset={8}
                        className="fill-foreground"
                        fontSize={12}
                      />
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                  Total acumulado <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                  Inclui todos os registros de chamados por usuário
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
