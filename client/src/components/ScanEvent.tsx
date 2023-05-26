import React, { useState, useEffect, useRef } from "react"
import { Box, Typography } from "@mui/material"
import ValidIcon from "@mui/icons-material/CheckCircleOutlineOutlined"
import InvalidIcon from "@mui/icons-material/CancelOutlined"
import {
  BrowserQRCodeReader,
} from "@zxing/browser"
import Spinner from "../utils/spinner"
import { Center } from "../utils/center"
import { useParams } from "react-router-dom"
import { graphql } from "../graphql"
import { useQuery } from "urql"
import { Event, Exact } from "../graphql/graphql"
import FetchingState from "../utils/fetchingState"
import { async } from "q"
import { Code } from "@mui/icons-material"

import { QrReader } from 'react-qr-reader';

const VALIDATE_TICKET_QUERY = graphql(`
  query isVallid($eventId: String!, $barcode: String!) {
    isVallid(eventId: $eventId, barcode: $barcode)
  }
`);

export const ScanEvent = () => {
  const { id = "" } = useParams()
  const [code, setCode] = useState("")
  const [showIsValid, setShowIsValid] = useState(false)

  // const [data, setData] = useState('No result');

  const videoRef = useRef<any>();

  const [{ data: isValid, fetching: fetchingIsVallid }, reexecuteQuery] = useQuery<{
    isValid: boolean
  }>({
    query: VALIDATE_TICKET_QUERY,
    variables: { eventId: id, barcode: code },
    pause: !code?.length
  })

  const handleScan = (result: any, error) => {
    if (result) {
      console.log("scaned: ", result?.text)
      setCode(result?.text)
    }

    if (error) {
      // console.info(error)
    }
  }

  useEffect(() => {
    setShowIsValid(true)
    setCode('')
  }, [isValid])

  useEffect(() => {
    setTimeout(() => setShowIsValid(false), 3000);
  }, [showIsValid]);

  return (
    <Center>
      <div style={{
        width: '20rem', height: "20rem",
      }}>
        <QrReader
          onResult={handleScan}
          constraints={{ facingMode: 'user' }
          }
          videoStyle={{ width: '100%' }}
        />
      </div>
      {fetchingIsVallid ?
        <Spinner /> :
        showIsValid &&
        <Box sx={{ color: isValid ? "success.main" : "error.main" }}>
          <Center>
            {isValid ? (
              <>
                <ValidIcon sx={{ fontSize: "10rem" }} />
                <Typography variant="h1">Valid</Typography>
              </>
            ) : (
              <>
                <InvalidIcon sx={{ fontSize: "10rem" }} />
                <Typography variant="h1">Not Valid</Typography>
              </>
            )}
          </Center>
        </Box>}
    </Center >
  )
}

export default ScanEvent;
