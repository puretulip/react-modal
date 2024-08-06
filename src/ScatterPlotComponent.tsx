import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

interface ScatterPlotComponentProps {
  dataset: string;
}

const ScatterPlotComponent: React.FC<ScatterPlotComponentProps> = ({ dataset }) => {
  const [xValues, setXValues] = useState<number[]>([]);
  const [yValues, setYValues] = useState<number[]>([]);

  useEffect(() => {
    // Load data from the selected dataset
    fetch(`${dataset}.json`)
      .then(response => response.json())
      .then(data => {
        const xVals: number[] = [];
        const yVals: number[] = [];

        // Extract x and y values from the data
        Object.values(data).forEach((coords: number[]) => {
          xVals.push(coords[0]);
          yVals.push(coords[1]);
        });

        setXValues(xVals);
        setYValues(yVals);
      });
  }, [dataset]);

  return (
    <div>
      <Plot
        data={[
          {
            x: xValues,
            y: yValues,
            mode: 'markers',
            type: 'scattergl',
            marker: { color: 'blue' },
          },
        ]}
        layout={{ title: 'Scatter Plot of Train Data' }}
      />
    </div>
  );
};

export default ScatterPlotComponent;