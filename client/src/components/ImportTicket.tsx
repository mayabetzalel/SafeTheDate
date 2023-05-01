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

  return (
    <div>import ticket</div>
  );
}

export default ImportTicket;