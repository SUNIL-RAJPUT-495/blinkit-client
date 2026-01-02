import dileverytime from "../../assets/15-mins-filled.png";
import { FaClipboardList, FaShoppingCart, FaBiking } from "react-icons/fa";
import { IoBag } from "react-icons/io5";
import { Row, Modal, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../../Redux/Slice";
import { GrNext } from "react-icons/gr";

export const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const cartItems = useSelector(state => state.cart.items || []);

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    // 🔴 CLOSE CART → GO BACK TO PREVIOUS PAGE
    const handleClose = () => {
        if (location.state?.from) {
            navigate(location.state.from); // jahan se khola tha wapas waha
        } else {
            navigate("/"); // fallback Home
        }
    };

    const handelLogin = () => {
        navigate("/login");
    };

    return (
        <>
            <style>{`
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
                }

                .cart-items-scroll {
                    max-height: 300px;
                    overflow-y: auto;
                }
            `}</style>

            <Modal
                show={true}
                onHide={handleClose}
                dialogClassName="cart-right-modal"
                backdrop={true}
                keyboard={true}
            >

                <Modal.Header closeButton>
                    <Modal.Title>My Cart</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {/* Delivery Info */}
                    <Row className="border rounded p-2 mb-2">
                        <div className="d-flex align-items-center" style={{ height: "60px" }}>
                            <div className="border rounded" style={{ height: "50px" }}>
                                <img src={dileverytime} alt="delivery" className="h-100" />
                            </div>
                            <h5 className="fw-bold ms-2">Delivery in 8 minutes</h5>
                        </div>
                    </Row>

                    {/* Cart Items */}
                    <Row className="border rounded p-2">
                        <div className="m-0 p-0 cart-items-scroll">
                            {cartItems.map(item => (
                                <div
                                    key={item._id}
                                    className="mb-2 d-flex align-items-center w-100 p-1"
                                >
                                    <div className="d-flex">
                                        <div className="border rounded p-1" style={{ height: "80px" }}>
                                            <img
                                                src={item.image[0]}
                                                alt={item.name}
                                                style={{
                                                    width: "70px",
                                                    height: "70px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </div>

                                        <div className="ps-2">
                                            <p className="m-0" style={{ fontSize: "12px" }}>
                                                {item.name}
                                            </p>
                                            <p className="m-0">{item.unit}</p>
                                            <p className="fw-bold">₹{item.price}</p>
                                        </div>
                                    </div>

                                    <div
                                        className="d-flex justify-content-between align-items-center rounded ms-auto"
                                        style={{
                                            backgroundColor: "green",
                                            width: "60px",
                                            height: "30px",
                                            padding: "0 5px",
                                        }}
                                    >
                                        <button
                                            style={{
                                                backgroundColor: "transparent",
                                                border: "none",
                                                color: "white",
                                                fontSize: "16px",
                                            }}
                                            onClick={() => dispatch(removeItem(item._id))}
                                        >
                                            -
                                        </button>

                                        <span style={{ color: "white" }}>
                                            {item.quantity}
                                        </span>

                                        <button
                                            style={{
                                                backgroundColor: "transparent",
                                                border: "none",
                                                color: "white",
                                                fontSize: "16px",
                                            }}
                                            onClick={() => dispatch(addItem(item))}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Row>

                    {/* Price Details */}
                    <Row className="mt-3 border rounded p-2">
                        <div className="d-flex justify-content-between">
                            <span><FaClipboardList /> Items total</span>
                            <span>₹{totalPrice}</span>
                        </div>

                        <div className="d-flex justify-content-between">
                            <span><FaBiking /> Delivery</span>
                            <span>FREE</span>
                        </div>

                        <div className="d-flex justify-content-between">
                            <span><IoBag /> Packing</span>
                            <span>₹0</span>
                        </div>

                        <div className="d-flex justify-content-between fw-bold">
                            <span><FaShoppingCart /> Grand Total</span>
                            <span>₹{totalPrice}</span>
                        </div>
                    </Row>
                </Modal.Body>

                <Modal.Footer>
                    <Button className="w-100" variant="success" onClick={handelLogin}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <p className="fw-bold m-0">₹{totalPrice}</p>
                                <p style={{ fontSize: "13px" }}>TOTAL</p>
                            </div>
                            <div>
                                <p className="fs-5 m-0">
                                    Login to Proceed <GrNext />
                                </p>
                            </div>
                        </div>
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
