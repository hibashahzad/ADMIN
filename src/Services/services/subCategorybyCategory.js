import GenericServices from "./GenericServices";
class SubCategoryServices extends GenericServices {
 
  // addProduct = (data) => {
  //   return this.post("products", data);
  // };
  getSubCategoryByCategory= (id) => {
    return this.get("subcategory/byCategory/"+id);
  };
  // deleteProduct = (_id) => {
  //   return this.delete("products/" + _id);
  // };
  // updateProduct = (_id, data) => {
  //   return this.put("products/" + _id, data);
  // };
  // getSingle = (_id) => {
  //   return this.get("products/" + _id);
  // };
}
let SubCategory = new SubCategoryServices();
export default SubCategory;
