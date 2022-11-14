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
  }, [order, orderId, paypalDispatch, successPay]);

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
    <div className='max-w-screen-xl w-full mx-auto '>
      <h1 className='font-semibold text-[22px] py-4'>Order {order._id}</h1>
      {loading ? (
        <div>Loading</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className='grid md:grid-cols-2 gap-5'>
          <div className='w-full'>
            <div className=' rounded-md shadow-md mt-4 p-3'>
              <h1 className='font-semibold text-[16px]'>Shipping Address</h1>
              <div className='py-2 text-[16px] font-medium'>
                {shippingAddress.fullName},{shippingAddress.address},
                {shippingAddress.city},{shippingAddress.postalCode},
                {shippingAddress.country}
              </div>
              <div>
                {isDelivered ? (
                  <div className='bg-green-400 text-green-900 text-[16px] font-medium p-3 rounded-lg'>
                    Delivered at {deliveredAt}
                  </div>
                ) : (
                  <div className='bg-red-300 text-red-800 text-[16px] font-medium p-3 rounded-lg'>
                    Not Delivered
                  </div>
                )}
              </div>
            </div>
            <div className=' rounded-md shadow-lg mt-6 p-3'>
              <h1 className='font-semibold text-[16px]'>Payment Method </h1>
              <h2 className='py-2 text-[14px]'>PayPal</h2>
              {isPaid ? (
                <div className='bg-green-400 text-green-900 text-[16px] font-medium p-3 rounded-lg'>
                  Paid at {paidAt}
                </div>
              ) : (
                <div className='bg-red-300 text-red-800 text-[16px] font-medium p-3 rounded-lg'>
                  Not Paid
                </div>
              )}
            </div>
            <div className=' rounded-md shadow-md mt-6 p-3'>
              <h1 className='font-semibold text-lg py-2'>Order Items</h1>
              <table className='min-w-full'>
                <thead>
                  <tr>
                    <th className='text-left'>Item</th>
                    <th className='text-center px-2'>Quantity</th>
                    <th className='text-center px-2'>Price</th>
                    <th className='text-center'>Subtotal</th>
                  </tr>
                </thead>
                <tbody className='py-1'>
                  {orderItems.map((item) => (
                    <tr key={item._id} className='border-b'>
                      <td className='py-2'>
                        <a className='flex items-center gap-2'>
                          <Image
                            src={item.picture}
                            height='50'
                            width='50'
                            alt='product'
                          />
                          &nbsp;{item.name}
                        </a>
                      </td>
                      <td className='text-center'>{item.quantity}</td>
                      <td className='text-center'>${item.price}</td>
                      <td className='text-center'>
                        ${item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className='max-w-sm w-full rounded-2xl shadow-lg p-3 min-h-[400px]'>
            <h1 className='py-2 font-semibold text-[18px]'>Order Summary</h1>
            <ul className='font-medium text-[17px]'>
              <li className='flex justify-between mb-1'>
                <div>Items</div>
                <div>${itemsPrice}</div>
              </li>
              <li className='flex justify-between mb-1'>
                <div>Tax</div>
                <div>${taxPrice}</div>
              </li>
              <li className='flex justify-between mb-1'>
                <div>Shipping</div>
                <div>${shippingPrice}</div>
              </li>
              <li className='flex justify-between mb-1 font-semibold'>
                <div>Total Price</div>
                <div>${totalPrice}</div>
              </li>
              {!isPaid && (
                <li className='mt-4'>
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
