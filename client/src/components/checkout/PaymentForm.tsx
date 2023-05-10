import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSnackbar } from "notistack";
const PaymentForm = ({
  amount,
  description,
}: {
  amount: number;
  description: string;
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [orderID, setOrderID] = useState(false);
  const [success, setSuccess] = useState(false);

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
        setOrderID(orderID);
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      console.log(details);
      const { payer } = details;
      setSuccess(true);
    });
  };

  //capture likely error
  const onError = (err) => {
    enqueueSnackbar("Could not complete tranaction " + err.message, {
      variant: "error",
    });
  };

  useEffect(() => {
    if (success) {
      enqueueSnackbar("Successful transaction! Your order id is: " + orderID, {
        variant: "success",
      });
    }
  }, [success]);

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
  );
};

export default PaymentForm;
