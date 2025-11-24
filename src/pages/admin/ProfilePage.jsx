import  { useRef, useState } from "react";

export const ProfilePage = () => {
      const [ProfileImage, setProfileImage] = useState(null);
      const fileInputRef = useRef(null);
      const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleEditClick = (e) => {
    e.preventDefault(); // prevent form submit
    fileInputRef.current.click(); // trigger file upload dialog
  };

  return (
    <>
     <div className="mt-3 ">
                <form onSubmit={{}}>
                  {/* PROFILE IMAGE UPLOAD */}
                  <div className=" mt-4 ">
                    <div
                      className=" rounded-circle border p-1 "
                      style={{
                        width: "70px",
                        height: "70px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={
                          ProfileImage ||
                          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        } // default placeholder
                        alt="preview"
                        className="rounded-circle w-100 h-100"
                        style={{ objectFit: "cover" }}
                      />

                      {/* EDIT BUTTON */}
                    </div>

                    <button
                      type="button"
                      onClick={handleEditClick}
                      className=" bottom-0 end-0 btn btn-sm btn-warning mt-3"
                      style={{ borderRadius: "15px ", width: "80px" }}
                    >
                      Edit
                    </button>

                    {/* HIDDEN FILE INPUT */}
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                  </div>

                  <br />

                  {/* USER DETAILS */}
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Enter your Name"
                    className="w-100 border-0 bg-body-secondary"
                  />

                  <label>Email</label>
                  <input
                    type="text"
                    placeholder="Enter your Email"
                    className="w-100 border-0 bg-body-secondary"
                  />

                  <label>Mobile</label>
                  <input
                    type="text"
                    placeholder="Enter your Mobile Number"
                    className="w-100 border-0 bg-body-secondary"
                  />

                  <input
                    type="submit"
                    className="w-100 mt-3 fw-bold"
                    style={{ border: "1px solid yellow", background: "white" }}
                  />
                </form>
              </div>
              </>
  )
}
