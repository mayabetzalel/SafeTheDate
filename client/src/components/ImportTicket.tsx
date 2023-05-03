import { Button, Grid, Paper } from '@mui/material';
import ClearIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import QrReader from 'react-qr-scanner'
import { Box } from '@mui/system';
import { useState } from 'react';
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

export const ImportTicket = () => {
  const [delay, setDelay] = useState(100)
  const [result, setResult] = useState<scanData | null>(null)

  const handleScan = (data: scanData) => {
    console.log(data)
    setResult(data)
  }
  const handleError = (err: object) => {
    console.error(err)
  }

  return (
    <Center>
      <QrReader
        style={{ width: '20em', height: '20em', background: 'pink' }}
        delay={delay}
        onError={handleError}
        onScan={handleScan}
      />
      <p>{result?.text}</p>

      <Button variant="outlined" color="secondary" startIcon={<ClearIcon />}>
        Clear Code
      </Button>

      <Button variant="contained" color="secondary" startIcon={<UploadIcon />}>
        Upload Code
      </Button>

      <Button variant="contained" color="secondary">
        Validate
      </Button>
    </Center>
  );
}

export default ImportTicket;