import React from 'react';
import QRCodeScanner from '../components/QRCodeScanner';

const QRCodeScanPage = () => {
    const handleScan = (result) => {
        console.log(result);
        // 스캔 결과 처리 로직을 추가할 수 있습니다.
    };

    return (
        <div>
            <h2>Scan QR Code</h2>
            <QRCodeScanner onScan={handleScan} />
        </div>
    );
};

export default QRCodeScanPage;
