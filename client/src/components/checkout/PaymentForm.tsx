/* eslint-disable no-debugger */
import React, { useState, useEffect } from "react"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { useSnackbar } from "notistack"
import DisplayTicket from "../CreateTicket"
import { useAuth } from "../../hooks/authController/AuthContext"
import { InputTicket, MutationResponse, Ticket, FilterTicketParams } from "../../graphql/graphql"
import { graphql } from "../../graphql"
import { useMutation, useQuery } from "urql"
import _ from 'lodash';

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const LENGTH = 60;
const CREATE_TICKET_MUTATION = graphql(`
  mutation CreateTicket($inputTicket: InputTicket!) {
    createTicket(inputTicket: $inputTicket) {
      message
      code
    }
  }
`)

const DECREASE_TICKET_AMOUNT = graphql(`
mutation decreaseTicketAmount($eventId: String!) {
  decreaseTicketAmount(eventId: $eventId) {
        message
        code
      }
    }
`);

const ALL_SECOND_HAND_TICKETS = graphql(`
  query getAllSecondHandTicketsByEventId($eventId: String!) {
    getAllSecondHandTicketsByEventId(eventId: $eventId)
  }
`);

const GET_EVENT = graphql(`
    query getEvantById($ids: [String]) {
        event(ids: $ids) {
            id
            name
            location
            timeAndDate
            type
            image
            ticketsAmount
        }
    }
`);

const UPDATE_TICKET_TO_FIRST_HAND = graphql(`
  mutation changeSecondHandToFirstHand($filterTicketParams: FilterTicketParams!) {
    changeSecondHandToFirstHand(filterTicketParams: $filterTicketParams) {
      message
      code
    }
  }
`)


function makeId() {
  let result = "";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < LENGTH) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

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
  const [decrease, setDecrease] = useState(false)
  const { currentUser } = useAuth()
  const [ user, setCurrentUser] = useState<any[]>([])
  const [ isShowTicket, setShowTicket ] = useState(false)
  const [ ticketData, setTicketData ] = useState<Partial<InputTicket>>({})
  
  const [CreateTicketResult, CreateTicket] =
  useMutation<
    {
      CreateTicket: MutationResponse
    },
    { inputTicket: InputTicket }
  >(CREATE_TICKET_MUTATION)

  const [deacreaseTicketAmount, setDeacreaseTicketAmount] = 
  useMutation<
    {
      eventId: string
    },
    { }
  >(DECREASE_TICKET_AMOUNT)

  const [updateTicket, updateSecondToFirst] = 
  useMutation<
    {
      updateSecondToFirst: MutationResponse
    },
    { filterTicketParams: FilterTicketParams }
  >(UPDATE_TICKET_TO_FIRST_HAND)

  const url = window.location.href
  const splittedUrl = url.lastIndexOf("/")

  const eventId = url.slice(splittedUrl + 1)
  const [{ data: dataCount = { ticketCount: 0 } }] = useQuery<
  { ticketCount: number }
  >({
    query: ALL_SECOND_HAND_TICKETS,
    variables: { eventId }
  });

  const event = useQuery({
      query: GET_EVENT,
      variables: {
          ids: [eventId!],
      }
  });

  let eventData = event[0].data || {}
  if(event && eventData  && !_.isEqual(eventData, {}) && eventData["event"]) {
    eventData = eventData["event"][0]
  }

  useEffect(() => {
    if(decrease) {
      setDecrease(false)
      const eventId = ticketData.eventId || ""
      setDeacreaseTicketAmount({ eventId }).then((result) => {
        if (result.error)
          console.error("Error creating ticket:", result.error)
      })
    }
  })

  useEffect(() => {
    if(createTicket && currentUser) {
      const inputTicket: InputTicket = {
        _id: "1",   // TODO: remove _id
        userId: currentUser['_id'] || "",
        eventId: eventId,
        isSecondHand: false,
        price: 20,  //TODO: Add price to event and use this price
        barcode: makeId()
      } 
      
      if (dataCount["getAllSecondHandTicketsByEventId"] > eventData["ticketsAmount"] - 1) {
        
        // SecondHandTicket
        updateSecondToFirst({ 
          filterTicketParams: {
            barcode: inputTicket.barcode, 
            eventId: eventId, 
            userId: currentUser['_id']
          }
        })
      } 
      setTicketData(inputTicket)
      setCurrentUser(currentUser || [])
      CreateTicket({ inputTicket }).then((result) => {
        if (result.error) {
          console.error("Error creating ticket:", result.error)
          enqueueSnackbar("An error occurred", { variant: "error" })
        } else {
          setDecrease(true)
          setShowTicket(true)
          enqueueSnackbar("Ticket created successfully", {variant: 'success'})
        }
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
      setCreateTicket(true)
      const { payer } = details
      setSuccess(true)
    })
  }

  //capture likely error
  const onError = (err) => {
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
      {
        isShowTicket?
        <DisplayTicket ticket={ticketData}/>
        : <></>
      }
    </PayPalScriptProvider>
  )
}

export default PaymentForm
