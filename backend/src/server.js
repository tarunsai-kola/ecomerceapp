import express from "express";
import path from "path";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from '@clerk/express';
const app = express();

const __dirname = path.resolve();

app.use(clerkMiddleware());

app.get("/api/health", (req, res) => {

    res.status(200).json({ message: "ok" });
});

// MAKE OUR APP FOR THE PRODUCTION
if (env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../admin/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"));
    });
}


const server = app.listen(env.PORT, () => {
    console.log("Server is running on port 3000");
    connectDB();
});



export default server;
git add .;
 git commit -m "Fix backend: use @clerk/express, fix imports and server logic";
  git push origin main