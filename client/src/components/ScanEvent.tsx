import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import ValidIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import InvalidIcon from '@mui/icons-material/CancelOutlined';
import {
    BrowserQRCodeReader,
    NotFoundException,
    ChecksumException,
    FormatException
} from "@zxing/library";
import Spinner from '../utils/spinner';
import { Center } from '../utils/center';


export const ScanEvent = () => {
    const [selectedDeviceId, setSelectedDeviceId] = useState("");
    const [code, setCode] = useState("");
    const [videoInputDevices, setVideoInputDevices] = useState([]);

    const [isValidating, setIsValidating] = useState(false)
    const [isValid, setIsValid] = useState(false)
    const [showIsValid, setShowIsValid] = useState(false)

    const codeReader = new BrowserQRCodeReader();

    useEffect(() => {
        codeReader
            .getVideoInputDevices()
            .then(videoInputDevices => {
                setupDevices(videoInputDevices);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    function setupDevices(videoInputDevices) {

        // selects first device
        setSelectedDeviceId(videoInputDevices[0].deviceId);

        // setup devices dropdown
        if (videoInputDevices.length >= 1) {
            setVideoInputDevices(videoInputDevices)
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
                    setCode(result.getText());
                }

                if (err) {
                    setCode("");

                    // As long as this error belongs into one of the following categories
                    // the code reader is going to continue as excepted. Any other error
                    // will stop the decoding loop.
                    //
                    // Excepted Exceptions:
                    //
                    //  - NotFoundException
                    //  - ChecksumException
                    //  - FormatException

                    // if (err instanceof NotFoundException) {
                    //     console.log("No QR code found.");
                    // }

                    // if (err instanceof ChecksumException) {
                    //     console.log("A code was found, but it's read value was not valid.");
                    // }

                    // if (err instanceof FormatException) {
                    //     console.log("A code was found, but it was in a invalid format.");
                    // }
                }
            }
        );
    }

    useEffect(() => {
        codeReader
        decodeContinuously(selectedDeviceId);
        console.log(`Started decode from camera with id ${selectedDeviceId}`);
    }, [selectedDeviceId]);

    useEffect(() => {
        if (code) {
            setIsValidating(true)

            // validate in server
            let valid = true

            setShowIsValid(true)
            setTimeout(() => setShowIsValid(false), 5000);
            setIsValid(valid)

            setIsValidating(false)
        }
    }, [code]);

    return (
        <Center>
            {isValidating ?
                <Spinner />
                :
                <>
                    {showIsValid ?
                        <Box sx={{ color: isValid ? 'success.main' : "error.main" }}>
                            <Center>
                                {isValid ?
                                    <>
                                        <ValidIcon sx={{ fontSize: '10rem' }} />
                                        <Typography variant="h1">
                                            Valid
                                        </Typography>
                                    </>
                                    :
                                    <>
                                        <InvalidIcon sx={{ fontSize: '10rem' }} />
                                        <Typography variant="h1">
                                            Not Valid
                                        </Typography>
                                    </>
                                }
                            </Center>
                        </Box>
                        :
                        <div>
                            <video id="video" width="300" height="200" />
                        </div>
                    }
                </>
            }
        </Center>
    );
}

export default ScanEvent;