import { useMemo } from 'react';

/**
 * BarChart - A pure CSS bar chart component
 */
export function BarChart({ data = [], horizontal = false, height = 200, showLabels = true, showValues = true, colors = ['#789A99', '#60a5fa', '#fbbf24', '#4ade80', '#a78bfa'] }) {
    const maxValue = useMemo(() => Math.max(...data.map(d => d.value), 1), [data]);

    if (horizontal) {
        return (
            <div className="space-y-3">
                {data.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                        {showLabels && (
                            <div className="flex justify-between text-sm">
                                <span className="text-[#1e2a32] font-medium">{item.label}</span>
                                {showValues && <span className="text-[#8a9aa4]">{item.value.toLocaleString()}</span>}
                            </div>
                        )}
                        <div className="h-6 bg-[#e8e0dc] rounded-lg overflow-hidden">
                            <div
                                className="h-full rounded-lg transition-all duration-500"
                                style={{ width: `${(item.value / maxValue) * 100}%`, backgroundColor: item.color || colors[idx % colors.length] }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="flex items-end justify-between gap-2" style={{ height }}>
            {data.map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex flex-col justify-end" style={{ height: height - 30 }}>
                        {showValues && <span className="text-xs text-center text-[#8a9aa4] mb-1">{item.value}</span>}
                        <div
                            className="w-full rounded-t-lg transition-all duration-500"
                            style={{ height: `${(item.value / maxValue) * 100}%`, backgroundColor: item.color || colors[idx % colors.length], minHeight: 4 }}
                        />
                    </div>
                    {showLabels && <span className="text-xs text-[#5a6b75] text-center truncate w-full">{item.label}</span>}
                </div>
            ))}
        </div>
    );
}

/**
 * LineChart - A pure CSS/SVG line chart component
 */
export function LineChart({ data = [], height = 200, width = '100%', showDots = true, showArea = true, color = '#789A99', showLabels = true }) {
    const maxValue = useMemo(() => Math.max(...data.map(d => d.value), 1), [data]);
    const points = useMemo(() => {
        const padding = 20;
        const chartWidth = 100;
        const step = (chartWidth - padding * 2) / Math.max(data.length - 1, 1);
        return data.map((d, i) => ({
            x: padding + i * step,
            y: 100 - padding - ((d.value / maxValue) * (100 - padding * 2)),
            ...d,
        }));
    }, [data, maxValue]);

    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const areaPath = `${linePath} L ${points[points.length - 1]?.x || 0} 100 L ${points[0]?.x || 0} 100 Z`;

    return (
        <div style={{ width, height }} className="relative">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                {showArea && <path d={areaPath} fill={`${color}20`} />}
                <path d={linePath} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                {showDots && points.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r="3" fill={color} stroke="white" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                ))}
            </svg>
            {showLabels && (
                <div className="flex justify-between mt-2 text-xs text-[#8a9aa4]">
                    {data.map((d, i) => <span key={i}>{d.label}</span>)}
                </div>
            )}
        </div>
    );
}

/**
 * PieChart - A pure CSS donut/pie chart component
 */
