import server from "./app";
import { PORT } from "./config/configEnv";

const port = PORT || 5000;

server.listen(port, () => console.log("Server running on port 5000"));