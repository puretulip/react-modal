import React, { useState } from 'react';
import { Button } from 'antd';
import ModalComponent from './ModalComponent';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRadio(null); // Reset selectedRadio state
  };

  const handleDatasetChange = e => {
    setSelectedRadio(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Button type="primary" onClick={showModal}>
          Open Histogram
        </Button>
        <ModalComponent
          isModalVisible={isModalVisible}
          handleCancel={handleCancel}
          selectedDataset={selectedRadio}
          handleDatasetChange={handleDatasetChange}
        />
      </header>
    </div>
  );
}

export default App;