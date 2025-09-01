import React, { useState, useEffect } from 'react';
import '../css/add.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { getallproducts } from '../slices/ProductSlice';
import { addslice } from '../slices/AddSlice';

function Sub() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  const [selectedProductId, setSelectedProductId] = useState("");
  const [miktar, setMiktar] = useState("");

  useEffect(() => {
    dispatch(getallproducts());
  }, [dispatch]);

  const handleSubmit = () => {
  const miktarNum = Number(miktar); 
    const data=sessionStorage.getItem("token")
    if (!data) {
      alert("lütfen giriş yapınız")
      return;
      
    }

  if (!selectedProductId || !miktar) {
    alert("Lütfen ürün seçin ve miktar girin");
    return;
  }

  if (miktarNum >= 0) {
    alert("❌ Lütfen çıkarmak istediğiniz ürünün önüne - işareti koyunuz");
    return;
  }

  alert(" Ürün hareketlere eklendi");

  dispatch(addslice({ 
    productid: selectedProductId, 
    eklenenmiktar: miktarNum 
  }));
};

  return (
    <div className="add-product-container">
      <div className="add-product-card">
        <img
          className="logo"
          src="https://res.cloudinary.com/diyibvvua/image/upload/v1756211314/a_logo_design_feat_image__hryso7.jpg"
          alt="Logo"
        />
        <h2>Ürün Çıkart</h2>
        <p>Ürün çıkartmak için Gerekli Alanları Doldurunuz</p>

        <label>Ürün Id:</label>
        <select value={selectedProductId} onChange={(e) => setSelectedProductId(e.target.value)}>
          <option value="">Ürün seçin</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.isim}
            </option>
          ))}
        </select>

        <label>Ürün Miktarı:</label>
        <input
          type="number"
          placeholder="Miktar giriniz"
          value={miktar}
          onChange={(e) => setMiktar(e.target.value)}
        />

        <button onClick={handleSubmit}>Ekle</button>
      </div>
    </div>
  );
}

export default Sub;
