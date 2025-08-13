import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("login_email");
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      setMessage("No email found. Please go back and enter your email.");
    }
  }, []);

  const handleVerify = async () => {
    setMessage("Verifying...");
    try {
      const res = await fetch("http://localhost:8000/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, otp_code: otp }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.removeItem("login_email"); // optional but need 
        setMessage("Login successful");
        navigate("/dashboard"); //  Redirect to dashboard apge
      } else {
        if(data.status === "invalid_otp"){
          setMessage("Invalid OTP");
        } else if (data.status === "expired"){
          setMessage(data.message);
        } else{
          setMessage("Something went wrong");
        }
      }
    } catch (err) {
      setMessage("Server error");
    }
 };
    const handleResendOtp = async () => {
      setMessage("Verifying again...")
  try {
    const res = await fetch("http://localhost:8000/api/resend-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMessage(data.message);

  } catch (error) {
    console.error(error);
    setMessage("Failed to resend OTP");
  }
};
 

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
      <input
        type="text"
        className="border px-4 py-2 rounded mb-2 w-64"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <div className="flex gap-2">

     
      <button
        onClick={handleVerify}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Verify OTP
      </button>
      <button
      onClick={handleResendOtp}
      className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Resend Otp
      </button>
       </div>
      {message && <p className="mt-2 text-red-600 text-sm">{message}</p>}
    </div>
  );
};

export default VerifyOtpPage;
