import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api/v1",
  withCredentials: true,
});

export const signup = (userdata) => api.post('/signup', userdata);
export const login = (userdata) => api.post('/login', userdata);
export const createTodo = (userdata) => api.post('/createtodo', userdata);
// export const getTodo = async () => {
//   try {
//     const response = await api.get('/gettodo');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching todo:', error);
//     throw error; // Rethrow the error to be handled in the component
//   }
// };

export const updateTodo = async (id, userdata) => {
  try {
    const response = await api.post(`/update/${id}`, userdata)
    return response.data;
  } catch (error) {
    console.error("error in updating todo ", error);
    throw error;
  }
};

export const deleteTodo = (id) => api.delete(`/delete/${id}`);
export const logout = () => api.post('/logout');

export default api;
