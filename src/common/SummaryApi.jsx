export const baseURL = "http://localhost:8080";

const SummaryApi = {
  /* ================= USER ================= */
  Register: {
    url: baseURL + "/api/user/register",
    method: "post",
  },

  // image upload


  uploadImage: {
    url: baseURL + "/api/file/upload",
    method: "post",
  },


   productImage: {
    url: baseURL + "/api/file/upload-product",
    method: "post",
  },

  /* ================= CATEGORY ================= */

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

  /* ================= SUB CATEGORY ================= */

  addSubCategory: {
    url: baseURL + "/api/subcategory/add-subcategory",
    method: "post",
  },

  getSubCategory: {
    url: baseURL + "/api/subcategory/get-subcategory",
    method: "get",
  },

  updateSubCategory: {
    url: baseURL + "/api/subcategory/update-subcategory", // + /:id in call
    method: "put",
  },

  deleteSubCategory: {
    url: baseURL + "/api/subcategory/delete-subcategory", // + /:id in call
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
  }
};

export default SummaryApi;
