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

const VALIDATE_TICKET_QUERY = graphql(`
  query isVallid($eventId: String!, $barcode: String!) {
    isVallid(eventId: $eventId, barcode: $barcode)
  }
`);

export const ScanEvent = () => {
  const { id = "" } = useParams()
  const [code, setCode] = useState("")

  // const [isValidating, setIsValidating] = useState(false)
  // const [isValid, setIsValid] = useState(false)
  const [showIsValid, setShowIsValid] = useState(false)

  const videoRef = useRef<any>();

  const [{ data: isValid, fetching: fetchingIsVallidData }, reexecuteQuery] = useQuery<{
    isValid: boolean
  }>({
    query: VALIDATE_TICKET_QUERY,
    variables: { eventId: id, barcode: code },
  })

  console.log(isValid, fetchingIsVallidData)

  async function decodeContinuously() {
    const codeReader = new BrowserQRCodeReader()

    const videoInputDevices = await BrowserQRCodeReader.listVideoInputDevices();

    // choose your media device (webcam, frontal camera, back camera, etc.)
    const selectedDeviceId = videoInputDevices[0].deviceId;

    codeReader.decodeFromVideoDevice(
      selectedDeviceId,
      videoRef.current,
      (result, err) => {
        if (result) {
          // properly decoded qr code
          console.log("Found QR code!", result)
          result.getText() && setCode(result.getText())
        }
      }
    )
  }

  useEffect(() => {
    decodeContinuously()
  }, [])

  useEffect(() => {
    setTimeout(() => setShowIsValid(false), 3000)
  }, [showIsValid])

  return (
    <Center>
      <h1>{`code : ${code}`}</h1>
      {fetchingIsVallidData ? (
        <Spinner />
      ) : (
        <>
          <div style={{ visibility: showIsValid ? "hidden" : "visible" }}>
            <video ref={videoRef} id="video" width="300" height="200" />
          </div>
          {showIsValid && (
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
            </Box>
          )}
        </>
      )}
    </Center>
  )
}

export default ScanEvent
