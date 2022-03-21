import axios from "axios";

// const API = "http://localhost:3001/api";

const API = "https://qwikskills-backend.herokuapp.com/api";

const instance = axios.create({
  baseURL: API,
});

export default instance;
