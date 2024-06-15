import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { Card } from 'antd';

function Histogram() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Load data from JSON file
        fetch('histogram.json')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    return (
        <Card style={{ width: '100%' }}>
            <Plot
                data={[
                    {
                        x: data.map(item => item.label),
                        y: data.map(item => item.value),
                        type: 'bar',
                    },
                ]}
                layout={{width: '100%', height: 600}}
            />
        </Card>
    );
}

export default Histogram;