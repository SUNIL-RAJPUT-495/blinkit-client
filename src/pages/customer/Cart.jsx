import dileverytime from "../../assets/15-mins-filled.png";
import { FaClipboardList, FaShoppingCart, FaBiking } from "react-icons/fa";
import { IoBag } from "react-icons/io5";
import { Row, Modal, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../../Redux/Slice";
import { GrNext } from "react-icons/gr";
import { useState, useEffect } from "react";

export const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const cartItems = useSelector(state => state.cart.items || []);

    // Screen size detect karne ke liye state
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 767);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const handleClose = () => {
        if (location.state?.from) {
            navigate(location.state.from); 
        } else {
            navigate("/"); 
        }
    };

    const handelLogin = () => {
        navigate("/login");
    };

    return (
        <>
            <style>{`
                /* Desktop Style (Right Sidebar) */
                .cart-right-modal.modal-dialog {
                    position: fixed !important;
                    right: 0;
                    top: 0;
                    margin: 0;
                    height: 100vh;
                    max-width: 420px;
                    width: 420px;
                }

                .cart-right-modal .modal-content {
                    height: 100vh;
                    border-radius: 0;
                    border: none;
                }

                /* Mobile Style (Full Screen & No Blur) */
                @media (max-width: 767px) {
                    .cart-right-modal.modal-dialog {
                        max-width: 100% !important;
                        width: 100% !important;
                        height: 100% !important;
                        position: fixed !important;
                        left: 0 !important;
                        bottom: 0 !important;
                    }
                    
                    /* Backdrop (blur/darkness) ko mobile par hatane ke liye */
                    .modal-backdrop {
                        display: none !important;
                    }

                    .cart-right-modal .modal-content {
                        height: 100vh !important;
                        width: 100vw !important;
                    }
                }

                .cart-items-scroll {
                    max-height: calc(100vh - 380px); /* Bottom bill ke hisab se scroll adjustment */
                    overflow-y: auto;
                    scrollbar-width: none;
                }
                .cart-items-scroll::-webkit-scrollbar { display: none; }
            `}</style>

            <Modal
                show={true}
                onHide={handleClose}
                dialogClassName="cart-right-modal"
                // Mobile par backdrop "false" rakhein taaki blur na ho
                backdrop={isMobile ? false : true} 
                keyboard={true}
                animation={true}
            >
                <Modal.Header closeButton className="border-bottom-0">
                    <Modal.Title className="fw-bold">My Cart</Modal.Title>
                </Modal.Header>

                <Modal.Body className="px-3">
                    {/* Delivery Info */}
                    <div className="d-flex align-items-center border rounded p-3 mb-3" style={{ backgroundColor: "#f8f9fa", borderStyle: "dashed !important" }}>
                        <div style={{ width: "45px" }}>
                            <img src={dileverytime} alt="delivery" className="w-100" />
                        </div>
                        <div className="ms-3">
                            <h6 className="fw-bold m-0" style={{ fontSize: "15px" }}>Delivery in 8 minutes</h6>
                            <p className="m-0 text-muted" style={{ fontSize: "12px" }}>Shipment 1 of 1</p>
                        </div>
                    </div>

                    {/* Cart Items List */}
                    <div className="cart-items-scroll">
                        {cartItems.map(item => (
                            <div key={item._id} className="d-flex align-items-center justify-content-between mb-4">
                                <div className="d-flex align-items-center">
                                    <div className="border rounded p-1" style={{ width: "65px", height: "65px" }}>
                                        <img
                                            src={item.image[0]}
                                            alt={item.name}
                                            className="w-100 h-100 object-fit-contain"
                                        />
                                    </div>
                                    <div className="ms-3">
                                        <p className="m-0 fw-bold" style={{ fontSize: "13px", lineHeight: "1.2" }}>{item.name}</p>
                                        <p className="m-0 text-muted" style={{ fontSize: "12px" }}>{item.unit}</p>
                                        <p className="m-0 fw-bold" style={{ fontSize: "14px" }}>₹{item.price}</p>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center rounded" 
                                     style={{ backgroundColor: "#27943f", width: "70px", height: "32px", padding: "0 8px" }}>
                                    <button className="btn btn-sm p-0 text-white border-0 fw-bold" onClick={() => dispatch(removeItem(item._id))}>-</button>
                                    <span className="text-white fw-bold" style={{ fontSize: "14px" }}>{item.quantity}</span>
                                    <button className="btn btn-sm p-0 text-white border-0 fw-bold" onClick={() => dispatch(addItem(item))}>+</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bill Details */}
                    <div className="mt-4 pt-3 border-top">
                        <h6 className="fw-bold mb-3">Bill Details</h6>
                        <div className="d-flex justify-content-between mb-2 text-muted" style={{ fontSize: "13px" }}>
                            <span><FaClipboardList className="me-1" /> Items total</span>
                            <span>₹{totalPrice}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2 text-muted" style={{ fontSize: "13px" }}>
                            <span><FaBiking className="me-1" /> Delivery charge</span>
                            <span className="text-success fw-bold">FREE</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2 text-muted" style={{ fontSize: "13px" }}>
                            <span><IoBag className="me-1" /> Handling charge</span>
                            <span>₹2</span>
                        </div>
                        <div className="d-flex justify-content-between fw-bold mt-2 pt-2 border-top" style={{ fontSize: "16px" }}>
                            <span>Grand Total</span>
                            <span>₹{totalPrice + 2}</span>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer className="border-0 p-3 bg-white">
                    <Button 
                        className="w-100 py-3 border-0 d-flex justify-content-between align-items-center" 
                        style={{ backgroundColor: "#27943f", borderRadius: "12px" }} 
                        onClick={handelLogin}
                    >
                        <div className="text-start">
                            <h5 className="m-0 fw-bold">₹{totalPrice + 2}</h5>
                            <small className="opacity-75" style={{ fontSize: "10px" }}>TOTAL</small>
                        </div>
                        <div className="d-flex align-items-center fw-bold fs-5">
                            Login to Proceed <GrNext className="ms-2" />
                        </div>
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};