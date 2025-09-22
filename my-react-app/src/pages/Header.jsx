import React, { useEffect, useState } from 'react';
import '../css/header.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { clearSession, getuser } from '../slices/UserSlice';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => setMenuActive(!menuActive);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getuser());
  }, [dispatch]);

  const logout = () => {
    dispatch(clearSession());
    navigate("/login");
  };

  return (
    <div className="header-container">
      <nav className="navbar">
        <a href="/" className="navbar-brand">Stok Takip</a>

        <div className="hamburger" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <ul className={`navbar-nav ${menuActive ? 'active' : ''}`}>
          {/* Kullanıcı login mi kontrolü */}
          {user?.isim ? (
            <li><a href="/profile" style={{color:"blue"}}>{user.isim}</a></li>
          ) : (
            <li><a href="/login">Giriş yap</a></li>
          )}
          <li><a href="/add">Ürün ekle</a></li>
          <li><a href="/sub">Ürün çıkart</a></li>
          <li><a href="/curstok">Mevcut stok</a></li>
          <li><a href="/mov">Hareketler</a></li>
          <li><a href="/dashboard">Canlı Analiz</a></li>
          

          

          <li>
            <a href="https://www.instagram.com/lattefotografcafe/" target="_blank">
              LATTE FOTOĞRAF CAFE
            </a>
          </li>

          {/* Sadece kullanıcı login ise logout göster */}
          {user?.isim && (
            <li>
              <button className="logout-btn" onClick={logout}>Çıkış Yap</button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Header;
