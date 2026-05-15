import React, { useEffect, useState } from "react";
import Axios from "../../../utils/Axios";
import SummaryApi from "../../../common/SummaryApi";
import { Badge, Table } from "react-bootstrap";
import { MdRefresh } from "react-icons/md";

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyOrders = async () => {
    setLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.getMyOrders
      });
      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <div className="container-fluid px-0">
      <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
        <h4 className="fw-bold mb-0">My Orders</h4>
        <button onClick={fetchMyOrders} className="btn btn-outline-success btn-sm d-flex align-items-center gap-2 rounded-pill px-3">
          <MdRefresh /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="text-center py-5">
           <div className="spinner-border text-success" role="status"></div>
           <p className="mt-2 text-muted">Loading your orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-5">
          <img src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png" alt="no-orders" height="120" className="opacity-25 mb-3" />
          <h5 className="text-muted">No orders yet</h5>
          <p className="small text-muted">Looks like you haven't placed any orders.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <Table hover className="align-middle border-0">
            <thead className="table-light border-0">
              <tr>
                <th className="border-0">ORDER</th>
                <th className="border-0">ITEMS</th>
                <th className="border-0">AMOUNT</th>
                <th className="border-0">STATUS</th>
                <th className="border-0">DATE</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-bottom">
                  <td><span className="fw-bold">#{order._id.slice(-6).toUpperCase()}</span></td>
                  <td>{order.totalItems} Items</td>
                  <td className="fw-bold">₹{order.totalAmount}</td>
                  <td>
                    <Badge bg={order.payment?.status === "paid" ? "success" : "warning"} className="px-3 py-2 rounded-pill">
                      {order.payment?.status || "pending"}
                    </Badge>
                  </td>
                  <td className="text-muted small">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default CustomerOrders;
