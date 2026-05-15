import { useRef, useState, useEffect } from "react";
import Axios from "../../../utils/Axios";
import SummaryApi from "../../../common/SummaryApi";

export const AdminProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const fileInputRef = useRef(null);

  const loadProfile = async () => {
    try {
      const res = await Axios({
        ...SummaryApi.userDetails
      });

      if (res.data.success) {
        const data = res.data.data;
        setForm({
          name: data?.name || "",
          email: data?.email || "",
          mobile: data?.mobile || "",
        });
        if (data?.avatar) {
          setProfileImage(data.avatar);
        }
      }
    } catch (err) {
      console.error("Load Profile Error:", err);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfileImage(URL.createObjectURL(file));
    setSelectedFile(file);

    // Auto upload avatar if needed, or wait for submit
  };

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Update user details
      const res = await Axios({
        ...SummaryApi.updateUserDetails,
        data: form
      });

      // 2. Update avatar if selected
      if (selectedFile) {
        const formData = new FormData();
        formData.append("avatar", selectedFile);
        await Axios.put("/api/user/upload-avatar", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      if (res.data.success) {
        alert("Profile Updated Successfully!");
        loadProfile();
      }
    } catch (err) {
      console.error("Update Error:", err);
      alert("Update failed!");
    }
  };

  return (
    <div className="container-fluid px-0">
      <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
        <h4 className="fw-bold mb-0">Admin Profile</h4>
        <span className="badge bg-warning text-dark px-3 py-2 rounded-pill">Administrator</span>
      </div>

      <form onSubmit={handleSubmit} className="row g-4">
        {/* LEFT COLUMN: AVATAR */}
        <div className="col-md-4 text-center border-md-end">
          <div className="position-relative d-inline-block">
            <div
              className="rounded-circle border border-4 border-white shadow-sm mx-auto mb-3"
              style={{ width: "150px", height: "150px", overflow: "hidden" }}
            >
              <img
                src={
                  profileImage ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt="profile"
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
              />
            </div>
            
            <button
              type="button"
              onClick={handleEditClick}
              className="btn btn-dark btn-sm position-absolute bottom-0 start-50 translate-middle-x mb-2 shadow"
              style={{ borderRadius: "20px", padding: "4px 15px" }}
            >
              Change Photo
            </button>
          </div>
          
          <div className="mt-3">
            <h5 className="fw-bold mb-1">{form.name || "Admin User"}</h5>
            <p className="text-muted small">{form.email}</p>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>

        {/* RIGHT COLUMN: FORM DETAILS */}
        <div className="col-md-8">
          <div className="bg-light p-4 rounded-3 border">
            <h6 className="fw-bold mb-4">Personal Information</h6>
            
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label small fw-bold text-muted text-uppercase">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="form-control form-control-lg border-0 shadow-sm"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold text-muted text-uppercase">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="form-control form-control-lg border-0 shadow-sm"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold text-muted text-uppercase">Mobile Number</label>
                <input
                  type="text"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  placeholder="+91 0000000000"
                  className="form-control form-control-lg border-0 shadow-sm"
                />
              </div>

              <div className="col-12 mt-5">
                <button
                  type="submit"
                  className="btn btn-warning btn-lg fw-bold px-5 shadow-sm"
                  style={{ borderRadius: "10px" }}
                >
                  Save Profile Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