export function PieChart({ data = [], size = 180, donut = true, showLegend = true, colors = ['#789A99', '#60a5fa', '#fbbf24', '#4ade80', '#a78bfa', '#f87171'] }) {
    const total = useMemo(() => data.reduce((sum, d) => sum + d.value, 0), [data]);
    const segments = useMemo(() => {
        let currentOffset = 0;
        return data.map((d, i) => {
            const percentage = total > 0 ? (d.value / total) * 100 : 0;
            const segment = { ...d, percentage, offset: currentOffset, color: d.color || colors[i % colors.length] };
            currentOffset += percentage;
            return segment;
        });
    }, [data, total, colors]);

    const radius = 15.9155;
    const circumference = 2 * Math.PI * radius;

    return (
        <div className={`flex ${showLegend ? 'gap-6' : ''} items-center`}>
            <div style={{ width: size, height: size }} className="relative">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    {segments.map((seg, i) => (
                        <circle
                            key={i}
                            cx="18" cy="18" r={radius}
                            fill="none" stroke={seg.color}
                            strokeWidth={donut ? 3.5 : 18}
                            strokeDasharray={`${(seg.percentage / 100) * circumference} ${circumference}`}
                            strokeDashoffset={`${-(seg.offset / 100) * circumference}`}
                            className="transition-all duration-500"
                        />
                    ))}
                </svg>
                {donut && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-[#1e2a32]">{total.toLocaleString()}</span>
                        <span className="text-xs text-[#8a9aa4]">Total</span>
                    </div>
                )}
            </div>
            {showLegend && (
                <div className="space-y-2">
                    {segments.map((seg, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: seg.color }} />
                            <span className="text-sm text-[#5a6b75]">{seg.label}</span>
                            <span className="text-sm font-medium text-[#1e2a32]">{seg.percentage.toFixed(1)}%</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

/**
 * FunnelChart - A conversion funnel visualization
 */
export function FunnelChart({ data = [], height = 300, showPercentage = true, showDropoff = true }) {
    const maxValue = data[0]?.value || 1;

    return (
        <div className="space-y-2" style={{ minHeight: height }}>
            {data.map((stage, idx) => {
                const widthPercent = (stage.value / maxValue) * 100;
                const prevValue = idx > 0 ? data[idx - 1].value : stage.value;
                const dropoff = prevValue > 0 ? ((prevValue - stage.value) / prevValue * 100).toFixed(1) : 0;

                return (
                    <div key={idx} className="relative group">
                        <div className="flex items-center gap-3">
                            <div className="flex-1">
                                <div
                                    className="h-12 rounded-xl flex items-center px-4 transition-all duration-500 mx-auto"
                                    style={{ width: `${Math.max(widthPercent, 20)}%`, backgroundColor: stage.color || '#789A99' }}
                                >
                                    <span className="text-white font-medium text-sm truncate">{stage.label}</span>
                                    <span className="ml-auto text-white font-bold">{stage.value.toLocaleString()}</span>
                                </div>
                            </div>
                            {showPercentage && (
                                <span className="w-16 text-right text-sm font-medium text-[#1e2a32]">
                                    {((stage.value / maxValue) * 100).toFixed(0)}%
                                </span>
                            )}
                        </div>
                        {showDropoff && idx > 0 && (
                            <div className="absolute -top-1 right-20 bg-[#f87171]/10 text-[#f87171] text-xs px-2 py-0.5 rounded-full">
                                -{dropoff}%
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

/**
 * SparkLine - A mini line chart for inline stats
 */
export function SparkLine({ data = [], width = 60, height = 20, color = '#789A99' }) {
    const maxValue = Math.max(...data, 1);
    const minValue = Math.min(...data, 0);
    const range = maxValue - minValue || 1;

    const points = data.map((v, i) => {
        const x = (i / Math.max(data.length - 1, 1)) * 100;
        const y = 100 - ((v - minValue) / range) * 100;
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg width={width} height={height} viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points={points} vectorEffect="non-scaling-stroke" />
        </svg>
    );
}

/**
 * StatCard - A card for displaying a single metric
 */
export function StatCard({ label, value, change, changeLabel = 'vs last period', icon, color = 'bg-[#789A99]', trend }) {
    const isPositive = change?.toString().startsWith('+') || parseFloat(change) > 0;

    return (
        <div className="p-4 bg-white rounded-2xl border-2 border-[#e8e0dc] hover:border-[#789A99]/30 transition-all">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm text-[#5a6b75]">{label}</p>
                    <p className="text-2xl font-bold text-[#1e2a32] mt-1">{value}</p>
                    {change !== undefined && (
                        <p className={`text-xs mt-1 flex items-center gap-1 ${isPositive ? 'text-[#4ade80]' : 'text-[#f87171]'}`}>
                            <span>{isPositive ? '↑' : '↓'}</span>
                            <span>{change} {changeLabel}</span>
                        </p>
                    )}
                </div>
                {icon && <div className={`p-3 rounded-xl text-white ${color}`}>{icon}</div>}
                {trend && <SparkLine data={trend} />}
            </div>
        </div>
    );
}

/**
 * HeatmapCell - Individual cell for heat maps
 */
export function HeatmapCell({ value, maxValue, label, onClick, size = 40 }) {
    const intensity = maxValue > 0 ? value / maxValue : 0;
    const bgColor = `rgba(120, 154, 153, ${0.1 + intensity * 0.9})`;
    const textColor = intensity > 0.5 ? 'white' : '#1e2a32';

    return (
        <button
            onClick={onClick}
            className="flex items-center justify-center rounded-lg font-medium text-xs transition-all hover:scale-105"
            style={{ width: size, height: size, backgroundColor: bgColor, color: textColor }}
            title={`${label}: ${value}`}
        >
            {value}
        </button>
    );
}

export default { BarChart, LineChart, PieChart, FunnelChart, SparkLine, StatCard, HeatmapCell };
