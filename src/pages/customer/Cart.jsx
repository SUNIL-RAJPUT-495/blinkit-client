import dileverytime from "../../assets/15-mins-filled.png";
import { FaClipboardList, FaBiking } from "react-icons/fa";
import {
  IoBag,
  IoLocationOutline,
  IoSearch,
  IoLocationSharp,
  IoLocateSharp,
} from "react-icons/io5";
import { Modal, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../../Redux/Slice";
import { GrNext } from "react-icons/gr";
import { useState, useEffect, useCallback } from "react";
import Axios from "../../utils/Axios";
import SummaryApi from "../../common/SummaryApi";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";

// Map Settings
const mapContainerStyle = { width: "100%", height: "100%" };
const defaultCenter = { lat: 26.9124, lng: 75.7873 };

export const Cart = () => {
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addNewAddress, setAddnewAddress] = useState(false);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [map, setMap] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = useSelector((state) => state.cart.items || []);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const { isLoaded } = useJsApiLoader({
    
    googleMapsApiKey: "",
    libraries: ["places"],
  });

  const [form, setForm] = useState({
    houseNo: "",
    floor: "",
    pinCode: "",
    area: "",
    landmark: "",
    receiverName: "",
    receiverNumber: "",
  });
  const addressFields = [
    { label: "Flat / House no*", name: "houseNo" },
    { label: "Floor (optional)", name: "floor" },
    { label: "Area / Sector*", name: "area" },
    { label: "Landmark", name: "landmark" },
    { label: "pincode", name: "pincode" }
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveAddresh = async () => {
    const { houseNo, landmark, receiverName, receiverNumber, pincode, area } = form;
    
    if (!houseNo || !landmark || !receiverName || !receiverNumber || !pincode || !area) {
      alert("Please fill all required fields");
      return;
    }

    if (receiverNumber.length !== 10) {
      alert("Enter a valid 10-digit mobile number");
      return;
    }

    try {
      const res = await Axios({
        url: SummaryApi.saveAdress.url,
        method: SummaryApi.saveAdress.method,
        data: { form }
      });

      if (res.data.success) {
        alert("Address saved!");
        setAddnewAddress(false);
        fetchSavedAddresses(); 
      }
    } catch (err) {
      console.log("Error saving address:", err);
    }
  };

  const [savedAddresses, setSavedAddresses] = useState([]);

  const fetchSavedAddresses = async () => {
    try {
      const res = await Axios({
        url: SummaryApi.showAddress.url,
        method: SummaryApi.showAddress.method,
      });
      if (res.data.success) {
        setSavedAddresses(res.data.data); 
      }
    } catch (err) {
      console.log("Error fetching addresses", err);
    }
  };

  useEffect(() => {
    fetchSavedAddresses();
  }, []);

  const onMapLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const newPos = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setMapCenter(newPos);
        map?.panTo(newPos);
      });
    }
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const handleClose = () => {
    location.state?.from ? navigate(location.state.from) : navigate("/");
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleClick = async () => {
    try {
      await Axios({
        url: SummaryApi.creatOrder.url,
        method: SummaryApi.creatOrder.method,
        data: { totalPrice, totalItems, cartItems },
      });

      const isRzpLoaded = await loadRazorpay();
      if (!isRzpLoaded) return alert("Razorpay SDK load nahi hua");

      const orderRes = await Axios({
        url: SummaryApi.creatPayment.url,
        method: SummaryApi.creatPayment.method,
        data: { amount: (totalPrice + 2) * 100 },
      });

      const data = orderRes.data.order;
      const options = {
        key: "rzp_test_S4vmJmWwwGuh3s",
        amount: data.amount,
        currency: "INR",
        name: "Blinkit Clone",
        order_id: data.id,
        handler: async (res) => {
          const verifyRes = await Axios.post("/api/payment/verify", res);
          if (verifyRes.data.success) alert("Payment successful!");
        },
        theme: { color: "#27943f" },
      };
      new window.Razorpay(options).open();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <style>{`
                .cart-right-modal.modal-dialog { position: fixed !important; right: 0; top: 0; margin: 0; height: 100vh; max-width: 420px; width: 420px; }
                .cart-right-modal .modal-content { height: 100vh; border-radius: 0; border: none; display: flex; flex-direction: column; overflow: hidden; }
                @media (max-width: 767px) {
                    .cart-right-modal.modal-dialog { max-width: 100% !important; width: 100% !important; height: 100% !important; position: fixed !important; left: 0 !important; top: 0 !important; margin: 0 !important; }
                    .cart-right-modal .modal-content { height: 100dvh !important; width: 100vw !important; }
                    .modal-backdrop { display: none !important; }
                }
                .modal-body-scrollable { flex: 1; overflow-y: auto; scrollbar-width: none; -webkit-overflow-scrolling: touch; }
                .modal-body-scrollable::-webkit-scrollbar { display: none; }
                
                /* New Address Modal Custom CSS */
                .scroll-form::-webkit-scrollbar { width: 4px; }
                .scroll-form::-webkit-scrollbar-thumb { background: #e0e0e0; border-radius: 10px; }
                .btn-address-type { border: 1px solid #dee2e6; border-radius: 50px; font-size: 12px; padding: 6px 15px; background: white; transition: 0.2s; }
                .btn-address-type.active { background: #e9f7ef; border-color: #27943f; color: #27943f; font-weight: bold; }
            `}</style>

      {/* MAIN CART MODAL */}
      <Modal
        show={true}
        onHide={handleClose}
        dialogClassName="cart-right-modal"
        backdrop={isMobile ? false : true}
      >
        <Modal.Header closeButton className="border-bottom-0 shadow-sm">
          <Modal.Title className="fw-bold">My Cart</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modal-body-scrollable px-3 bg-light">
          <div className="bg-white rounded border shadow-sm mb-3 overflow-hidden">
            <div className="d-flex align-items-center p-3">
              <div style={{ width: "50px" }}>
                <img src={dileverytime} alt="delivery" className="w-100" />
              </div>
              <div className="ms-3">
                <h6 className="fw-bold m-0">Delivery in 8 minutes</h6>
                <p className="m-0 text-muted small">
                  Shipment of {totalItems} items
                </p>
              </div>
            </div>
            <div className="p-2 border-top">
              {cartItems.map((item, index) => (
                <div
                  key={item._id}
                  className={`d-flex align-items-center justify-content-between p-2 ${index !== cartItems.length - 1 ? "border-bottom" : ""}`}
                >
                  <div className="d-flex align-items-center">
                    <div
                      className="border rounded p-1"
                      style={{ width: "60px", height: "60px" }}
                    >
                      <img
                        src={item.image[0]}
                        className="w-100 h-100 object-fit-contain"
                        alt="item"
                      />
                    </div>
                    <div className="ms-3">
                      <p className="m-0 fw-bold small">{item.name}</p>
                      <p
                        className="m-0 text-muted"
                        style={{ fontSize: "11px" }}
                      >
                        {item.unit}
                      </p>
                      <p className="m-0 fw-bold">₹{item.price}</p>
                    </div>
                  </div>
                  <div
                    className="d-flex justify-content-between align-items-center rounded bg-success px-2"
                    style={{ width: "70px", height: "30px" }}
                  >
                    <button
                      className="btn btn-sm text-white border-0 p-0"
                      onClick={() => dispatch(removeItem(item._id))}
                    >
                      -
                    </button>
                    <span className="text-white small fw-bold">
                      {item.quantity}
                    </span>
                    <button
                      className="btn btn-sm text-white border-0 p-0"
                      onClick={() => dispatch(addItem(item))}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded p-3 mb-3 shadow-sm border">
            <h6 className="fw-bold mb-3">Bill Details</h6>
            <div className="d-flex justify-content-between mb-2 text-muted small">
              <span>
                <FaClipboardList className="me-2" /> Items total
              </span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="d-flex justify-content-between mb-2 text-muted small">
              <span>
                <FaBiking className="me-2" /> Delivery charge
              </span>
              <span className="text-success fw-bold">FREE</span>
            </div>
            <div className="d-flex justify-content-between mb-2 text-muted small">
              <span>
                <IoBag className="me-2" /> Handling charge
              </span>
              <span>₹2</span>
            </div>
            <div className="d-flex justify-content-between fw-bold mt-2 pt-2 border-top">
              <span>Grand Total</span>
              <span>₹{totalPrice + 2}</span>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="border-0 p-3 bg-white shadow-lg d-block">
          <div className="d-flex align-items-center justify-content-between mb-3 p-2 rounded bg-light border">
            <div className="d-flex align-items-center">
              <IoLocationOutline className="text-primary me-2" size={22} />
              <div>
                <div className="fw-bold small">Delivering to Home</div>
                <div
                  className="text-muted text-truncate small"
                  style={{ maxWidth: "180px" }}
                >
                  F-2 balaji apartments jaipur
                </div>
              </div>
            </div>
            <button
              className="btn btn-sm btn-link text-success fw-bold text-decoration-none"
              onClick={() => setShowAddressModal(true)}
            >
              Change
            </button>
          </div>

          <Button
            className="w-100 py-2 border-0 d-flex justify-content-between align-items-center bg-success rounded-3"
            onClick={handleClick}
          >
            <div className="text-start text-white">
              <div className="fw-bold">₹{totalPrice + 2}</div>
              <div style={{ fontSize: "10px" }}>TOTAL</div>
            </div>
            <div className="text-white fw-bold">
              Login to Proceed <GrNext className="ms-2" size={12} />
            </div>
          </Button>
        </Modal.Footer>
      </Modal>

      {/* SAVED ADDRESSES MODAL */}
      <Modal
        show={showAddressModal}
        onHide={() => setShowAddressModal(false)}
        centered
        className="address-selection-modal"
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold fs-5">
            Select delivery address
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3">
          <div
            className="d-flex align-items-center p-3 mb-4 rounded border border-success border-opacity-25 bg-light"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setAddnewAddress(true);
              setShowAddressModal(false);
            }}
          >
            <span className="text-success fw-bold fs-4 me-3">+</span>
            <span className="text-success fw-bold">Add a new address</span>
          </div>
          <p className="text-muted small fw-bold mb-3">Your saved address</p>
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {/* SAVED ADDRESSES MODAL ke andar map function update karein */}
            {savedAddresses.map((addr, index) => (
              <div
                key={index}
                className={`d-flex align-items-start p-3 mb-3 rounded border shadow-sm bg-white ${selectedAddress?._id === addr._id ? "border-success bg-light" : ""
                  }`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSelectedAddress(addr); // State update
                  setShowAddressModal(false); // Modal close
                }}
              >
                <IoLocationOutline className="text-warning me-3" size={24} />
                <div>
                  <div className="fw-bold small">{addr.receiverName}</div>
                  <div className="text-muted small mt-1">
                    {addr.houseNo}, {addr.area}, {addr.landmark} - {addr.pincode}
                  </div>
                  <div className="text-muted small">{addr.receiverNumber}</div>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>

      {/* ADD NEW ADDRESS MODAL - WITH LIVE MAP */}
      <Modal
        show={addNewAddress}
        onHide={() => setAddnewAddress(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton className="border-0 pb-2">
          <Modal.Title className="fw-bold fs-5">
            Enter complete address
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0 overflow-hidden">
          <div className="container-fluid">
            <div className="row">
              {/* MAP SIDE */}
              <div
                className="col-md-6 p-0 bg-light position-relative"
                style={{ minHeight: "450px" }}
              >
                <div
                  className="position-absolute top-0 start-0 w-100 p-3"
                  style={{ zIndex: 10 }}
                >
                  <div className="input-group shadow-sm bg-white rounded-3 border overflow-hidden">
                    <span className="input-group-text bg-white border-0 text-success ps-3">
                      <IoSearch size={18} />
                    </span>
                    <input
                      type="text"
                      className="form-control border-0 py-2 shadow-none small"
                      placeholder="Search for area..."
                    />
                  </div>
                </div>
                <div className="w-100 h-100 bg-secondary-subtle overflow-hidden">
                  {isLoaded ? (
                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      center={mapCenter}
                      zoom={15}
                      onLoad={onMapLoad}
                      options={{ disableDefaultUI: true }}
                    >
                      <MarkerF position={mapCenter} />
                    </GoogleMap>
                  ) : (
                    <div className="h-100 d-flex align-items-center justify-content-center">
                      Map Loading...
                    </div>
                  )}
                </div>
                <div className="p-3 bg-white border-top position-absolute bottom-0 w-100 shadow-sm">
                  <div className="d-flex align-items-center mb-2">
                    <IoLocationSharp className="text-danger me-2" size={20} />
                    <div className="small fw-bold">
                      Brij Mandal Colony, Jaipur
                    </div>
                  </div>
                  <button
                    className="btn btn-outline-success btn-sm w-100 rounded-pill fw-bold"
                    onClick={handleGetCurrentLocation}
                  >
                    <IoLocateSharp className="me-1" /> Current Location
                  </button>
                </div>
              </div>

              {/* FORM SIDE */}
              <div
                className="col-md-6 p-4 border-start scroll-form"
                style={{ maxHeight: "550px", overflowY: "auto" }}
              >
                <form>
                  <label className="text-muted fw-bold mb-2 small">
                    SAVE ADDRESS AS *
                  </label>
                  <div className="d-flex gap-2 mb-4">
                    <button
                      type="button"
                      className="btn btn-address-type active"
                    >
                      🏠 Home
                    </button>
                    <button type="button" className="btn btn-address-type">
                      🏢 Work
                    </button>
                    <button type="button" className="btn btn-address-type">
                      📍 Other
                    </button>
                  </div>

                  {addressFields.map((field, i) => (
                    <div className="border-bottom mb-3 pb-1" key={i}>
                      <label
                        className="text-muted d-block"
                        style={{ fontSize: "10px" }}
                      >
                        {field.label.toUpperCase()}
                      </label>

                      <input
                        type="text"
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        className="form-control border-0 px-0 shadow-none small fw-semibold"
                        placeholder={field.label}
                      />
                    </div>
                  ))}

                  <div className="p-3 rounded  border mb-4">
                    <p className="fw-bold small mb-2">Receiver's Details</p>
                    <input
                      type="text"
                      className="form-control border-0 border-bottom bg-transparent mb-2 shadow-none small"
                      placeholder="Name *"
                      name="receiverName"
                      onChange={handleChange}
                    />
                    <input
                      type="tel"
                      className="form-control border-0 border-bottom bg-transparent shadow-none small"
                      placeholder="Phone *"
                      name="receiverNumber"
                      onKeyPress={(e) => {
                        if (!/[0-9]/.test(e.key)) e.preventDefault();
                      }}
                      maxLength={10}
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={saveAddresh}
                    className="btn btn-success w-100 py-3 fw-bold rounded-3 shadow-sm border-0"
                  >
                    Save & Proceed
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
