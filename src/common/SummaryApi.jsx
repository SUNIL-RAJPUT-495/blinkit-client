export const baseURL = "http://localhost:8080"; // your backend port

const SummaryApi = {
  Register: {
    url: baseURL + "/api/user/register",
    method: "post",
  },
  addCategory :{
    url:"/api/user/add-category",
    method:"post"
  },
  uploadImage: {
    url:"/api/file/upload",
    method:'post'
  }
};

export default SummaryApi;
