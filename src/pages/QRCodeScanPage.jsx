import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCodeScanner from '../components/QRCodeScanner';
import './QRCodeScanPage.css'; // 스타일을 위한 CSS 파일 추가

const QRCodeScanPage = () => {
    const navigate = useNavigate();
    const [scanning, setScanning] = useState(false);
    const [result, setResult] = useState(null);

    const handleScan = (result) => {
        if (result) {
            setScanning(false);
            setResult(result);
            console.log(result);
            alert("Scan successful!");
            // 스캔 결과 처리 로직을 추가할 수 있습니다.
        }
    };

    const handleError = (error) => {
        console.error("QR Code Scan Error: ", error);
        setScanning(false);
        alert("Scan failed! Please try again.");
    };

    const handleStartScan = () => {
        setScanning(true);
        setResult(null);
    };

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="scan-page">
            <h2>Scan QR Code</h2>
            <p>Align the QR code within the frame to scan.</p>
            <div className="scanner-container">
                {scanning ? (
                    <>
                        <QRCodeScanner onScan={handleScan} onError={handleError} />
                        <div className="scanner-overlay">
                            <div className="scanner-animated-border"></div>
                        </div>
                    </>
                ) : (
                    <div className="start-scan-message">
                        {result ? (
                            <div className="scan-result">
                                <h3>Scan Result:</h3>
                                <p>{result}</p>
                                <button onClick={handleStartScan}>Scan Again</button>
                            </div>
                        ) : (
                            <button onClick={handleStartScan}>Start Scanning</button>
                        )}
                    </div>
                )}
            </div>
            <button onClick={handleGoHome}>홈으로 가기</button>
        </div>
    );
};

export default QRCodeScanPage;

