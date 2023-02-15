import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
	apiKey: "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",
});

const openai = new OpenAIApi(configuration);

router.route("/").get((req, res) => {
	res.status(200).json({ message: "sser" });
});

router.route("/").post(async (req, res) => {
	console.log(req.body);
	let prompt;
	if (req.body && req.body.prompt) {
		prompt = req.body.prompt;
	} else {
		return res.status(400).json({ error: "Prompt is missing" });
	}

	try {
		const aiResponse = await openai.createImage({
			prompt,
			n: 1,
			size: "256x256",
			response_format: "b64_json",
		});

		const image = aiResponse.data.data[0].b64_json;
		res.status(200).json({ photo: image });
	} catch (error) {
		console.error(error);
		res.status(500);
	}
});

export default router;
