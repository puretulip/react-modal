import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { Card } from 'antd';

interface HistogramComponentProps {
  dataset: string;
}

const HistogramComponent: React.FC<HistogramComponentProps> = ({ dataset }) => {
  const [metadataValues, setMetadataValues] = useState<number[]>([]);

  useEffect(() => {
    // Load data from the selected dataset
    fetch(`${dataset}.json`)
      .then(response => response.json())
      .then(data => {
        const values = Object.values(data.metadata);
        setMetadataValues(values);
      });
  }, [dataset]);

  return (
    <div>
      <Plot
        data={[
          {
            x: metadataValues,
            type: 'histogram',
          },
        ]}
        layout={{ title: 'Histogram of Train Metadata' }}
      />
    </div>
  );
};

export default HistogramComponent;