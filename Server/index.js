import express from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import cors from "cors";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

import connectDB from "./mongodb/connect.js";

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", async (req, res) => {
	res.send("hello frosdsdm Dale");
});

const startServer = async () => {
	try {
		connectDB(process.env.MONGODB_URL);
		app.listen(8080, () =>
			console.log("server has been started on port http://localhost:8080")
		);
	} catch (error) {}
};

startServer();
