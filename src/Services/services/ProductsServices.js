import GenericServices from "./GenericServices";
class ProductsServices extends GenericServices {
  constructor() {
    super();
  }
  addProduct = (data) => {
    return this.post("products", data);
  };
  getProduct = () => {
    return this.get("products");
  };
  deleteProduct = (_id) => {
    return this.delete("products/" + _id);
  };
  updateProduct = (_id, data) => {
    return this.put("products/" + _id, data);
  };
  getSingle = (_id) => {
    return this.get("products/" + _id);
  };
}
let productService = new ProductsServices();
export default productService;
