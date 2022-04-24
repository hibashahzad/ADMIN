import GenericServices from './GenericServices';
class SubCategoryServices extends GenericServices {
  // addProduct = (data) => {
  //   return this.post("products", data);
  // };
  getSubCategoryByCategory = (id) => {
    return this.get('subcategory/byCategory/' + id);
  };

  getSubCategory = () => {
    return this.get('subcategory');
  };
  getSingleCategory = (id) => {
    return this.get('subcategory/' + id);
  };
  deleteSub = (_id) => {
    return this.delete('subcategory/' + _id);
  };
  updateSub = (_id) => {
    return this.put('subcategory/' + _id);
  };
  updateSubImage = (_id) => {
    return this.put('subcategory/image/' + _id);
  };
  // updateProduct = (_id, data) => {
  //   return this.put("products/" + _id, data);
  // };
  // getSingle = (_id) => {
  //   return this.get("products/" + _id);
  // };
}
let SubCategory = new SubCategoryServices();
export default SubCategory;
