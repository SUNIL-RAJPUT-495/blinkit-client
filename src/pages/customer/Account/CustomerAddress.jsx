import React, { useEffect, useState } from "react";
import Axios from "../../../utils/Axios";
import SummaryApi from "../../../common/SummaryApi";
import { Card, Row, Col, Badge } from "react-bootstrap";
import { MdLocationOn, MdRefresh, MdDeleteOutline } from "react-icons/md";
import { toast } from "react-hot-toast";

const CustomerAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyAddresses = async () => {
    setLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.showAddress
      });
      if (response.data.success) {
        setAddresses(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyAddresses();
  }, []);

  return (
    <div className="container-fluid px-0">
      <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
        <h4 className="fw-bold mb-0">Saved Addresses</h4>
        <button onClick={fetchMyAddresses} className="btn btn-outline-success btn-sm d-flex align-items-center gap-2 rounded-pill px-3">
          <MdRefresh /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="text-center py-5">
           <div className="spinner-border text-success" role="status"></div>
        </div>
      ) : addresses.length === 0 ? (
        <div className="text-center py-5 text-muted">
          <MdLocationOn size={60} className="opacity-25 mb-3" />
          <h5>No addresses saved</h5>
          <p>You can add an address during checkout.</p>
        </div>
      ) : (
        <Row className="g-4">
          {addresses.map((addr, index) => (
            <Col md={6} key={addr._id}>
              <Card className="h-100 border shadow-sm hover-shadow transition">
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between mb-3">
                    <Badge bg="light" className="text-success border border-success border-opacity-25 px-3 py-2">
                       {index === 0 ? "Default Address" : "Saved Address"}
                    </Badge>
                    <button className="btn btn-link text-danger p-0">
                       <MdDeleteOutline size={20} />
                    </button>
                  </div>
                  <h6 className="fw-bold mb-1">{addr.name}</h6>
                  <p className="small text-muted mb-3">{addr.mobile}</p>
                  <p className="small mb-0 text-secondary" style={{ lineHeight: "1.6" }}>
                    <MdLocationOn className="text-success me-1" />
                    {addr.address_line}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default CustomerAddress;
