import React from "react";

function FormField({
	labelName,
	type,
	name,
	placeholder,
	value,
	handleChange,
	isSupriseMe,
	handleSupriseMe,
}) {
	return (
		<div>
			<div className="flex items-center gap-2 mb-2">
				<label htmlFor={name} className="block text-sm font-medium">
					{labelName}
				</label>
				<button
					type="button"
					onClick={handleSupriseMe}
					className="font-semibold ml-2  bg-purple-400 rounded-md text-sm hover:bg-green-400 duration-200 p-2"
				>
					Suprise Me
				</button>
			</div>

			<input
				type={type}
				id={name}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
				required
				className="outline-none py-2 px-2 bg-gray-100 border focus:ring-blue focus:border-blue-500 border-gray-200 text-gray-900 text-sm rounded-lg  block w-3/4"
			/>
		</div>
	);
}

export default FormField;
