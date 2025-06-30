import React, { useState } from 'react';
import './ForgotPassword.css';
import { useNavigate } from 'react-router-dom';


function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (!email) return alert("Enter your email first.");
    // Simulate sending OTP
    console.log(`Sending OTP to ${email}`);
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    // Simulate OTP verification
    if (otp.length !== 6) return alert("OTP must be 6 digits.");
    console.log(`Verifying OTP ${otp} for ${email}`);
    navigate('/home');
  };

  return (
    <div className="forgot-container">
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your registered email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {!otpSent ? (
        <button onClick={handleSendOtp}>Send OTP</button>
      ) : (
        <>
          <input
            type="text"
            maxLength={6}
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </>
      )}
    </div>
  );
}

export default ForgotPassword;
