import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

interface HistogramComponentProps {
  dataset: string;
}

const HistogramComponent: React.FC<HistogramComponentProps> = ({ dataset }) => {
  const [metadataValues, setMetadataValues] = useState<number[]>([]);
  const [trace, setTrace] = useState<any>(null);

  useEffect(() => {
    // Load data from the selected dataset
    fetch(`${dataset}.json`)
      .then(response => response.json())
      .then(data => {
        const values = Object.values(data.metadata);
        setMetadataValues(values);

        // Create a single trace with customized bar colors
        const trace = {
          x: values,
          type: 'histogram',
          marker: {
            color: values,
            colorscale: 'Viridis',
            cmin: Math.min(...values),
            cmax: Math.max(...values),
          },
        };

        setTrace(trace);
      });
  }, [dataset]);

  return (
    <div>
      <Plot
        data={trace ? [trace] : []}
        layout={{ title: 'Histogram of Train Metadata' }}
      />
    </div>
  );
};

export default HistogramComponent;