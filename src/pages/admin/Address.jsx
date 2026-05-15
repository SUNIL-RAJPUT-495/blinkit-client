import React, { useEffect, useState } from "react";
import Axios from "../../utils/Axios";
import SummaryApi from "../../common/SummaryApi";
import { Card, Row, Col } from "react-bootstrap";
import { MdLocationOn, MdRefresh } from "react-icons/md";

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const response = await Axios(SummaryApi.getAllAddresses);
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
    fetchAddresses();
  }, []);

  return (
    <div className="container-fluid px-0">
      <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
        <h4 className="fw-bold mb-0">Saved Addresses</h4>
        <button onClick={fetchAddresses} className="btn btn-outline-dark btn-sm d-flex align-items-center gap-2">
          <MdRefresh /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="text-center py-5">Loading addresses...</div>
      ) : addresses.length === 0 ? (
        <div className="text-center py-5 text-muted">No addresses found.</div>
      ) : (
        <Row className="g-4">
          {addresses.map((addr) => (
            <Col md={6} xl={4} key={addr._id}>
              <Card className="h-100 border-0 shadow-sm bg-light">
                <Card.Body>
                  <div className="d-flex gap-3">
                    <div className="text-warning">
                      <MdLocationOn size={24} />
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1">{addr.name}</h6>
                      <p className="small text-muted mb-2">{addr.mobile}</p>
                      <p className="small mb-0 text-secondary" style={{ lineHeight: "1.4" }}>
                        {addr.address_line}
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Address;
