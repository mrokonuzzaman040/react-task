import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://contact.mediusware.com",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
