import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { logo } from "./assets";
import { Home, CreatePost } from "./pages";

function App() {
	const [count, setCount] = useState(0);

	return (
		<BrowserRouter>
			<header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
				<Link to="/create-post">
					<img src={logo} alt="logo" className="w-28 object-contain" />
				</Link>

				<img
					src="https://www.kindpng.com/picc/m/430-4305250_transparent-crazy-cat-clipart-png-clipart-funny-stickers.png"
					alt=""
					className="h-16"
				/>
			</header>
			<main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/create-post" element={<CreatePost />} />
				</Routes>
			</main>
		</BrowserRouter>
	);
}

export default App;
