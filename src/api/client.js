import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "https://fortitrade-ai.vercel.app/";

const client = axios.create({
  baseURL: API_BASE,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("forti_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("forti_token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export const authApi = {
  register: (name, email, password) => client.post("/auth/register", { name, email, password }),
  login: (email, password) => client.post("/auth/login", { email, password }),
  me: () => client.get("/auth/me"),
  updateProfilePic: (imageDataUrl) => client.patch("/auth/profile-pic", { image: imageDataUrl }),
  deleteProfilePic: () => client.delete("/auth/profile-pic"),
  deleteAccount: () => client.delete("/auth/account"),
};

export const tradingApi = {
  createTrade: (trade) => client.post("/trades", trade, {
    headers: { "X-Device-Fingerprint": getDeviceFingerprint() },
  }),
  listTrades: () => client.get("/trades"),
  deleteTrade: (id) => client.delete(`/trades/${id}`),
};

export const fraudApi = {
  getAlerts: () => client.get("/fraud/alerts"),
};

function getDeviceFingerprint() {
  let fp = localStorage.getItem("forti_device_fp");
  if (!fp) {
    fp = `dev-${Math.random().toString(36).slice(2)}-${Date.now()}`;
    localStorage.setItem("forti_device_fp", fp);
  }
  return fp;
}

export default client;