import axios from "axios";
import { config } from "@/core/config";

export const api = axios.create({
  baseURL: config.baseApiUri,
});
