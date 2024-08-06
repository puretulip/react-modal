import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import ModalComponent from './ModalComponent';
import HistogramComponent from './HistogramComponent';
import ScatterPlotComponent from './ScatterPlotComponent';

const App: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isHistogramModalVisible, setIsHistogramModalVisible] = useState(false);
  const [isScatterPlotModalVisible, setIsScatterPlotModalVisible] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState<string>('train_label_metadata');

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showHistogramModal = () => {
    setIsHistogramModalVisible(true);
  };

  const handleHistogramModalCancel = () => {
    setIsHistogramModalVisible(false);
  };

  const showScatterPlotModal = () => {
    setIsScatterPlotModalVisible(true);
  };

  const handleScatterPlotModalCancel = () => {
    setIsScatterPlotModalVisible(false);
  };

  const handleDatasetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRadio(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Button type="primary" onClick={showModal}>
          Open Modal
        </Button>
        <Button type="primary" onClick={showHistogramModal} style={{ marginLeft: '10px' }}>
          Open Histogram
        </Button>
        <Button type="primary" onClick={showScatterPlotModal} style={{ marginLeft: '10px' }}>
          Open Scatter Plot
        </Button>
        <ModalComponent
          isModalVisible={isModalVisible}
          handleCancel={handleCancel}
          selectedDataset={selectedRadio}
          handleDatasetChange={handleDatasetChange}
        />
        <Modal
          title="Histogram"
          visible={isHistogramModalVisible}
          onCancel={handleHistogramModalCancel}
          footer={null}
        >
          <HistogramComponent dataset="train_label_metadata" />
        </Modal>
        <Modal
          title="Scatter Plot"
          visible={isScatterPlotModalVisible}
          onCancel={handleScatterPlotModalCancel}
          footer={null}
        >
          <ScatterPlotComponent dataset="train_features_reduced" labelDataset="train_label_metadata" />
        </Modal>
      </header>
    </div>
  );
}

export default App;