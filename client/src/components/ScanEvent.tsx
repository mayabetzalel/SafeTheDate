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

    return (

        <QrReader

        />


    );
}

export default ScanEvent;