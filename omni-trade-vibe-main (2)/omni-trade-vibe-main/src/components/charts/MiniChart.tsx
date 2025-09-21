import { useMemo } from "react";
import { Card } from "@/components/ui/card";

interface MiniChartProps {
  data: number[];
  title: string;
  value?: string;
  change?: string;
  type?: 'line' | 'bar' | 'area';
  color?: 'success' | 'danger' | 'warning' | 'primary';
  height?: number;
}

export function MiniChart({ 
  data, 
  title, 
  value, 
  change, 
  type = 'line', 
  color = 'primary',
  height = 60 
}: MiniChartProps) {
  const { pathData, maxValue, minValue } = useMemo(() => {
    if (!data.length) return { pathData: '', maxValue: 0, minValue: 0 };
    
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    const width = 120;
    const chartHeight = height - 20;
    const stepX = width / (data.length - 1);
    
    let path = '';
    
    if (type === 'line' || type === 'area') {
      path = data.map((value, index) => {
        const x = index * stepX;
        const y = chartHeight - ((value - min) / range) * chartHeight + 10;
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
      }).join(' ');
    }
    
    return { pathData: path, maxValue: max, minValue: min };
  }, [data, height, type]);

  const colorClasses = {
    success: 'text-success',
    danger: 'text-danger', 
    warning: 'text-warning',
    primary: 'text-primary'
  };

  const strokeColor = {
    success: 'hsl(var(--success))',
    danger: 'hsl(var(--danger))',
    warning: 'hsl(var(--warning))',
    primary: 'hsl(var(--primary))'
  };

  return (
    <Card className="p-3 bg-gradient-dashboard">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-xs text-muted-foreground">{title}</p>
          {value && (
            <p className={`text-sm font-semibold ${colorClasses[color]}`}>
              {value}
            </p>
          )}
        </div>
        {change && (
          <span className={`text-xs ${change.startsWith('+') ? 'text-success' : 'text-danger'}`}>
            {change}
          </span>
        )}
      </div>
      
      <div className="w-full" style={{ height }}>
        <svg width="100%" height={height} className="overflow-visible">
          {type === 'area' && (
            <defs>
              <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={strokeColor[color]} stopOpacity="0.3" />
                <stop offset="100%" stopColor={strokeColor[color]} stopOpacity="0.05" />
              </linearGradient>
            </defs>
          )}
          
          {type === 'line' && (
            <path
              d={pathData}
              fill="none"
              stroke={strokeColor[color]}
              strokeWidth="1.5"
              className="drop-shadow-sm"
            />
          )}
          
          {type === 'area' && (
            <>
              <path
                d={`${pathData} L ${120} ${height - 10} L 0 ${height - 10} Z`}
                fill={`url(#gradient-${color})`}
              />
              <path
                d={pathData}
                fill="none"
                stroke={strokeColor[color]}
                strokeWidth="1.5"
              />
            </>
          )}
          
          {type === 'bar' && data.map((value, index) => {
            const barHeight = ((value - minValue) / (maxValue - minValue || 1)) * (height - 20);
            const barWidth = (120 / data.length) * 0.8;
            const x = (index * 120) / data.length + barWidth * 0.1;
            const y = height - barHeight - 10;
            
            return (
              <rect
                key={index}
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={strokeColor[color]}
                opacity="0.8"
                rx="1"
              />
            );
          })}
          
          {/* Data points for line/area charts */}
          {(type === 'line' || type === 'area') && data.map((value, index) => {
            const x = (index * 120) / (data.length - 1);
            const y = (height - 20) - ((value - minValue) / (maxValue - minValue || 1)) * (height - 20) + 10;
            
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="2"
                fill={strokeColor[color]}
                className="opacity-70"
              />
            );
          })}
        </svg>
      </div>
    </Card>
  );
}