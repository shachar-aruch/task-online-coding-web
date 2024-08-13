import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "https://task-online-coding-server-production.up.railway.app/";

export const socket = io(URL);
socket.connect();
