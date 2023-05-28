import { graphql } from "../graphql";
import { useQuery } from "urql";
import { Exact, ThirdPartyTicket } from "../graphql/graphql";
import { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import ValidIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import InvalidIcon from "@mui/icons-material/CancelOutlined";
import Spinner from "../utils/spinner";
import { Center } from "../utils/center";
import { QrReader } from "react-qr-reader";

export const ImportTicket = () => {
  const [code, setCode] = useState("");
  const [showIsValid, setShowIsValid] = useState(false);

  const VALIDATE_TICKET_QUERY = graphql(`
    query validateTicketAndImport($id: String) {
      validateTicketAndImport(id: $id) {
        eventName
        id
        ownerEmail
        price
        qrCodeId
      }
    }
  `);

  const [{ data: isValidData, fetching: fetchingIsVallid }] = useQuery<{
    validateTicket: Exact<ThirdPartyTicket>;
  }>({
    query: VALIDATE_TICKET_QUERY,
    variables: {
      id: code,
    },
    pause: !code?.length,
  });

  const handleScan = (result: any) => {
    if (result) {
      console.log("scaned: ", result?.text);
      setCode(result?.text);
    }
  };

  useEffect(() => {
    if (!isValidData) return;

    setShowIsValid(true);
    setCode("");
  }, [isValidData]);

  useEffect(() => {
    showIsValid && setTimeout(() => setShowIsValid(false), 3000);
  }, [showIsValid]);

  const renderIsValidTicket = () => {
    if (fetchingIsVallid) return <Spinner />;

    if (!showIsValid) return <></>;

    return (
      <Box
        sx={{
          color: isValidData?.validateTicket.id ? "success.main" : "error.main",
        }}
      >
        <Center>
          {isValidData?.validateTicket.id ? (
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
    );
  };

  return (
    <Center>
      <QrReader
        onResult={handleScan}
        constraints={{ facingMode: "user" }}
        videoContainerStyle={{
          width: "20rem",
          height: "20rem",
        }}
      />
      {renderIsValidTicket()}
    </Center>
  );
};

export default ImportTicket;
