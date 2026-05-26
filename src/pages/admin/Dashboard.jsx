import React, { useEffect, useState } from "react";
import Axios from "../../utils/Axios";
import SummaryApi from "../../common/SummaryApi";
import { Container, Row, Col, Card, Table, Badge, Button, ProgressBar, Modal } from "react-bootstrap";
import { 
  MdAttachMoney, 
  MdShoppingCart, 
  MdInventory, 
  MdCategory, 
  MdListAlt, 
  MdPeople, 
  MdTrendingUp, 
  MdAddCircleOutline, 
  MdRefresh,
  MdArrowForward,
  MdVisibility
} from "react-icons/md";
import { Link } from "react-router-dom";

export const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal for recent order details
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await Axios({
        ...SummaryApi.getDashboardStats
      });
      if (response.data.success) {
        setStats(response.data.stats);
      } else {
        setError("Failed to fetch dashboard statistics");
      }
    } catch (err) {
      console.error("Dashboard Stats Fetch Error:", err);
      setError(err?.response?.data?.message || "Something went wrong while loading stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleShowDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  if (loading) {
    return (
      <Container fluid className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="skeleton-box rounded" style={{ width: "200px", height: "32px" }}></div>
          <div className="skeleton-box rounded" style={{ width: "100px", height: "38px" }}></div>
        </div>
        <Row className="g-4 mb-4">
          {[1, 2, 3, 4].map((i) => (
            <Col key={i} xs={12} sm={6} xl={3}>
              <div className="skeleton-box rounded" style={{ height: "120px", width: "100%" }}></div>
            </Col>
          ))}
        </Row>
        <Row className="g-4">
          <Col xs={12} lg={8}>
            <div className="skeleton-box rounded mb-4" style={{ height: "350px", width: "100%" }}></div>
          </Col>
          <Col xs={12} lg={4}>
            <div className="skeleton-box rounded" style={{ height: "350px", width: "100%" }}></div>
          </Col>
        </Row>
      </Container>
    );
  }

  if (error) {
    return (
      <Container fluid className="py-5 text-center">
        <div className="alert alert-danger d-inline-block px-5 py-4 rounded-4 shadow-sm" style={{ maxWidth: "500px" }}>
          <h5 className="fw-bold mb-2">Error Loading Dashboard</h5>
          <p className="text-muted mb-3">{error}</p>
          <Button variant="dark" onClick={fetchStats} className="d-flex align-items-center gap-2 mx-auto btn-sm">
            <MdRefresh /> Try Again
          </Button>
        </div>
      </Container>
    );
  }

  // Calculate some helper statistics from dashboard responses
  const totalRevenue = stats?.totalRevenue || 0;
  const totalOrders = stats?.totalOrders || 0;
  const totalProducts = stats?.totalProducts || 0;
  const totalCategories = stats?.totalCategories || 0;
  const totalSubCategories = stats?.totalSubCategories || 0;
  const totalCustomers = stats?.totalCustomers || 0;

  // Process status breakdown to match badge types and counts
  const statuses = ["placed", "packed", "out_for_delivery", "delivered", "cancelled"];
  const statusCounts = {};
  statuses.forEach(s => statusCounts[s] = 0);
  stats?.statusBreakdown?.forEach(item => {
    if (statuses.includes(item._id)) {
      statusCounts[item._id] = item.count;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered": return "success";
      case "out_for_delivery": return "info";
      case "packed": return "primary";
      case "placed": return "warning";
      case "cancelled": return "danger";
      default: return "secondary";
    }
  };

  // Modern cards data
  const statCards = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: <MdAttachMoney />,
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      shadowColor: "rgba(16, 185, 129, 0.25)",
      description: "From fully paid orders"
    },
    {
      title: "Total Orders",
      value: totalOrders,
      icon: <MdShoppingCart />,
      gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
      shadowColor: "rgba(59, 130, 246, 0.25)",
      description: "Overall orders placed"
    },
    {
      title: "Active Products",
      value: totalProducts,
      icon: <MdInventory />,
      gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      shadowColor: "rgba(245, 158, 11, 0.25)",
      description: "Items in catalog"
    },
    {
      title: "Total Customers",
      value: totalCustomers,
      icon: <MdPeople />,
      gradient: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
      shadowColor: "rgba(236, 72, 153, 0.25)",
      description: "Registered mobile users"
    }
  ];

  // For visual Custom Bar Chart
  // We'll prepare last 7 days sales data
  const salesHistory = stats?.salesHistory || [];
  const maxRevenue = salesHistory.length > 0 ? Math.max(...salesHistory.map(h => h.revenue), 1) : 1;

  return (
    <Container fluid className="px-0 py-2">
      {/* HEADER SECTION */}
      <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
        <div>
          <h4 className="fw-bold mb-1 text-dark">Welcome to your Dashboard</h4>
          <p className="text-muted small mb-0">Here's a breakdown of your Blinkit store operations today.</p>
        </div>
        <button onClick={fetchStats} className="btn btn-outline-dark btn-sm d-flex align-items-center gap-2 shadow-sm rounded-3">
          <MdRefresh /> Refresh Stats
        </button>
      </div>

      {/* KPI STATS ROW */}
      <Row className="g-4 mb-4">
        {statCards.map((card, idx) => (
          <Col key={idx} xs={12} sm={6} xl={3}>
            <Card className="border-0 rounded-4 overflow-hidden shadow-sm" style={{
              background: card.gradient,
              boxShadow: `0 8px 30px ${card.shadowColor}`,
              color: "#fff",
              position: "relative",
              transition: "transform 0.3s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <p className="text-white-50 text-uppercase fw-semibold small mb-1">{card.title}</p>
                    <h3 className="fw-extrabold mb-2" style={{ fontSize: "1.75rem", letterSpacing: "-0.5px" }}>{card.value}</h3>
                  </div>
                  <div className="d-flex align-items-center justify-content-center bg-white bg-opacity-20 rounded-3" style={{ width: "48px", height: "48px", fontSize: "24px" }}>
                    {card.icon}
                  </div>
                </div>
                <div className="mt-3 pt-2 border-top border-white border-opacity-10 text-white-50 small d-flex align-items-center gap-1">
                  <MdTrendingUp /> {card.description}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* CHART & STATUS ROW */}
      <Row className="g-4 mb-4">
        {/* CUSTOM INTERACTIVE SALES CHART */}
        <Col xs={12} lg={8}>
          <Card className="border-0 shadow-sm rounded-4 h-100">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h6 className="fw-bold mb-0 text-dark">Revenue Trends (Recent Paid Days)</h6>
                <Badge bg="success" className="bg-opacity-10 text-success px-3 py-2 rounded-pill small">Daily Performance</Badge>
              </div>

              {salesHistory.length === 0 ? (
                <div className="d-flex flex-column align-items-center justify-content-center text-muted" style={{ height: "250px" }}>
                  <MdTrendingUp style={{ fontSize: "48px", opacity: 0.3 }} className="mb-2" />
                  <span className="small">No paid sales recorded in the last 7 days</span>
                </div>
              ) : (
                <div className="d-flex flex-column justify-content-between" style={{ height: "250px" }}>
                  {/* The Bar Chart area */}
                  <div className="d-flex align-items-end justify-content-around h-75 border-bottom pb-2 px-2" style={{ position: "relative" }}>
                    {salesHistory.map((item, idx) => {
                      const percentage = (item.revenue / maxRevenue) * 100;
                      return (
                        <div key={idx} className="d-flex flex-column align-items-center" style={{ width: `${100 / salesHistory.length}%`, maxWidth: "50px", zIndex: 2 }}>
                          {/* Bar wrapper with tooltip on hover */}
                          <div className="position-relative w-100 d-flex justify-content-center">
                            <div className="chart-bar" style={{
                              height: `${Math.max(percentage, 8)}%`,
                              width: "24px",
                              background: "linear-gradient(to top, #249b3e, #f7d012)",
                              borderRadius: "6px 6px 0 0",
                              transition: "height 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                              cursor: "pointer",
                              boxShadow: "0 2px 8px rgba(36, 155, 62, 0.15)"
                            }}
                            title={`Revenue: ₹${item.revenue}\nOrders: ${item.orders}`}
                            ></div>
                            {/* Hover info badge */}
                            <div className="chart-tooltip">
                              ₹{item.revenue}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* X-axis labels */}
                  <div className="d-flex justify-content-around pt-2">
                    {salesHistory.map((item, idx) => {
                      // Formatting YYYY-MM-DD to DD MMM
                      const dateObj = new Date(item._id);
                      const formattedDate = dateObj.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
                      return (
                        <span key={idx} className="text-muted fw-bold" style={{ fontSize: "10px", textAlign: "center", width: `${100 / salesHistory.length}%` }}>
                          {formattedDate}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* ORDER STATS LIFE-CYCLE */}
        <Col xs={12} lg={4}>
          <Card className="border-0 shadow-sm rounded-4 h-100">
            <Card.Body className="p-4">
              <h6 className="fw-bold mb-3 text-dark">Order Status Lifecycle</h6>
              <p className="text-muted small mb-4">Breakdown of orders in active delivery pipelines.</p>

              <div className="d-flex flex-column gap-3">
                {statuses.map((status) => {
                  const count = statusCounts[status];
                  const total = totalOrders || 1;
                  const percent = Math.round((count / total) * 100);
                  const formattedStatus = status.replace(/_/g, " ").toUpperCase();
                  
                  return (
                    <div key={status}>
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="small fw-semibold text-capitalize text-secondary">{formattedStatus}</span>
                        <span className="small fw-bold text-dark">{count} <span className="text-muted fw-normal">({percent}%)</span></span>
                      </div>
                      <ProgressBar 
                        now={percent} 
                        variant={getStatusColor(status)} 
                        className="rounded-pill" 
                        style={{ height: "6px" }} 
                      />
                    </div>
                  );
                })}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* QUICK ACTIONS & RECENT ORDERS */}
      <Row className="g-4">
        {/* QUICK SHORTCUTS TOOLBAR */}
        <Col xs={12} xl={4}>
          <Card className="border-0 shadow-sm rounded-4 h-100">
            <Card.Body className="p-4">
              <h6 className="fw-bold mb-3 text-dark">Quick Admin Operations</h6>
              <p className="text-muted small mb-4">Jump directly to store settings and inventory tools.</p>
              
              <div className="d-flex flex-column gap-3">
                <Link to="/admin/upload-product" className="quick-action-btn">
                  <div className="d-flex align-items-center gap-3">
                    <span className="action-icon bg-warning bg-opacity-15 text-warning"><MdAddCircleOutline /></span>
                    <div>
                      <span className="fw-bold d-block text-dark small">Upload New Product</span>
                      <span className="text-muted text-xs">Add products to store catalog</span>
                    </div>
                  </div>
                  <MdArrowForward className="arrow" />
                </Link>

                <Link to="/admin/category" className="quick-action-btn">
                  <div className="d-flex align-items-center gap-3">
                    <span className="action-icon bg-success bg-opacity-15 text-success"><MdCategory /></span>
                    <div>
                      <span className="fw-bold d-block text-dark small">Manage Categories</span>
                      <span className="text-muted text-xs">Create or edit main shelf options</span>
                    </div>
                  </div>
                  <MdArrowForward className="arrow" />
                </Link>

                <Link to="/admin/subcategory" className="quick-action-btn">
                  <div className="d-flex align-items-center gap-3">
                    <span className="action-icon bg-info bg-opacity-15 text-info"><MdListAlt /></span>
                    <div>
                      <span className="fw-bold d-block text-dark small">Sub Categories</span>
                      <span className="text-muted text-xs">Organize nested catalogs</span>
                    </div>
                  </div>
                  <MdArrowForward className="arrow" />
                </Link>

                <div className="p-3 bg-light rounded-3 mt-2 border border-dashed border-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="fw-bold d-block text-dark small">Store Catalog Summary</span>
                      <span className="text-muted text-xs">Categories: <strong>{totalCategories}</strong> | Sub: <strong>{totalSubCategories}</strong></span>
                    </div>
                    <Badge bg="dark" className="px-2 py-1">{totalProducts} Items</Badge>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* RECENT ORDERS LISTING */}
        <Col xs={12} xl={8}>
          <Card className="border-0 shadow-sm rounded-4 h-100">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h6 className="fw-bold mb-0 text-dark">Recent Customer Orders</h6>
                <Link to="/admin/orders" className="btn btn-link text-decoration-none text-dark p-0 fw-bold small d-flex align-items-center gap-1">
                  View All Orders <MdArrowForward />
                </Link>
              </div>

              {(!stats?.recentOrders || stats.recentOrders.length === 0) ? (
                <div className="text-center py-5 text-muted small">No orders recorded yet.</div>
              ) : (
                <div className="table-responsive">
                  <Table hover className="align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Order ID</th>
                        <th>Total Items</th>
                        <th>Amount</th>
                        <th>Payment</th>
                        <th>Delivery Status</th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentOrders.map((order) => (
                        <tr key={order._id}>
                          <td className="small fw-bold">#{order._id.slice(-6).toUpperCase()}</td>
                          <td>{order.totalItems}</td>
                          <td className="fw-bold">₹{order.totalAmount}</td>
                          <td>
                            <Badge bg={order.payment?.status === "paid" ? "success" : "warning"} className="text-uppercase" style={{ fontSize: "10px" }}>
                              {order.payment?.status || "pending"}
                            </Badge>
                          </td>
                          <td>
                            <Badge bg={getStatusColor(order.orderStatus)} className="text-uppercase" style={{ fontSize: "10px" }}>
                              {order.orderStatus.replace(/_/g, " ")}
                            </Badge>
                          </td>
                          <td className="text-end">
                            <Button 
                              variant="outline-dark" 
                              size="sm" 
                              className="px-2 py-1 rounded-3 d-inline-flex align-items-center gap-1"
                              onClick={() => handleShowDetails(order)}
                            >
                              <MdVisibility /> Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Order Details Modal (Mirroring standard list behavior nicely) */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton className="border-bottom-0 pb-0">
          <Modal.Title className="fw-bold fs-5">
            Order Sheet Details <span className="text-muted small">#{selectedOrder?._id}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-2">
          {selectedOrder && (
            <div>
              {/* Delivery Address Section */}
              <div className="mb-4">
                <h6 className="fw-bold border-bottom pb-2 text-dark">Ship To Address</h6>
                {selectedOrder.deliveryAddress ? (
                  <div className="bg-light p-3 rounded-3">
                    <p className="mb-0 text-secondary small">
                      {selectedOrder.deliveryAddress}
                    </p>
                  </div>
                ) : (
                  <p className="text-muted small">No delivery address provided.</p>
                )}
              </div>

              {/* Items Section */}
              <div className="mb-4">
                <h6 className="fw-bold border-bottom pb-2 text-dark">Cart Items ({selectedOrder.totalItems})</h6>
                <div className="table-responsive">
                  <Table size="sm" bordered hover className="align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Product Info</th>
                        <th>Rate</th>
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
                                  <img 
                                    src={Array.isArray(item.image) ? item.image[0] : item.image} 
                                    alt={item.name} 
                                    style={{ width: "36px", height: "36px", objectFit: "contain", background: "#f8f9fa", padding: "2px", borderRadius: "4px" }} 
                                  />
                                )}
                                <span className="small fw-semibold">{item.name}</span>
                              </div>
                            </td>
                            <td className="small">₹{item.price}</td>
                            <td className="small">{item.quantity}</td>
                            <td className="small fw-bold">₹{item.price * item.quantity}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center py-4 text-muted small">
                            No product details mapped for this legacy order.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </div>

              {/* Summary Section */}
              <div className="d-flex justify-content-end">
                <div className="bg-light p-3 rounded-3" style={{ minWidth: "280px", border: "1px solid #e9ecef" }}>
                  <div className="d-flex justify-content-between mb-2 small">
                    <span className="text-secondary">Gateway status:</span>
                    <Badge bg={selectedOrder.payment?.status === "paid" ? "success" : "warning"} className="text-uppercase">
                      {selectedOrder.payment?.status || "pending"}
                    </Badge>
                  </div>
                  <div className="d-flex justify-content-between mb-2 small">
                    <span className="text-secondary">Payment ID:</span>
                    <span className="fw-mono text-dark">{selectedOrder.payment?.razorpayPaymentId || "N/A"}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2 small">
                    <span className="text-secondary">Placed on:</span>
                    <span className="text-dark">{new Date(selectedOrder.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>
                  <div className="d-flex justify-content-between fw-bold fs-6 border-top pt-2 mt-2 text-dark">
                    <span>Total Paid amount:</span>
                    <span>₹{selectedOrder.totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="border-top-0 pt-0">
          <Button variant="secondary" size="sm" onClick={handleCloseModal} className="rounded-3 px-3">
            Close Panel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Styling for modern elements inline/styled here */}
      <style>{`
        .chart-tooltip {
          position: absolute;
          bottom: 105%;
          left: 50%;
          transform: translateX(-50%) scale(0.8);
          background-color: #000;
          color: #fff;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: bold;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: all 0.2s ease;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }
        .chart-bar:hover + .chart-tooltip,
        .chart-bar:hover {
          opacity: 1;
          transform: translateX(-50%) scale(1) !important;
          filter: brightness(1.05);
        }
        .quick-action-btn {
          display: flex;
          align-items: center;
          justify-content: justify;
          padding: 12px;
          background: #fff;
          border: 1px solid #e9ecef;
          border-radius: 12px;
          color: inherit;
          text-decoration: none !important;
          transition: all 0.2s ease;
        }
        .quick-action-btn:hover {
          background-color: #fafafa;
          border-color: #ced4da;
          transform: translateX(4px);
        }
        .quick-action-btn .action-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          font-size: 20px;
        }
        .quick-action-btn .arrow {
          margin-left: auto;
          color: #adb5bd;
          transition: transform 0.2s ease;
        }
        .quick-action-btn:hover .arrow {
          transform: translateX(2px);
          color: #000;
        }
        .text-xs {
          font-size: 11px;
        }
      `}</style>
    </Container>
  );
};
