import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { FormField, Loader } from "../components";
import { getRandomPrompt } from "../utils";

export const CreatePost = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		name: "",
		prompt: "",
		photo: "",
	});

	function alert(e) {
		e.preventDefault();
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text:
				"Dalle-AI  is no longer free, therefore I have to block  sharing feature to prevent over using, I am unumployed after all and  cant  afford it",
			footer: "***/You can help me improve by hiring me/***",
		});
	}
	const [generatingImg, setGeneratingImg] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleChange = (e) =>
		setForm({ ...form, [e.target.name]: e.target.value });
	console.log(form);
	const handleSurpriseMe = () => {
		const randomPrompt = getRandomPrompt(form.prompt);
		setForm({ ...form, prompt: randomPrompt });
	};
	const generateImage = async (prompt) => {
		if (prompt) {
			try {
				setGeneratingImg(true);
				const response = await fetch("http://localhost:8080/api/v1/dalle", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ prompt: form.prompt }),
				});

				const data = await response.json();
				setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
			} catch (err) {
				console.log(err);
			} finally {
				setGeneratingImg(false);
			}
		} else {
			alert("There has to be some mistakes");
		}
	};

	function handleSubmit(e) {
		e.preventDefault();
		return false;
	}

	return (
		<section className="max-w-7xl mx-auto">
			<div>
				<h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
				<p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
					Generate an imaginative image through DALL-E AI and share it with the
					community
				</p>
			</div>
			<form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
				<div className="flex flex-col gap-5">
					<FormField
						labelName="Prompt"
						type="text"
						name="prompt"
						placeholder="An Impressionist oil painting of sunflowers in a purple vase???"
						value={form.prompt}
						handleChange={handleChange}
						handleSupriseMe={handleSurpriseMe}
					/>

					<div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
						{form.photo ? (
							<img
								src={form.photo}
								alt={form.prompt}
								className="w-full h-full object-contain"
							/>
						) : (
							<img
								src={preview}
								alt="preview"
								className="w-9/12 h-9/12 object-contain opacity-40"
							/>
						)}

						{generatingImg && (
							<div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
								<Loader />
							</div>
						)}
					</div>
				</div>

				<div className="mt-5 flex gap-5">
					<button
						type="button"
						onClick={generateImage}
						className=" text-white bg-green-700 hover:bg-green-800 duration-150 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
					>
						{generatingImg ? "Generating... might take sometime" : "Generate"}
					</button>
				</div>

				<div className="mt-10">
					<p className="mt-2 text-[#666e75] text-[14px]">
						** Once you have created the image you want, you can share it with others
						in the community **
					</p>
				</div>
			</form>{" "}
			<button
				className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
				onClick={alert}
			>
				Share with the Community
			</button>
		</section>
	);
};

export default CreatePost;
