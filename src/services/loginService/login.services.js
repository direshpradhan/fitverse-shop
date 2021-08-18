import axios from "axios";
import { API_URL } from "../../util/Constants";

export function loginService(email, password) {
  return axios.post(`${API_URL}/login`, {
    email,
    password,
  });
}
