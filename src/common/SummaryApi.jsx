export const baseURL = "https://ecommerce.bhukhabhukhi.com";

const SummaryApi = {
  //user
  Register: {
    url: "/api/user/register",
    method: "post",
  },
  AdminLogin : {
    url : "/api/user/login",
    method: "post"
  },
  emailVerification :{
    url : "/api/user/verify-email",
    method:"post"
  },

  // customer 
  customerUser:{
    url:"/api/user/customerUser",
    method:"post"
  },
  userDetails: {
    url: "/api/user/user-details",
    method: "get"
  },
  updateUserDetails: {
    url: "/api/user/update-user",
    method: "put"
  }
,
  verifyCustomerOtp:{
    url:"/api/user/verify-customer-otp",
    method:"post"
  }
  // image upload 
,
  uploadImage: {
    url: "/api/file/upload",
    method: "post",
  },
   productImage: {
    url: "/api/file/upload-product",
    method: "post",
  },

  /*  CATEGORY  */
  addCategory: {
    url: "/api/category/add-category",
    method: "post",
  },

  getCategory: {
    url: "/api/category/get-category",
    method: "get",
  },

  updateCategory: {
    url: "/api/category/update-category",
    method: "put",
  },

  deleteCategory: {
    url: "/api/category/delete-category",
    method: "delete",
  },

  /* SUB CATEGORY */
  addSubCategory: {
    url: "/api/subcategory/add-subcategory",
    method: "post",
  },

  getSubCategory: {
    url: "/api/subcategory/get-subcategory",
    method: "get",
  },

  updateSubCategory: {
    url: "/api/subcategory/update-subcategory",
    method: "put",
  },

  deleteSubCategory: {
    url: "/api/subcategory/delete-subcategory", 
    method: "delete",
  },

  // product 
  addProduct:{
    url: "/api/product/add-product",
    method:"post"
  },

  getProduct:{
    url:"/api/product/getAllProducts",
    method:"get"
  }
  ,
  deleteProduct:{
    url: "/api/product/delet-product",
    method:'delete'
  },
  editProduct:{
    url: "/api/product/edit-Product",
    method:"put"
  },
  // cart

  creatOrder:{
    url: "/api/order/orderCreat",
    method:"post"
  },
  verifypayment:{
    url:"/api/order/verifyPayment",
    method:"put"
  },
  //address

  saveAdress:{
    url :"/api/address/save-address",
    method:"post"
  },
  showAddress:{
    url :"/api/address/show-address",
    method:"get"
  },
  getAllOrders: {
    url: "/api/order/getAllOrders",
    method: "get"
  },
  getAllAddresses: {
    url: "/api/address/getAllAddresses",
    method: "get"
  },
  getMyOrders: {
    url: "/api/order/getMyOrders",
    method: "get"
  },
  getDashboardStats: {
    url: "/api/order/getDashboardStats",
    method: "get"
  },
  updateOrderStatus: {
    url: "/api/order/updateOrderStatus",
    method: "put"
  }
};

export default SummaryApi;
