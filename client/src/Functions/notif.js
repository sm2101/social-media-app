import axios from "axios";

export const getNotif = async () => {
  return await axios.get("/api/notifications");
};

export const migrateAll = async () => {
  return await axios.get("/api/notifications/migrate/all");
};
