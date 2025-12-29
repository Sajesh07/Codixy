import express from "express";
import dotenv from "dotenv";
import { ENV } from "./lib/env.js";
import path from "path";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import exp from "constants";
import { inngest, functions } from "./lib/inngest.js";
import {serve} from "inngest/express";


dotenv.config();

const app = express();
const __dirname = path.resolve();

app.use(express.json());
//credentials:true meaning is that server allows a browser to include cookies on request
app.use(cors({origin: ENV.CLIENT_URL, credentials:true}));

app.use("/api/inngest", serve({client: inngest, functions}))


app.get("/test", (req, res) => {
  res.send("Successfully connected to the server");
});



//make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const startServer = async () =>{
    try {
        await connectDB();
        app.listen(ENV.PORT, () => {
            console.log(`Server is running on port ${ENV.PORT}`);
          });
    } catch (error) {
        console.error("Error starting the server", error);
    }
}

startServer();
export default app;
