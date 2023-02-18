import httpServer from "./app.js";

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
