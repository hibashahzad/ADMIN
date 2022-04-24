import GenericServices from './GenericServices';
class CategoryServices extends GenericServices {
  // addProduct = (data) => {
  //   return this.post("products", data);
  // };
  getCategory = () => {
    return this.get('category');
  };
  getCategoryByid = (id) => {
    return this.get('category/' + id);
  };
  updateCategory = (id, data) => {
    return this.put('category/' + id, data);
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
let Category = new CategoryServices();
export default Category;
