import React, { useEffect, useState } from "react";
import Axios from "../../utils/Axios";
import SummaryApi from "../../common/SummaryApi";
import { Table, Badge } from "react-bootstrap";
import { MdRefresh } from "react-icons/md";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.getAllOrders
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
    fetchOrders();
  }, []);

  return (
    <div className="container-fluid px-0">
      <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
        <h4 className="fw-bold mb-0">Customer Orders</h4>
        <button onClick={fetchOrders} className="btn btn-outline-dark btn-sm d-flex align-items-center gap-2">
          <MdRefresh /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="text-center py-5">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-5 text-muted">No orders found.</div>
      ) : (
        <div className="table-responsive">
          <Table hover className="align-middle">
            <thead className="table-light">
              <tr>
                <th>Order ID</th>
                <th>Customer ID</th>
                <th>Total Items</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="small fw-bold">#{order._id.slice(-6)}</td>
                  <td className="small">{order.userId}</td>
                  <td>{order.totalItems}</td>
                  <td className="fw-bold">₹{order.totalAmount}</td>
                  <td>
                    <Badge bg={order.payment?.status === "paid" ? "success" : "warning"} className="text-uppercase">
                      {order.payment?.status || "pending"}
                    </Badge>
                  </td>
                  <td className="small text-muted">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Orders;
