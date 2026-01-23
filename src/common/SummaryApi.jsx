export const baseURL = "https://blinkit-server-sigma.vercel.app";

const SummaryApi = {
  //user
  Register: {
    url: baseURL + "/api/user/register",
    method: "post",
  },

  AdminLogin : {
    url : baseURL + "/api/user/login",
    method: "post"
  },
  emailVerification :{
    url : baseURL + "/api/user/verify-email",
    method:"post"
  },


  // customer 

  customerUser:{
    url:baseURL+"/api/user/customerUser",
    method:"post"
  }
,
  verifyCustomerOtp:{
    url:baseURL+"/api/user/verify-customer-otp",
    method:"post"
  }
  // image upload

,
  uploadImage: {
    url: baseURL + "/api/file/upload",
    method: "post",
  },


   productImage: {
    url: baseURL + "/api/file/upload-product",
    method: "post",
  },

  /*  CATEGORY  */

  addCategory: {
    url: baseURL + "/api/category/add-category",
    method: "post",
  },

  getCategory: {
    url: baseURL + "/api/category/get-category",
    method: "get",
  },

  updateCategory: {
    url: baseURL + "/api/category/update-category",
    method: "put",
  },

  deleteCategory: {
    url: baseURL + "/api/category/delete-category",
    method: "delete",
  },

  /* SUB CATEGORY */

  addSubCategory: {
    url: baseURL + "/api/subcategory/add-subcategory",
    method: "post",
  },

  getSubCategory: {
    url: baseURL + "/api/subcategory/get-subcategory",
    method: "get",
  },

  updateSubCategory: {
    url: baseURL + "/api/subcategory/update-subcategory",
    method: "put",
  },

  deleteSubCategory: {
    url: baseURL + "/api/subcategory/delete-subcategory", 
    method: "delete",
  },

  // product 

  addProduct:{
    url:baseURL + "/api/product/add-product",
    method:"post"
  },

  getProduct:{
    url:baseURL+"/api/product/getAllProducts",
    method:"get"
  }
  ,
  deleteProduct:{
    url:baseURL+ "/api/product/delet-product",
    method:'delete'
  },
  editProduct:{
    url:baseURL + "/api/product/edit-Product",
    method:"put"
  },



  // cart

  creatOrder:{
    url:baseURL + "/api/order/orderCreat",
    method:"post"
  },
  verifypayment:{
    url:baseURL+"/api/payment/verifyPayment",
    method:"post"
  },


  //address

  saveAdress:{
    url:baseURL +"/api/address/save-address",
    method:"post"
  },
  showAddress:{
    url:baseURL +"/api/address/show-address",
    method:"get"
  }
};

export default SummaryApi;
