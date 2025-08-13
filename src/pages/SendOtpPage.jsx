import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SendOtpPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSendCode = async () => {
    setMessage("Sending OTP...");
    try {
      const res = await fetch("http://localhost:8000/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("login_email", email); //save Email in local
        setTimeout(() => {
          navigate("/verify");
        }, 1000);
      } else {
        setMessage("Sorry: " + data.message);
      }
    } catch (error) {
      setMessage("Server Error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Login with Email</h2>
      <input
        type="email"
        className="border px-4 py-2 rounded mb-2 w-64"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={handleSendCode}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Send Code
      </button>
      <p>Account have? {''}
        <Link to="/">
          SignUp
        </Link>
      </p>
      {message && <p className="mt-2 text-red-600 text-sm">{message}</p>}
    </div>
  );
};

export default SendOtpPage;
