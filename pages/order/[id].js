import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useReducer } from "react";
import { getError } from "../../utils/getError";
import Image from "next/image";
import { toast } from "react-toastify";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false, errorPay: action.payload };
    case "PAY_FAIL":
      return { ...state, loadingPay: false, successPay: false, errorPay: "" };
    default:
      state;
  }
}

export default function OrderDetails() {
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { query } = useRouter();
  const orderId = query.id;

  const [{ loading, order, error, successPay, loadingPay }, dispatch] =
    useReducer(reducer, {
      loading: true,
      order: {},
      error: "",
    });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    if (!order._id || successPay || (order._id && order._id !== orderId)) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: "PAY_RESET" });
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get("/api/keys/paypal");
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      loadPaypalScript();
    }
  }, [order, orderId, paypalDispatch]);

  const {
    shippingAddress,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isDelivered,
    deliveredAt,
    isPaid,
    paidAt,
  } = order;

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: "PAY_REQUEST" });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details
        );
      } catch (err) {
        dispatch({ type: "PAY_FAIL", payload: getError(err) });
      }
    });
  }

  function onError(err) {
    toast.error(getError(err));
  }
  return (
    <div>
      <h1>Order ${order._id}</h1>
      {loading ? (
        <div>Loading</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className='grid md:grid-cols-2 gap-5'>
          <div className='w-full'>
            <div className=' rounded-md shadow-2xl mt-3 p-3'>
              <h1 className='font-semibold'>Shipping Address</h1>
              <div className='py-2 text-[18px]'>
                {shippingAddress.fullName},{shippingAddress.address},
                {shippingAddress.city},{shippingAddress.postalCode},
                {shippingAddress.country}
              </div>
              <div>
                {isDelivered ? (
                  <div className='bg-green-400 text-green-900'>
                    Delivered at {deliveredAt}
                  </div>
                ) : (
                  <div className='bg-red-500 text-red-900'>Not Delivered</div>
                )}
              </div>
              <div>
                <h1>Payment Method </h1>
                {isPaid ? (
                  <div className='bg-green-400 text-green-900'>
                    Paid at {paidAt}
                  </div>
                ) : (
                  <div className='bg-red-500 text-red-900'>Not Paid</div>
                )}
              </div>
            </div>
            <div className=' rounded-md shadow-2xl mt-3 p-3'>
              <h1 className='text-lg'>Order Items</h1>
              <table className='min-w-full'>
                <thead>
                  <tr>
                    <th className='text-left'>Item</th>
                    <th className='text-right'>Quantity</th>
                    <th className='text-right'>Price</th>
                    <th className='text-right'>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item) => (
                    <tr key={item._id} className='border-b'>
                      <td>
                        <a className='flex items-center'>
                          <Image
                            src={item.picture}
                            height='50'
                            width='50'
                            alt='product'
                          />
                          &nbsp;{item.name}
                        </a>
                      </td>
                      <td className='text-right'>{item.quantity}</td>
                      <td className='text-right'>{item.price}</td>
                      <td className='text-right'>
                        ${item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className='max-w-sm w-full rounded-2xl shadow-xl p-4'>
            <h1>Order Summary</h1>
            <ul>
              <li className='flex justify-between'>
                <div>Items</div>
                <div>${itemsPrice}</div>
              </li>
              <li className='flex justify-between'>
                <div>Tax</div>
                <div>${taxPrice}</div>
              </li>
              <li className='flex justify-between'>
                <div>Shipping</div>
                <div>${shippingPrice}</div>
              </li>
              <li className='flex justify-between'>
                <div>Total Price</div>
                <div>${totalPrice}</div>
              </li>
              {!isPaid && (
                <li>
                  {isPending ? (
                    <div>Loading...</div>
                  ) : (
                    <div className='w-full'>
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      ></PayPalButtons>
                    </div>
                  )}
                  {loadingPay && <div>Loading...</div>}
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

OrderDetails.auth = true;
