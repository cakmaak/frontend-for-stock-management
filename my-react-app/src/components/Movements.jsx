import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallstockhistory, deletestockhistory } from "../slices/StockSlice";
import "../css/movements.css";

function Movements() {
  const dispatch = useDispatch();
  const { stockhistory = [], loading } = useSelector((state) => state.stockhistory);
  const user = useSelector((state) => state.user.user); // Giriş yapan kullanıcı

  useEffect(() => {
    dispatch(getallstockhistory());
  }, [dispatch]);

  console.log("Giriş yapan user:", user);

  const handleDelete = (id) => {
    if (window.confirm("Bu hareketi silmek istediğinize emin misiniz?")) {
      dispatch(deletestockhistory({ id }));
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Yükleniyor...</p>;

  return (
    <div className="movements-container">
      <h2>Stok Hareketleri</h2>
      <div className="table-wrapper">
        <div className="table-header">
          <span>ID</span>
          <span>Ürün İsmi</span>
          <span>Miktar</span>
          <span>Tarih</span>
          <span>Kullanıcı</span>
          <span>İşlem</span>
        </div>

        {stockhistory.map((item) => {
          console.log("user id:", user.id || user.Id);
          console.log("item.user id:", item.user.id || item.user.Id);

          return (
            <div className="table-row" key={item.id}>
              <span>{item.id}</span>
              <span>{item.product?.isim || "Bilinmiyor"}</span>
              <span className={item.eklenenmiktar < 0 ? "negative" : "positive"}>
                {item.eklenenmiktar}
              </span>
              <span>
                {item.oluşturmatarihi
                  ? new Date(item.oluşturmatarihi.split(".")[0]).toLocaleString()
                  : "Bilinmiyor"}
              </span>
              <span>{item.user?.isim || "Bilinmiyor"}</span>
              <span>
                {user && item.user && Number(user.id || user.Id) === Number(item.user.id || item.user.Id) && (
                  <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                    ✖
                  </button>
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Movements;
