import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ValidIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import InvalidIcon from "@mui/icons-material/CancelOutlined";
import { BrowserQRCodeReader } from "@zxing/library";
import Spinner from "../utils/spinner";
import { Center } from "../utils/center";
import { graphql } from "../graphql";
import { useQuery } from "urql";
import { Exact, ThirdPartyTicket } from "../graphql/graphql";

export const ImportTicket = () => {
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [code, setCode] = useState({});
  const [videoInputDevices, setVideoInputDevices] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [showIsValid, setShowIsValid] = useState(false);

  const codeReader = new BrowserQRCodeReader();

  const VALIDATE_TICKET_QUERY = graphql(`
    query validateTicket($id: String) {
      validateTicket(id: $id) {
        eventName
        id
        ownerEmail
        price
        qrCodeId
        seat
      }
    }
  `);

  const [{ data = { validateTicket: {} }, fetching }] = useQuery<{
    validateTicket: Exact<ThirdPartyTicket>;
  }>({
    query: VALIDATE_TICKET_QUERY,
    variables: code,
    pause: true,
  });

  function setupDevices(videoInputDevices) {
    // selects first device
    setSelectedDeviceId(videoInputDevices[0].deviceId);

    // setup devices dropdown
    if (videoInputDevices.length >= 1) {
      setVideoInputDevices(videoInputDevices);
    }
  }

  function decodeContinuously(selectedDeviceId) {
    codeReader.decodeFromInputVideoDeviceContinuously(
      selectedDeviceId,
      "video",
      (result, err) => {
        if (result) {
          // properly decoded qr code
          console.log("Found QR code!", result);
          setCode({ id: result.getText() });
        }

        if (err) {
          setCode({});
        }
      }
    );
  }

  useEffect(() => {
    codeReader
      .getVideoInputDevices()
      .then((videoInputDevices) => {
        setupDevices(videoInputDevices);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    codeReader;
    decodeContinuously(selectedDeviceId);
    console.log(`Started decode from camera with id ${selectedDeviceId}`);
  }, [selectedDeviceId]);

  useEffect(() => {
    console.log(data?.validateTicket);
    if (data?.validateTicket?.id) {
      setIsValid(true);
      setShowIsValid(true);
      setTimeout(() => setShowIsValid(false), 3000);
    }
  }, [code]);

  // useEffect(() => {
  //   if (code) {
  //     // validate in server
  //     console.log("validating");
  //     reexecuteQuery({ requestPolicy: "network-only" });
  //   }
  // }, [code, reexecuteQuery]);

  return (
    <Center>
      {fetching ? (
        <Spinner />
      ) : (
        <>
          <div style={{ visibility: showIsValid ? "hidden" : "visible" }}>
            <video id="video" width="300" height="200" />
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
