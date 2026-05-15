import React, { useEffect, useState, useRef } from "react";
import Axios from "../../../utils/Axios";
import SummaryApi from "../../../common/SummaryApi";
import { toast } from "react-hot-toast";

const CustomerProfile = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [profileImage, setProfileImage] = useState("");
  const fileInputRef = useRef(null);

  const fetchUserDetails = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.userDetails
      });
      console.log("Profile response:", response.data);
      if (response.data.success) {
        const user = response.data.data;
        setForm({
          name: user.name || "",
          email: user.email || "",
          mobile: user.mobile || "",
        });
        setProfileImage(user.avatar || "");
      }
    } catch (error) {
      console.error("Error fetching profile:", error.response || error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);
      try {
        const res = await Axios.post(SummaryApi.uploadImage.url, formData);
        if (res.data.success) {
          setProfileImage(res.data.data.url);
          toast.success("Image uploaded!");
        }
      } catch (err) {
        toast.error("Image upload failed");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios({
        ...SummaryApi.updateUserDetails,
        data: { ...form, avatar: profileImage },
      });
      if (res.data.success) {
        toast.success("Profile updated successfully!");
        localStorage.setItem("user", JSON.stringify(res.data.data));
      }
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="container-fluid px-0">
      <div className="mb-4 pb-2 border-bottom">
        <h4 className="fw-bold mb-0">Personal Information</h4>
        <p className="text-muted small">Update your profile details and avatar</p>
      </div>

      <form onSubmit={handleSubmit} className="row g-4">
        <div className="col-md-4 text-center border-md-end">
          <div className="position-relative d-inline-block">
            <div
              className="rounded-circle border border-4 border-white shadow-sm mx-auto mb-3"
              style={{ width: "130px", height: "130px", overflow: "hidden" }}
            >
              <img
                src={profileImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                alt="profile"
                className="w-100 h-100 object-fit-cover"
              />
            </div>
            <button
              type="button"
              onClick={handleEditClick}
              className="btn btn-dark btn-sm position-absolute bottom-0 start-50 translate-middle-x mb-1 rounded-pill px-3"
            >
              Change
            </button>
          </div>
          <input type="file" ref={fileInputRef} hidden onChange={handleImageChange} />
          <h5 className="fw-bold mt-2 mb-0">{form.name || "Customer"}</h5>
          <p className="text-muted small">Verified User</p>
        </div>

        <div className="col-md-8">
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label fw-bold small text-muted">FULL NAME</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="form-control form-control-lg bg-light border-0"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold small text-muted">EMAIL</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="form-control form-control-lg bg-light border-0"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold small text-muted">MOBILE</label>
              <input
                type="text"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                className="form-control form-control-lg bg-light border-0"
              />
            </div>
            <div className="col-12 mt-4">
              <button type="submit" className="btn btn-success btn-lg px-5 fw-bold rounded-3">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CustomerProfile;
