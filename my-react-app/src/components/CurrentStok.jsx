import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallproducts } from "../slices/ProductSlice";
import "../css/currentstok.css"; 


function CurrentStok() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);
  

  useEffect(() => {
    dispatch(getallproducts());
    
  }, [dispatch]);

  return (
    <div className="stok-container">
      <h2>📦 Mevcut Stok Durumu</h2>

      {loading && <p>Yükleniyor...</p>}

      <div className="table-wrapper">
        <table className="stok-table">
          <thead>
            <tr>
              <th>Ürün ID</th>
              <th>Ürün İsmi</th>
              <th>Miktar</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.isim}</td>
                  <td>{product.miktar > 0 ? product.miktar : 0}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">Henüz ürün bulunamadı</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CurrentStok;
