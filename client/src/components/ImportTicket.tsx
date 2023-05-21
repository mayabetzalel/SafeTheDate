import { graphql } from "../graphql";
import { useQuery } from "urql";
import { Exact, ThirdPartyTicket } from "../graphql/graphql";
import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import ValidIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import InvalidIcon from "@mui/icons-material/CancelOutlined";
import { BrowserQRCodeReader } from "@zxing/browser";
import Spinner from "../utils/spinner";
import { Center } from "../utils/center";
import { useParams } from "react-router-dom";

export const ImportTicket = () => {
  const [code, setCode] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [showIsValid, setShowIsValid] = useState(false);

  const videoRef = useRef<any>();

  const VALIDATE_TICKET_QUERY = graphql(`
    query validateTicket($id: String) {
      validateTicket(id: $id) {
        eventName
        id
        ownerEmail
        price
        qrCodeId
      }
    }
  `);

  const [{ data, fetching }] = useQuery<{
    validateTicket: Exact<ThirdPartyTicket>;
  }>({
    query: VALIDATE_TICKET_QUERY,
    variables: {
      id: code,
    },
  });

  async function decodeContinuously() {
    const codeReader = new BrowserQRCodeReader();

    const videoInputDevices = await BrowserQRCodeReader.listVideoInputDevices();

    // choose your media device (webcam, frontal camera, back camera, etc.)
    const selectedDeviceId = videoInputDevices[0].deviceId;

    codeReader.decodeFromVideoDevice(
      selectedDeviceId,
      videoRef.current,
      (result, err) => {
        if (result) {
          // properly decoded qr code
          console.log("Found QR code!", result);
          setCode(result.getText());
        }
      }
    );
  }

  useEffect(() => {
    decodeContinuously();
  }, []);

  useEffect(() => {
    console.log(data?.validateTicket);
    if (data?.validateTicket?.id) {
      setIsValid(true);
      setShowIsValid(true);
      setTimeout(() => setShowIsValid(false), 3000);
    }
  }, [data]);

  return (
    <Center>
      {/* <h2 style={{ color: "red" }}>{JSON.stringify(data, null, 2)}</h2>
      <h2 style={{ color: "red" }}>{JSON.stringify(code, null, 2)}</h2> */}
      {fetching ? (
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
  );
};

export default ImportTicket;
