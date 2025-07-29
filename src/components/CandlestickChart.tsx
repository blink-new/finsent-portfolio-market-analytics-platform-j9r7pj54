import React from 'react';

interface CandlestickData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  [key: string]: any;
}

interface CandlestickChartProps {
  data: CandlestickData[];
  width?: number;
  height?: number;
  activeIndicators?: string[];
  indicatorColors?: { [key: string]: string };
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({
  data,
  width = 800,
  height = 400,
  activeIndicators = [],
  indicatorColors = {}
}) => {
  if (!data || data.length === 0) return null;

  const margin = { top: 20, right: 60, bottom: 40, left: 60 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  // Calculate price range
  const prices = data.flatMap(d => [d.high, d.low]);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice;
  const padding = priceRange * 0.1;
  const yMin = minPrice - padding;
  const yMax = maxPrice + padding;

  // Calculate scales
  const xScale = (index: number) => (index * chartWidth) / (data.length - 1);
  const yScale = (price: number) => chartHeight - ((price - yMin) / (yMax - yMin)) * chartHeight;
  
  const candleWidth = Math.max(2, Math.min(12, chartWidth / data.length * 0.6));

  // Generate grid lines
  const gridLines = [];
  const numGridLines = 5;
  for (let i = 0; i <= numGridLines; i++) {
    const y = (i * chartHeight) / numGridLines;
    const price = yMax - (i * (yMax - yMin)) / numGridLines;
    gridLines.push({ y, price });
  }

  return (
    <div className="w-full h-full">
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        {/* Background */}
        <rect width={width} height={height} fill="transparent" />
        
        {/* Grid lines */}
        <g>
          {gridLines.map((line, i) => (
            <g key={i}>
              <line
                x1={margin.left}
                y1={margin.top + line.y}
                x2={margin.left + chartWidth}
                y2={margin.top + line.y}
                stroke="#e5e7eb"
                strokeWidth={0.5}
                strokeDasharray="2,2"
              />
              <text
                x={margin.left - 10}
                y={margin.top + line.y + 4}
                textAnchor="end"
                fontSize="10"
                fill="#6b7280"
              >
                ₺{line.price.toFixed(0)}
              </text>
            </g>
          ))}
        </g>

        {/* X-axis labels */}
        <g>
          {data.map((d, i) => {
            if (i % Math.ceil(data.length / 6) === 0) {
              return (
                <text
                  key={i}
                  x={margin.left + xScale(i)}
                  y={height - margin.bottom + 15}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#6b7280"
                >
                  {d.date}
                </text>
              );
            }
            return null;
          })}
        </g>

        {/* Technical Indicators */}
        {activeIndicators.includes('Moving Average (20)') && (
          <polyline
            fill="none"
            stroke={indicatorColors['Moving Average (20)'] || '#8B5CF6'}
            strokeWidth="2"
            strokeDasharray="3,3"
            points={data.map((d, i) => 
              `${margin.left + xScale(i)},${margin.top + yScale(d.MA20)}`
            ).join(' ')}
          />
        )}

        {activeIndicators.includes('EMA (12)') && (
          <polyline
            fill="none"
            stroke={indicatorColors['EMA (12)'] || '#F59E0B'}
            strokeWidth="2"
            points={data.map((d, i) => 
              `${margin.left + xScale(i)},${margin.top + yScale(d.EMA12)}`
            ).join(' ')}
          />
        )}

        {activeIndicators.includes('EMA (26)') && (
          <polyline
            fill="none"
            stroke={indicatorColors['EMA (26)'] || '#06B6D4'}
            strokeWidth="2"
            points={data.map((d, i) => 
              `${margin.left + xScale(i)},${margin.top + yScale(d.EMA26)}`
            ).join(' ')}
          />
        )}

        {activeIndicators.includes('Bollinger Bands') && (
          <>
            <polyline
              fill="none"
              stroke={indicatorColors['Bollinger Bands'] || '#EF4444'}
              strokeWidth="1"
              strokeDasharray="2,2"
              points={data.map((d, i) => 
                `${margin.left + xScale(i)},${margin.top + yScale(d.BollingerUpper)}`
              ).join(' ')}
            />
            <polyline
              fill="none"
              stroke={indicatorColors['Bollinger Bands'] || '#EF4444'}
              strokeWidth="1"
              strokeDasharray="2,2"
              points={data.map((d, i) => 
                `${margin.left + xScale(i)},${margin.top + yScale(d.BollingerLower)}`
              ).join(' ')}
            />
          </>
        )}

        {/* Candlesticks */}
        <g>
          {data.map((d, i) => {
            const x = margin.left + xScale(i);
            const isGreen = d.close >= d.open;
            const color = isGreen ? '#22c55e' : '#ef4444';
            const bodyTop = Math.min(d.open, d.close);
            const bodyBottom = Math.max(d.open, d.close);
            const bodyHeight = Math.max(1, Math.abs(yScale(bodyTop) - yScale(bodyBottom)));

            return (
              <g key={i}>
                {/* High-Low line (wick) */}
                <line
                  x1={x}
                  y1={margin.top + yScale(d.high)}
                  x2={x}
                  y2={margin.top + yScale(d.low)}
                  stroke={color}
                  strokeWidth={1}
                />
                
                {/* Open-Close body */}
                <rect
                  x={x - candleWidth / 2}
                  y={margin.top + yScale(bodyTop)}
                  width={candleWidth}
                  height={bodyHeight}
                  fill={isGreen ? color : 'white'}
                  stroke={color}
                  strokeWidth={1}
                />
                
                {/* Invisible hover area for tooltip */}
                <rect
                  x={x - candleWidth}
                  y={margin.top + yScale(d.high)}
                  width={candleWidth * 2}
                  height={yScale(d.low) - yScale(d.high)}
                  fill="transparent"
                  className="cursor-pointer"
                >
                  <title>
                    {d.date}
                    {'\n'}Open: ₺{d.open.toFixed(2)}
                    {'\n'}High: ₺{d.high.toFixed(2)}
                    {'\n'}Low: ₺{d.low.toFixed(2)}
                    {'\n'}Close: ₺{d.close.toFixed(2)}
                    {'\n'}Volume: {d.volume.toLocaleString()}
                  </title>
                </rect>
              </g>
            );
          })}
        </g>

        {/* Legend */}
        {activeIndicators.length > 0 && (
          <g>
            <rect
              x={margin.left + 10}
              y={margin.top + 10}
              width={200}
              height={activeIndicators.length * 20 + 10}
              fill="rgba(255, 255, 255, 0.9)"
              stroke="#e5e7eb"
              strokeWidth={1}
              rx={4}
            />
            {activeIndicators.map((indicator, i) => (
              <g key={indicator}>
                <line
                  x1={margin.left + 20}
                  y1={margin.top + 25 + i * 20}
                  x2={margin.left + 35}
                  y2={margin.top + 25 + i * 20}
                  stroke={indicatorColors[indicator] || '#666'}
                  strokeWidth={2}
                />
                <text
                  x={margin.left + 40}
                  y={margin.top + 29 + i * 20}
                  fontSize="12"
                  fill="#374151"
                >
                  {indicator}
                </text>
              </g>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
};

export default CandlestickChart;