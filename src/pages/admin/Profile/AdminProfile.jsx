import { useRef, useState, useEffect } from "react";
import axios from "../../../axios";

export const AdminProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const fileInputRef = useRef(null);

  const userId = "67abc123xyz"; // temporary

  // -------------------------------
  // 1️⃣ LOAD PROFILE
  // -------------------------------
const loadProfile = async () => {
  if (!userId) {
    console.warn("UserId missing — skipping profile load");
    return;
  }

  try {
    const res = await axios.get(`/admin/${userId}`);

    if (!res.data.success) return;

    const data = res.data.data;

    setForm({
      name: data?.name || "",
      email: data?.email || "",
      mobile: data?.mobile || "",
    });

    if (data?.profilePic) {
      setProfileImage(`http://localhost:8080/uploads/${data.profilePic}`);
    }
  } catch (err) {
    console.error("Load Profile Error:", err);
  }
};

useEffect(() => {
  loadProfile();
}, [userId]); // 👈 runs ONLY when userId is ready

  // -------------------------------
  // 2️⃣ INPUT CHANGE
  // -------------------------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // -------------------------------
  // 3️⃣ IMAGE CHANGE + PREVIEW
  // -------------------------------
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  // -------------------------------
  // 4️⃣ SUBMIT UPDATE
  // -------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("mobile", form.mobile);

      if (selectedFile) {
        fd.append("profilePic", selectedFile); // MUST MATCH backend
      }

      const res = await axios.put(`/admin/${userId}`, fd);

      if (res.data.success) {
        alert("Profile Updated Successfully!");
        loadProfile();
      } else {
        alert(res.data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Update Error:", err);
      alert("Update failed!");
    }
  };

  return (
    <div className="mt-3">
      <form onSubmit={handleSubmit}>

        {/* PROFILE IMAGE */}
        <div className="mt-4 text-center">
          <div
            className="rounded-circle border mx-auto"
            style={{ width: "90px", height: "90px", overflow: "hidden" }}
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
            className="btn btn-warning btn-sm mt-2"
            style={{ borderRadius: "15px", width: "85px" }}
          >
            Edit
          </button>

          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>

        <br />

        {/* FORM INPUTS */}
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-100 border-0 bg-body-secondary p-2 mb-2"
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-100 border-0 bg-body-secondary p-2 mb-2"
        />

        <label>Mobile</label>
        <input
          type="text"
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          className="w-100 border-0 bg-body-secondary p-2 mb-2"
        />

        <button
          type="submit"
          className="w-100 mt-3 fw-bold btn btn-light"
          style={{ border: "1px solid yellow" }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};
