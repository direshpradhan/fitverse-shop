import { API_URL } from "../../util/Constants";

export function signupService(name, email, password) {
  return axios.post(`${API_URL}/signup`, { name, email, password });
}
