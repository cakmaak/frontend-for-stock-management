// src/pages/Login.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, getuser } from "../slices/UserSlice";
import { useNavigate } from "react-router-dom";
import '../css/login.css';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(login({ email, password }));
      if (login.fulfilled.match(resultAction)) {
        await dispatch(getuser());
        navigate("/"); 
      } else {
        alert("Giriş başarısız: " + resultAction.payload);
      }
    } catch (error) {
      console.error("Login hatası:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Giriş Yap</h2>
        <h1 style={{fontSize:"20px"}}>email:larem@gmail.com
          password:cakmaaq00Y
        </h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email giriniz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Şifre</label>
            <input
              type="password"
              placeholder="Şifrenizi giriniz"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
