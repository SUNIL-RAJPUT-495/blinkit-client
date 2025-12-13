import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";

//  fetch categories
export const fetchCategories = async () => {
  try {
    const res = await Axios({
      url: SummaryApi.getCategory.url,
      method: SummaryApi.getCategory.method,
    });
    if (res.data.success) return res.data.data;
    return [];
  } catch (err) {
    console.error("Failed to fetch categories:", err);
    return [];
  }
};


//  fetch categories 

export const fetchSubCategory = async () => {
  try {
    const res = await Axios({
      url: SummaryApi.getSubCategory.url,
      method: SummaryApi.getSubCategory.method,
    });
    if (res.data.success) return res.data.data;
    return [];
  } catch (err) {
    console.error("Failed to fetch categories:", err);
    return [];
  }
};
