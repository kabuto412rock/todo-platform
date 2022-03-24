import axios from "axios";

const API_URL = "/api/notes/";

// Create new note
const createNote = async (noteData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, noteData, config);
  return response.data;
};
// Get user notes
const getNotes = async (searchData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { page, limit, q, sort } = searchData;

  const response = await axios.get(
    API_URL + `?_page=${page}&_limit=${limit}&_q=${q}&_sort=${sort}`,
    config
  );
  return response.data;
};

// Get user note
const getNote = async (noteId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + `${noteId}`, config);
  return response.data;
};

// Update  note
const updateNote = async (noteId, formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + `${noteId}`, formData, config);
  return response.data;
};

// Delete note
const deleteNote = async (noteId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + `${noteId}`, config);
  return response.data;
};
const noteService = {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
};

export default noteService;
