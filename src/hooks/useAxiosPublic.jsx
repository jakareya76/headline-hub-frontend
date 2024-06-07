import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://back-end-headline-hub.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
