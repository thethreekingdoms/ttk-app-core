import app_test from "./app-test";
import app_test2 from "./app-test2";

const obj = {

  [app_test.name]: app_test,
  [app_test2.name]: app_test2,


};
window.publicModule && window.publicModule.callback(obj, "test");

export default obj;
