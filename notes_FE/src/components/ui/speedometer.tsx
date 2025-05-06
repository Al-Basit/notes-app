import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface SpeedometerProps {
    speed: number;
    maxSpeed?: number;
}

const Speedometer: React.FC<SpeedometerProps> = ({ speed, maxSpeed = 100 }) => {

    const greenShades = ["#4caf50", "#66bb6a", "#81c784", "#a5d6a7"];
    const yellowShades = ["#ffee58", "#ffeb3b", "#fdd835"];
    const redShades = ["#ef5350", "#e53935", "#d32f2f"];

    const shades = [...greenShades, ...yellowShades, ...redShades];

    const data = shades.map((color, index) => ({
        value: maxSpeed / 10,
        color,
    }));

    const renderCustomLabel = ({
        cx,
        cy,
        midAngle,
        outerRadius,
        index,
    }: any) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius + 15;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        const value = Math.round((index + 1) * (maxSpeed / 10));

        return (
            <text
                x={x}
                y={y}
                fill="#666"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
                fontSize="12px"
            >
                {value}
            </text>
        );
    };

    const needleAngle = (speed / maxSpeed) * 180;

    return (
        <ResponsiveContainer width="100%" height={200}>
            <div className="relative flex items-center justify-center w-full h-[300px]">
                {/* Recharts PieChart */}
                <div className="relative">
                    <PieChart width={230} height={200}>
                        <Pie
                            data={data}
                            startAngle={180}
                            endAngle={0}
                            innerRadius={60}
                            outerRadius={80}
                            dataKey="value"
                            stroke="none"
                            label={renderCustomLabel}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>

                    {/* Needle */}
                    <div
                        className="absolute flex items-center justify-center origin-bottom"
                        style={{
                            transform: `rotate(${needleAngle - 90}deg)`,
                            top: "15%",
                            left: "50%",
                        }}
                    >
                        {/* Needle Line */}
                        <div
                            className="w-[3px] h-[70px] bg-gradient-to-b from-red-500 to-gray-900 rounded-md"
                            style={{
                                transformOrigin: "bottom",
                                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                            }}
                        ></div>

                        {/* Needle Base */}
                        <div
                            className="absolute w-[12px] h-[12px] bg-gray-800 rounded-full border-[3px] border-white"
                            style={{
                                top: "calc(100% - 6px)",
                                left: "-5px",
                            }}
                        ></div>
                    </div>
                </div>

                {/* Center Text */}
                <div className="absolute top-[63%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <h3 className="text-2xl font-bold">{speed}</h3>
                    <p className="text-sm text-gray-600">Grade Rating</p>
                </div>
            </div>
        </ResponsiveContainer>
    );
};

export default Speedometer;
