import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import ValidIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import InvalidIcon from '@mui/icons-material/CancelOutlined';
import QrReader from 'react-qr-scanner'
import Spinner from '../utils/spinner';
import { Center } from '../utils/center';

interface scanData {
    text: string
    canvas: object
    format: number
    numBits: number
    rawBytes: any
    resultMetadata: any
    timestamp: any
    resultPoints: any
}

export const ScanEvent = () => {
    const { eventId } = useParams()
    const [delay, setDelay] = useState(100)
    const [isValidating, setIsValidating] = useState(false)
    const [isValid, setIsValid] = useState(false)
    const [showIsValid, setShowIsValid] = useState(false)
    // const [result, setResult] = useState<scanData | null>(null)

    const handleScan = (data: scanData) => {
        if (data) {
            console.log(data.text)
            setIsValidating(true)

            const scanResult = data

            // validate in server
            if (data.text) {
                setShowIsValid(true)
                setTimeout(() => setShowIsValid(false), 10000);
                setIsValid(true)
            }

            setIsValidating(false)
        }
    }
    const handleError = (err: object) => {
        console.error(err)
    }

    return (
        isValidating ?
            <Spinner />
            :
            <Center>
                <QrReader
                    style={{ width: '20em', height: '20em' }}
                    delay={delay}
                    onError={handleError}
                    onScan={handleScan}
                />

                {isValidating ?
                    <Spinner />
                    :
                    showIsValid &&
                    <Box sx={{ color: isValid ? 'success.main' : "error.main" }}>
                        <Center>
                            {isValid ?
                                <>
                                    <ValidIcon sx={{ fontSize: '10rem' }} />
                                    <Typography variant="h1">
                                        Valid
                                    </Typography>
                                </>
                                :
                                <>
                                    <InvalidIcon sx={{ fontSize: '10rem' }} />
                                    <Typography variant="h1">
                                        Not Valid
                                    </Typography>
                                </>
                            }
                        </Center>
                    </Box>
                }
            </Center>
    );
}

export default ScanEvent;