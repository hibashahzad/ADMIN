import GenericServices from './GenericServices';
class Service extends GenericServices {
  // addProduct = (data) => {
  //   return this.post("products", data);
  // };
  getService = () => {
    return this.get('service');
  };
  deleteService = (id) => {
    return this.delete('service/' + id);
  };
  getuserServices = (id) => {
    return this.get('service/ServiceUser/' + id);
  };

  // updateProduct = (_id, data) => {
  //   return this.put("products/" + _id, data);
  // };
  // getSingle = (_id) => {
  //   return this.get("products/" + _id);
  // };
}
let Services = new Service();
export default Services;
