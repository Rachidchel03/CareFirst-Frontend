import axios from "axios";

// pick up your Render (or localhost) backend URL from env
const API = process.env.REACT_APP_BACKEND_URL || "";

// create a shared client
const client = axios.create({
  baseURL: API,
  // you can add headers, interceptors, etc, here
});

export async function fetchBestemming(address) {
  // no more hard-coded localhost: use the client baseURL
  const resp = await client.get("/api/bestemming", { params: { address } });
  return resp.data;  // { bestemming: [...] }
}

export default client;
