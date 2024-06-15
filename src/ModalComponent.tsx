import React, { useState } from 'react';
import { Modal, Radio, Button } from 'antd';
import Histogram from './Histogram';

function ModalComponent({ isModalVisible, handleCancel, selectedDataset, handleDatasetChange }) {
    const [step, setStep] = useState(0);

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    return (
        <Modal title="Select Dataset" visible={isModalVisible} onCancel={handleCancel} footer={null} width={800}>
            {step === 0 ? (
                <Radio.Group onChange={handleDatasetChange}>
                    <Radio value="histogram">MNIST Dataset</Radio>
                    <Radio value="dataset2">Dummy Dataset</Radio>
                    // Add more datasets as needed
                </Radio.Group>
            ) : (
                <Histogram dataset={selectedDataset} />
            )}
            {step === 0 ? (
                <Button type="primary" onClick={handleNext}>Next</Button>
            ) : (
                <Button type="primary" onClick={handleBack}>Back</Button>
            )}
        </Modal>
    );
}

export default ModalComponent;