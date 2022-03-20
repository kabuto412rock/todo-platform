import axios from "axios";

const API_URL = "/api/todos/";

// Create new todo
const createTodo = async (todoData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, todoData, config);
  return response.data;
};
// Get user todos
const getTodos = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get user todo
const getTodo = async (todoId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + `${todoId}`, config);
  return response.data;
};

// Update  todo
const updateTodo = async (todoId, formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + `${todoId}`, formData, config);
  return response.data;
};

const todoService = {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
};

export default todoService;
