import Vue from "vue";
import axios from "axios";

Vue.prototype.$axios = axios;

const axiosInstance = axios.create({
  baseURL: process.env.API,
});

export { axiosInstance };
