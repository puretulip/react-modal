import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import ModalComponent from './ModalComponent';
import HistogramComponent from './HistogramComponent';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isHistogramModalVisible, setIsHistogramModalVisible] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState<string | null>(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showHistogramModal = () => {
    setIsHistogramModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRadio(null); // Reset selectedRadio state
  };

  const handleHistogramModalCancel = () => {
    setIsHistogramModalVisible(false);
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
          <HistogramComponent dataset="train_metadata"/>
        </Modal>
      </header>
    </div>
  );
}

export default App;