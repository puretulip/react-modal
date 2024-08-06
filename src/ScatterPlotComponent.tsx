import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

interface ScatterPlotComponentProps {
  dataset: string;
  labelDataset: string;
}

const ScatterPlotComponent: React.FC<ScatterPlotComponentProps> = ({ dataset, labelDataset }) => {
  const [traces, setTraces] = useState<any[]>([]);

  useEffect(() => {
    // Fetch data from both JSON files
    Promise.all([
      fetch(`${dataset}.json`).then(response => response.json()),
      fetch(`${labelDataset}.json`).then(response => response.json())
    ]).then(([data, labelData]) => {
      const traceMap: { [label: number]: { x: number[], y: number[], text: string[] } } = {};

      // Extract x, y values and labels from the data
      Object.keys(data).forEach(key => {
        const coords = data[key];
        const label = labelData.metadata[key];

        if (!traceMap[label]) {
          traceMap[label] = { x: [], y: [], text: [] };
        }

        traceMap[label].x.push(coords[0]);
        traceMap[label].y.push(coords[1]);
        traceMap[label].text.push(`Label: ${label}`);
      });

      // Convert traceMap to an array of traces
      const tracesArray = Object.keys(traceMap).map(label => ({
        x: traceMap[Number(label)].x,
        y: traceMap[Number(label)].y,
        mode: 'markers',
        type: 'scattergl', // Use scattergl for WebGL rendering
        name: `Label ${label}`,
        text: traceMap[Number(label)].text,
        hoverinfo: 'text',
        marker: { size: 8 }
      }));

      setTraces(tracesArray);
    });
  }, [dataset, labelDataset]);

  return (
    <div>
      <Plot
        data={traces}
        layout={{ title: 'Scatter Plot of Train Data' }}
      />
    </div>
  );
};

export default ScatterPlotComponent;