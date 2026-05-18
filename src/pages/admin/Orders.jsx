import React, { useEffect, useState } from "react";
import Axios from "../../utils/Axios";
import SummaryApi from "../../common/SummaryApi";
import { Table, Badge, Modal, Button } from "react-bootstrap";
import { MdRefresh, MdClose } from "react-icons/md";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleShowDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

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
                <tr 
                  key={order._id} 
                  onClick={() => handleShowDetails(order)} 
                  style={{ cursor: "pointer" }}
                  title="Click to view details"
                >
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

      {/* Order Details Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">
            Order Details <span className="text-muted small">#{selectedOrder?._id}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <div>
              {/* Delivery Address Section */}
              <div className="mb-4">
                <h6 className="fw-bold border-bottom pb-2">Delivery Details</h6>
                {selectedOrder.deliveryAddress ? (
                  <div className="bg-light p-3 rounded">
                    <p className="mb-0">
                      <strong>Address:</strong> {selectedOrder.deliveryAddress}
                    </p>
                  </div>
                ) : (
                  <p className="text-muted">No delivery address provided.</p>
                )}
              </div>

              {/* Items Section */}
              <div className="mb-4">
                <h6 className="fw-bold border-bottom pb-2">Ordered Items ({selectedOrder.totalItems})</h6>
                <div className="table-responsive">
                  <Table size="sm" bordered hover>
                    <thead className="table-light">
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(selectedOrder.items && selectedOrder.items.length > 0) || (selectedOrder.cartItems && selectedOrder.cartItems.length > 0) ? (
                        (selectedOrder.items || selectedOrder.cartItems).map((item, index) => (
                          <tr key={index}>
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                {item.image && (
                                  <img src={Array.isArray(item.image) ? item.image[0] : item.image} alt={item.name} style={{ width: "40px", height: "40px", objectFit: "contain" }} />
                                )}
                                <span className="small">{item.name}</span>
                              </div>
                            </td>
                            <td className="align-middle small">₹{item.price}</td>
                            <td className="align-middle small">{item.quantity}</td>
                            <td className="align-middle small fw-bold">₹{item.price * item.quantity}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center py-4 text-muted small">
                            Product details are not available for this legacy order. <br/> (Please place a new order to see the mapped items).
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </div>

              {/* Summary Section */}
              <div className="d-flex justify-content-end">
                <div className="bg-light p-3 rounded" style={{ minWidth: "250px" }}>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Payment Status:</span>
                    <Badge bg={selectedOrder.payment?.status === "paid" ? "success" : "warning"} className="text-uppercase">
                      {selectedOrder.payment?.status || "pending"}
                    </Badge>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Payment ID:</span>
                    <span className="small">{selectedOrder.payment?.razorpayPaymentId || "N/A"}</span>
                  </div>
                  <div className="d-flex justify-content-between fw-bold fs-5 border-top pt-2 mt-2">
                    <span>Total Amount:</span>
                    <span>₹{selectedOrder.totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Orders;
