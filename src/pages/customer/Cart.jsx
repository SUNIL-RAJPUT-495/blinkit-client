import dileverytime from "../../assets/15-mins-filled.png";
import { FaClipboardList, FaShoppingCart, FaBiking } from "react-icons/fa";
import { IoBag } from "react-icons/io5";
import { Row, Modal, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../../Redux/Slice";
import { GrNext } from "react-icons/gr";
import { useState, useEffect } from "react";
import Axios from "../../utils/Axios";
import SummaryApi from "../../common/SummaryApi";

export const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const cartItems = useSelector(state => state.cart.items || []);

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
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

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

    const handleClick = async ()=>{
        try{
            const res = await Axios({
                url:SummaryApi.addcart.url,
                method:SummaryApi.addcart.method,
                data:{totalItems,totalPrice,items:cartItems}
            })
            if(res.data.success){
                console.log("order placed succesfully")
            }
            
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <>
            <style>{`
                /* Desktop Style */
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
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }

                /* Mobile Style Fix */
                @media (max-width: 767px) {
                    .cart-right-modal.modal-dialog {
                        max-width: 100% !important;
                        width: 100% !important;
                        height: 100% !important;
                        position: fixed !important;
                        left: 0 !important;
                        top: 0 !important;
                        margin: 0 !important;
                    }

                    .cart-right-modal .modal-content {
                        /* 100dvh mobile address bar ke sath height fix karta hai */
                        height: 100dvh !important; 
                        width: 100vw !important;
                    }
                    
                    .modal-backdrop { display: none !important; }
                }

                /* Scrollable Body - Ensures Footer stays at bottom */
                .modal-body-scrollable {
                    flex: 1;
                    overflow-y: auto;
                    scrollbar-width: none;
                    -webkit-overflow-scrolling: touch; /* Smooth scroll for iOS */
                }
                .modal-body-scrollable::-webkit-scrollbar { display: none; }
                
                .cart-items-container {
                    width: 100%;
                }
            `}</style>

            <Modal
                show={true}
                onHide={handleClose}
                dialogClassName="cart-right-modal"
                backdrop={isMobile ? false : true}
                keyboard={true}
                animation={true}
            >
                <Modal.Header closeButton className="border-bottom-0 shadow-sm" style={{ flexShrink: 0, zIndex: 10 }}>
                    <Modal.Title className="fw-bold">My Cart</Modal.Title>
                </Modal.Header>

                <Modal.Body className="modal-body-scrollable px-3 bg-light">

                    {/* Delivery Info and Items combined in one card */}
                    
                    <div className="bg-white rounded border shadow-sm mb-3 overflow-hidden">
                        
                        <div className="d-flex align-items-center p-3">
                            <div style={{ width: "50px" }}>
                                <img src={dileverytime} alt="delivery" className="w-100" />
                            </div>
                            <div className="ms-3">
                                <h6 className="fw-bold m-0" style={{ fontSize: "16px" }}>Delivery in 8 minutes</h6>
                                <p className="m-0 text-muted" style={{ fontSize: "11px" }}>Shipment of {totalItems} items</p>
                            </div>
                        </div>

                        <div className="p-2 border-top">
                            {cartItems.map((item, index) => (
                                <div key={item._id}
                                    className={`d-flex align-items-center justify-content-between p-2 ${index !== cartItems.length - 1 ? 'border-bottom' : ''}`}
                                    style={{ paddingBottom: "15px", paddingTop: "15px" }}>

                                    <div className="d-flex align-items-center">
                                        <div className="border rounded p-1" style={{ width: "60px", height: "60px", backgroundColor: "#fff" }}>
                                            <img src={item.image[0]} alt={item.name} className="w-100 h-100 object-fit-contain" />
                                        </div>
                                        <div className="ms-3">
                                            <p className="m-0 fw-bold" style={{ fontSize: "13px", lineHeight: "1.2", maxWidth: "150px" }}>
                                                {item.name}
                                            </p>
                                            <p className="m-0 text-muted" style={{ fontSize: "11px" }}>{item.unit}</p>
                                            <p className="m-0 fw-bold" style={{ fontSize: "14px" }}>₹{item.price}</p>
                                        </div>
                                    </div>

                                    {/* Counter Buttons */}
                                    <div className="d-flex justify-content-between align-items-center rounded"
                                        style={{ backgroundColor: "#27943f", width: "70px", height: "30px", padding: "0 8px" }}>
                                        <button className="btn btn-sm p-0 text-white border-0 fw-bold" onClick={() => dispatch(removeItem(item._id))}>-</button>
                                        <span className="text-white fw-bold" style={{ fontSize: "13px" }}>{item.quantity}</span>
                                        <button className="btn btn-sm p-0 text-white border-0 fw-bold" onClick={() => dispatch(addItem(item))}>+</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bill Details */}
                    <div className="bg-white rounded p-3 mb-3 shadow-sm border">
                        <h6 className="fw-bold mb-3">Bill Details</h6>
                        <div className="d-flex justify-content-between mb-2 text-muted" style={{ fontSize: "13px" }}>
                            <span><FaClipboardList className="me-2" /> Items total</span>
                            <span>₹{totalPrice}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2 text-muted" style={{ fontSize: "13px" }}>
                            <span><FaBiking className="me-2" /> Delivery charge</span>
                            <span className="text-success fw-bold">FREE</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2 text-muted" style={{ fontSize: "13px" }}>
                            <span><IoBag className="me-2" /> Handling charge</span>
                            <span>₹2</span>
                        </div>
                        <div className="d-flex justify-content-between fw-bold mt-2 pt-2 border-top" style={{ fontSize: "16px" }}>
                            <span>Grand Total</span>
                            <span>₹{totalPrice + 2}</span>
                        </div>
                    </div>

                    {/* Cancellation Policy */}
                    <div className="bg-white rounded p-3 mb-3 shadow-sm border">
                        <h6 className="fw-bold mb-2" style={{ fontSize: "14px" }}>Cancellation Policy</h6>
                        <p className="text-muted m-0" style={{ fontSize: "11px", lineHeight: "1.4" }}>
                            Orders cannot be cancelled once packed for delivery. In case of unexpected delays, a refund will be provided, if applicable.
                        </p>
                    </div>
                </Modal.Body>

                {/* Footer stays at the very bottom */}
                <Modal.Footer className="border-0 p-3 bg-white shadow-lg" style={{ flexShrink: 0, zIndex: 10 }}>
                    <Button
                        className="w-100 py-3 border-0 d-flex justify-content-between align-items-center"
                        style={{ backgroundColor: "#27943f", borderRadius: "12px" }}
                        onClick={handleClick}
                    >
                        <div className="text-start text-white">
                            <h5 className="m-0 fw-bold">₹{totalPrice + 2}</h5>
                            <small className="opacity-75" style={{ fontSize: "11px" }}>TOTAL</small>
                        </div>
                        <div className="d-flex align-items-center text-white fw-bold fs-6">
                            Login to Proceed <GrNext className="ms-2" />
                        </div>
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};