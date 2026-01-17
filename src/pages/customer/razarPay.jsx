import React from "react";

const PaymentButton = ({ amount, userId }) => {

  const loadRazorpay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = handlePayment;
    document.body.appendChild(script);
  };

  const handlePayment = async () => {
    try {
      // 1️⃣ Create order on backend
      const res = await fetch("http://localhost:5000/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, userId }),
      });
      const data = await res.json();
      const order = data.order;

      // 2️⃣ Razorpay options
      const options = {
        key: "RAZORPAY_KEY_ID", // Replace with your test key
        amount: order.amount,
        currency: order.currency,
        name: "My Company",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (response) {
          // 3️⃣ Verify payment on backend
          const verifyRes = await fetch(
            "http://localhost:5000/api/payment/verify-payment",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            }
          );
          const result = await verifyRes.json();
          alert(result.message);
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
      alert("Payment failed to initiate");
    }
  };

  return <button onClick={loadRazorpay}>Pay ₹{amount}</button>;
};

export default PaymentButton;
