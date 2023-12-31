import { Navigate, Outlet } from "react-router-dom";
import * as z from "zod";
export default function AuthLayout() {
	const isAuthenticated = false;

	return (
		<>
			{isAuthenticated ? (
				<Navigate to="/" />
			) : (
				<div className="flex">
					<section className="flex flex-1 justify-center items-center flex-col py-10">
						<Outlet />
					</section>
					<img
						src="/assets/images/side-img.svg"
						alt="Logo"
						className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
					/>
				</div>
			)}
		</>
	);
}
