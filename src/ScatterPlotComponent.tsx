import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

interface ScatterPlotComponentProps {
  dataset: string;
  labelDataset: string;
}

const ScatterPlotComponent: React.FC<ScatterPlotComponentProps> = ({ dataset, labelDataset }) => {
  const [xValues, setXValues] = useState<number[]>([]);
  const [yValues, setYValues] = useState<number[]>([]);
  const [labels, setLabels] = useState<number[]>([]);
  const [hoverText, setHoverText] = useState<string[]>([]);

  useEffect(() => {
    // Fetch data from both JSON files
    Promise.all([
      fetch(`${dataset}.json`).then(response => response.json()),
      fetch(`${labelDataset}.json`).then(response => response.json())
    ]).then(([data, labelData]) => {
      const xVals: number[] = [];
      const yVals: number[] = [];
      const labelVals: number[] = [];
      const hoverTexts: string[] = [];

      // Extract x, y values and labels from the data
      Object.keys(data).forEach(key => {
        const coords = data[key];
        xVals.push(coords[0]);
        yVals.push(coords[1]);
        const label = labelData.metadata[key];
        labelVals.push(label);
        hoverTexts.push(`Label: ${label}`);
      });

      setXValues(xVals);
      setYValues(yVals);
      setLabels(labelVals);
      setHoverText(hoverTexts);
    });
  }, [dataset, labelDataset]);

  return (
    <div>
      <Plot
        data={[
          {
            x: xValues,
            y: yValues,
            mode: 'markers',
            type: 'scattergl', // Use scattergl for WebGL rendering
            marker: {
              color: labels,
              colorscale: 'Viridis', // Choose a color scale
              showscale: true
            },
            text: hoverText,
            hoverinfo: 'text'
          },
        ]}
        layout={{ title: 'Scatter Plot of Train Data' }}
      />
    </div>
  );
};

export default ScatterPlotComponent;