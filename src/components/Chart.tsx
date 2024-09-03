import React, { useEffect, useRef } from 'react';
import { createChart, ISeriesApi } from 'lightweight-charts';

interface DataPoint {
  time: string;
  open: number;
  close: number;
  high: number;
  low: number;
}

const generateRandomData = (prevClose: number, timeOffset: number): DataPoint => {
  const open = prevClose;
  const close = open + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 10);
  const high = Math.max(open, close) + Math.floor(Math.random() * 10);
  const low = Math.min(open, close) - Math.floor(Math.random() * 10);
  const time = new Date(Date.now() + timeOffset).toISOString().split('T')[0]; // Format date as yyyy-mm-dd
  return {
    time,
    open,
    close,
    high,
    low,
  };
};

const Chart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const currentPriceRef = useRef<number>(50);
  const dataRef = useRef<DataPoint[]>([]);
  const timeOffsetRef = useRef<number>(0);

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        width: 400,
        height: 400,
        rightPriceScale: {
          visible: true,
        },
        leftPriceScale: {
          visible: true,
        },
        timeScale: {
          rightOffset: 5,
          barSpacing: 10, // Increased bar spacing for more space between candlesticks
          fixLeftEdge: false,
        },
      });

      const candlestickSeries = chart.addCandlestickSeries({
        upColor: 'blue',
        downColor: 'red',
        borderDownColor: 'red',
        borderUpColor: 'blue',
        wickDownColor: 'red',
        wickUpColor: 'blue',
      });
      candlestickSeriesRef.current = candlestickSeries;

      const initialData = [generateRandomData(currentPriceRef.current, timeOffsetRef.current)];
      dataRef.current = initialData;
      candlestickSeries.setData(initialData);

      let currentCandlestick = generateRandomData(currentPriceRef.current, timeOffsetRef.current);
      candlestickSeries.update(currentCandlestick);

      const priceInterval = setInterval(() => {
        currentPriceRef.current += (Math.random() > 0.5 ? 1 : -1);
      }, 1000);

      const candlestickUpdateInterval = setInterval(() => {
        currentCandlestick = {
          ...currentCandlestick,
          close: currentPriceRef.current,
          high: Math.max(currentCandlestick.high, currentPriceRef.current),
          low: Math.min(currentCandlestick.low, currentPriceRef.current),
        };
        candlestickSeries.update(currentCandlestick);
      }, 1000);

      const candlestickCreationInterval = setInterval(() => {
        timeOffsetRef.current += 86400000; 
        const newCandlestick = generateRandomData(currentPriceRef.current, timeOffsetRef.current);
        dataRef.current.push(newCandlestick);
        if (dataRef.current.length > 50) {
          dataRef.current.shift(); // Remove the oldest candlestick to keep the chart scrolling
        }
        if (candlestickSeriesRef.current) {
          candlestickSeriesRef.current.setData(dataRef.current);
        }
        currentCandlestick = newCandlestick;
      }, 10000);

      return () => {
        clearInterval(priceInterval);
        clearInterval(candlestickUpdateInterval);
        clearInterval(candlestickCreationInterval);
        chart.remove();
      };
    }
  }, []);

  return <div ref={chartContainerRef} className="w-full h-full flex justify-center items-center" />;
};

export default Chart;
