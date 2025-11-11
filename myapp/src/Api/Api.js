import axios from "axios";

// Named export for API instance
export const API = axios.create({ baseURL: "http://localhost:3000" });

/* ================= USERS ================= */
export const getUsers = () => API.get("/users");
export const getUserById = (id) => API.get(`/users/${id}`);
export const updateUser = (id, data) => API.put(`/users/${id}`, data);

/* ================= TASKS ================= */
export const getTasks = () => API.get("/tasks");
export const addTask = (task) => API.post("/tasks", task);
export const updateTask = (id, task) => API.put(`/tasks/${id}`, task);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);

/* ================= REWARDS ================= */
export const getRewards = () => API.get("/rewards");
export const redeemReward = (id) => API.delete(`/rewards/${id}`);

/* ================= LEADERBOARD ================= */
export const getLeaderboard = () => API.get("/leaderboard");

/* ================= HISTORY ================= */
export const getHistory = () => API.get("/history");
export const addHistory = (record) => API.post("/history", record);

/* ================= REFERRALS ================= */
export const getReferrals = () => API.get("/referrals");
