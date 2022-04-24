import GenericServices from './GenericServices';
class Quiz extends GenericServices {
  // addProduct = (data) => {
  //   return this.post("products", data);
  // };
  getQuiz = () => {
    return this.get('quiz');
  };
  createQuiz = (data) => {
    return this.post('quiz', data);
  };
  deleteQuiz = (id) => {
    return this.delete('quiz/' + id);
  };
  updateQuiz = (id, data) => {
    return this.put('quiz/' + id, data);
  };
  getSubQuiz = (id) => {
    return this.get('quiz/' + id);
  };
  getSingleQuiz = (id) => {
    return this.get('quiz/single/' + id);
  };

  // updateProduct = (_id, data) => {
  //   return this.put("products/" + _id, data);
  // };
  // getSingle = (_id) => {
  //   return this.get("products/" + _id);
  // };
}
let QuizP = new Quiz();
export default QuizP;
