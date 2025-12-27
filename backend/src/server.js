import express from "express";
import dotenv from "dotenv";
import { ENV} from "./lib/env.js";
import path from "path";

dotenv.config();

const app = express();
const __dirname = path.resolve();



app.get("/test", (req, res) => {
    res.send("Successfully connected to the server");
})

//make our app ready for deployment
if(ENV.NODE_ENV === "production"){
     app.use(express.static(path.join(__dirname, "../frontend/dist")));

     app.get("/{*any}", (req, res)=> {
        res.send(path.join(__dirname, "../frontend","dist", "index.html"));
     })
}

app.listen(ENV.PORT, () => {
    console.log(`Server is running on port ${ENV.PORT}`);
})
export default app;
