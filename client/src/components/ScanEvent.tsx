import { useState, useEffect } from "react"
import { Box, Typography } from "@mui/material"
import ValidIcon from "@mui/icons-material/CheckCircleOutlineOutlined"
import InvalidIcon from "@mui/icons-material/CancelOutlined"
import Spinner from "../utils/spinner"
import { Center } from "../utils/center"
import { useParams } from "react-router-dom"
import { graphql } from "../graphql"
import { useQuery } from "urql"
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

  const [{ data: isValidData, fetching: fetchingIsVallid }] = useQuery<{
    isValid: boolean
  }>({
    query: VALIDATE_TICKET_QUERY,
    variables: { eventId: id, barcode: code },
    pause: !code?.length
  })

  const handleScan = (result: any) => {
    if (result) {
      console.log("scaned: ", result?.text)
      setCode(result?.text)
    }
  }

  useEffect(() => {
    if (!isValidData) return;

    setShowIsValid(true)
    setCode('')
  }, [isValidData])

  useEffect(() => {
    showIsValid &&
      setTimeout(() => setShowIsValid(false), 3000);
  }, [showIsValid]);

  const renderIsValidTicket = () => {
    if (fetchingIsVallid) return <Spinner />

    if (!showIsValid) return <></>;

    return <Box sx={{ color: isValidData?.isValid ? "success.main" : "error.main" }}>
      <Center>
        {isValidData?.isValid ? (
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
  }

  return (
    <Center>
      <QrReader
        onResult={handleScan}
        constraints={{ facingMode: 'user' }}
        videoContainerStyle={{
          width: '20rem', height: "20rem",
        }}
      />
      {renderIsValidTicket()}
    </Center >
  )
}

export default ScanEvent;
