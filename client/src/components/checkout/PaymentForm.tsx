import React, { useState, useEffect } from "react"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { useSnackbar } from "notistack"
// import CreateTicket from "../CreateTicket"
import { useAuth } from "../../hooks/authController/AuthContext"  
/* eslint-disable no-debugger */
import { useNavigate } from "react-router-dom"
import { InputTicket, MutationResponse, Ticket } from "../../graphql/graphql"
import QRCode from 'qrcode'
import { graphql } from "../../graphql"
import { useMutation } from "urql"

const CREATE_TICKET_MUTATION = graphql(`
  mutation CreateTicket($inputTicket: InputTicket!) {
    createTicket(inputTicket: $inputTicket) {
      message
      code
    }
  }
`)

const PaymentForm = ({
  amount,
  description,
}: {
  amount: number
  description: string
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const [orderID, setOrderID] = useState(false)
  const [success, setSuccess] = useState(false)
  const [createTicket, setCreateTicket] = useState(false)
  const navigate = useNavigate()
  const [CreateTicketResult, CreateTicket] = useMutation<
        {
            CreateTicket: MutationResponse
        },
        { inputTicket: InputTicket }
      >(CREATE_TICKET_MUTATION)

  useEffect(() => {
    if(createTicket) {
      debugger;
      QRCode.toString("value", {
        errorCorrectionLevel: 'H',
        type: 'svg'
        }, function(err, data) {
          debugger
            if (err) throw err
          
            const inputTicket: InputTicket = {
              _id: "1",
              userId: "1",
              eventId: "1",
              barcode: data
            }

            console.log(data)
            CreateTicket({ inputTicket }).then((result) => {
              if (result.error) {
                console.error("Error creating ticket:", result.error)
                enqueueSnackbar("An error occurred", { variant: "error" })
              } else {debugger
                navigate("/")
                enqueueSnackbar("Ticket created successfully", {variant: 'success'})
                console.log("tikcet created:" )
              }
            })
        })
        setCreateTicket(false)
      }
  })
  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: description,
            amount: {
              currency_code: "ILS",
              value: amount,
            },
          },
        ],
      })
      .then((orderID) => {
        setOrderID(orderID)
        return orderID
      })
  }

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      console.log("here")
      console.log(details)
      console.log("creating new ticket")
      debugger
      setCreateTicket(true)
      const { payer } = details
      setSuccess(true)
    })
  }

  //capture likely error
  const onError = (err) => {
    debugger
    console.log(err)
    enqueueSnackbar("Could not complete tranaction " + err.message, {
      variant: "error",
    })
  }

  useEffect(() => {
    if (success) {
      enqueueSnackbar("Successful transaction! Your order id is: " + orderID, {
        variant: "success",
      })
    }
  }, [success])

  return (
    <PayPalScriptProvider
      options={{
        "client-id": process.env.REACT_APP_CLIENT_ID as string,
        currency: "ILS",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        onApprove={onApprove}
        onError={onError}
        createOrder={createOrder}
      />
    </PayPalScriptProvider>
  )
}

export default PaymentForm
