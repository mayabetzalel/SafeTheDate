import React, { useState, useEffect } from "react"
import { graphql } from "../graphql"
import QRCode from 'qrcode'
import { useMutation } from "urql"
import { useAuth } from "../hooks/userController/userContext"  
import { InputTicket, MutationResponse, Ticket } from "../graphql/graphql"
import { useSnackbar } from "notistack"
import { useNavigate } from "react-router-dom"
/* eslint-disable no-debugger */

const CREATE_TICKET_MUTATION = graphql(`
  mutation CreateTicket($inputTicket: InputTicket!) {
    createTicket(inputTicket: $inputTicket) {
      message
      code
    }
  }
`)

export const CreateTicket = () => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  debugger
  console.log("111111111111111111111111111")
  debugger
  //  const { currentUser } = useAuth()
  //  console.log(currentUser)

    console.log("0000000000000000000")
    debugger
    const [CreateTicketResult, CreateTicket] = useMutation<
        {
            CreateTicket: MutationResponse
        },
        { inputTicket: InputTicket }
      >(CREATE_TICKET_MUTATION)

    debugger
    // if(currentUser) {
    //   let qrCodeValue = ""
    //   console.log("the current user: " + currentUser)
    //   if(currentUser) {
    //     qrCodeValue = "UserId: " + currentUser["_id"] + "eventId: " 
    //     console.log("the qr code " + qrCodeValue)
    //   }
      QRCode.toString("value", {
      errorCorrectionLevel: 'H',
      type: 'svg'
      }, function(err, data) {
        debugger
          if (err) throw err
          console.log(data)
          CreateTicket(data).then((result) => {
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
  // })
}


export default CreateTicket