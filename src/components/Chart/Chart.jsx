import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ weekData }) => {
  return (
    <div style={{ width: "100%", height: "300px", maxWidth: "600px" }}>
      <ResponsiveContainer>
        <AreaChart
          width={303}
          height={213}
          data={weekData}
          margin={{ top: 10, right: 30, bottom: 20, left: 20 }}
        >
          <defs>
            <linearGradient
              id="gradient"
              x1="98.3597"
              y1="213"
              x2="105.349"
              y2="10.1215"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9BE1A0" stopOpacity="0.1" />
              <stop offset="1" stopColor="#9BE1A0" />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="water"
            stroke="#9BE1A0"
            strokeWidth={2}
            fill="url(#gradient)"
            dot={{ r: 7, strokeWidth: 2, fill: "#FFF", stroke: "#9BE1A0" }}
            activeDot={{ r: 8, stroke: "#EFEFEF", fill: "fff" }}
          />
          <XAxis
            dataKey="name"
            tick={{
              fontSize: 15,
              fontWeight: "normal",
              fill: "#323F47",
              dy: 21,
            }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            domain={[0, 3000]}
            tickFormatter={(value) => `${(value / 1000).toFixed(1)}L`}
            tick={{
              fontSize: 15,
              fontWeight: "normal",
              fill: "#323F47",
              dx: -20,
            }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value) => [`${value} ml`]}
            contentStyle={{
              backgroundColor: "#FFF",
              border: "1px solid #EFEFEF",
              borderRadius: "8px",
              fontSize: "14px",
              color: "#000",
            }}
            itemStyle={{
              color: "#000",
            }}
            labelFormatter={() => ""}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
