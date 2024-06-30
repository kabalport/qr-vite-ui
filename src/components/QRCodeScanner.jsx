import QrReader from 'react-qr-scanner';

const QRCodeScanner = ({ onScan }) => {
    const handleScan = (data) => {
        if (data) {
            onScan(data.text);
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    const previewStyle = {
        height: 240,
        width: 320,
    };

    return (
        <QrReader
            delay={300}
            style={previewStyle}
            onError={handleError}
            onScan={handleScan}
        />
    );
};

export default QRCodeScanner;
