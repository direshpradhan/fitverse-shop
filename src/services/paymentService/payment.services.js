import axios from "axios";
import {
  API_URL,
  RAZORPAY_CHECKOUT_API,
  RAZORPAY_KEY_ID,
} from "../../util/Constants";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export const PaymentService = async (
  totalBillAmount,
  user,
  setPaymentStatus
) => {
  const res = await loadScript(`${RAZORPAY_CHECKOUT_API}`);
  if (!res) {
    return alert("Razorpay SDK failed to load. Are you online?");
  }

  console.log(totalBillAmount);
  const order = await axios.post(`${API_URL}/payment/orders`, {
    totalBillAmount,
  });
  if (!order) {
    return alert("Server error. Are you online?");
  }

  const { amount, id: order_id, currency } = order.data.order;

  const options = {
    key: `${RAZORPAY_KEY_ID}`,
    amount: amount.toString(),
    currency: currency,
    name: "Fitverse Shop",
    description: "Test Transaction",
    order_id: order_id,
    handler: async function (response) {
      const data = {
        orderCreationId: order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpayOrderId: response.razorpay_order_id,
        razorpaySignature: response.razorpay_signature,
      };

      const result = await axios.post(`${API_URL}/payment/success`, data);
      console.log(result);
      alert(result.data.message);
      setPaymentStatus((status) => result.data.message);
    },
    prefill: {
      name: user.name,
      email: user.email,
      contact: "9999999999",
    },
    notes: {
      address: "India",
    },
    theme: {
      color: "#61dafb",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
  if (paymentObject) {
    console.log(paymentObject);
    return "success";
  } else {
    return "failed";
  }
};
