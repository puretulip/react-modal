import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import Histogram from './Histogram';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Button type="primary" onClick={showModal}>
          Open Histogram
        </Button>
        <Modal title="MNIST Data Distribution" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={800}>
          <Histogram />
        </Modal>
      </header>
    </div>
  );
}

export default App;