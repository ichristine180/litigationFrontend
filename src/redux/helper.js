import axios from "axios";
import { setError, setLoading } from "./slice/globalSLice";
const baseUrl = process.env.REACT_APP_API_URI;
export const callApi = async (options) => {
  try {
    options.dispatch(setLoading(true));
    const config = {
      headers: {
        Authorization: `Bearer ${options.token}`,
        "Content-Type": "application/json", // Set content type if needed
      },
    };
    const res = await axios.post(baseUrl + options.url, options.body, config);
    console.log(res);
    options.dispatch(setLoading(false));
    console.log(res.data?.isSuccessfull)
    if (res.data?.isSuccessfull) return res.data;
    else throw new Error(res);
  } catch (error) {
    console.log(error);
    options.dispatch(setLoading(false));
    options.dispatch(setError(error.response?.data?.message));
  }
};
