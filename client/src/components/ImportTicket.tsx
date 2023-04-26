import { Button, Grid, Paper } from '@mui/material';
import ClearIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import QrReader from 'react-qr-scanner'
import { Box } from '@mui/system';
import { useState } from 'react';

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
    <Grid container rowSpacing={2} direction='column' sx={{ placeItems: 'center' }}>

      <Grid item>
        <QrReader
          style={{ width: '20em', height: '20em', background: 'pink' }}
          delay={delay}
          onError={handleError}
          onScan={handleScan}
        />
        <p>{result?.text}</p>
      </Grid>

      <Grid container item spacing={2} direction='row' sx={{ placeItems: 'center' }}>
        <Grid item sx={{ placeItems: 'center' }}>
          <Button variant="outlined" color="secondary" startIcon={<ClearIcon />}>
            Clear Code
          </Button>
        </Grid>

        <Grid item sx={{ placeItems: 'center' }}>
          <Button variant="contained" color="secondary" startIcon={<UploadIcon />}>
            Upload Code
          </Button>
        </Grid>
      </Grid>

      <Grid item justifyContent='center' alignItems='center'>
        <Button variant="contained" color="secondary">
          Validate
        </Button>
      </Grid>
    </Grid>
  );
}

export default ImportTicket;