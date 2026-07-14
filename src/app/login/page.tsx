"use client";

import Header from "@/components/Header";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

import { usersService } from "@/services/users";
import { setStoredUser } from "@/lib/auth";

export default function LoginPage() {
	const router = useRouter();

	const { login } = useAuth();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleLogin = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();

		setError("");

		try {
			setLoading(true);

			const response =
				await usersService.signIn(
					email,
					password,
				);

			if (!response.success || !response.data) {
				throw new Error(
					response.message ||
						"Invalid credentials"
				);
			}

			const { user, token } = response.data;

			// AuthContext handles persistence
			login(user, token);


			if (
				user.role.toLowerCase() ===
				"admin"
			) {
				router.replace(
					"/admin/dashboard"
				);
				return;
			}

			const redirectPath =
				sessionStorage.getItem(
					"redirectAfterLogin"
				);

			sessionStorage.removeItem(
				"redirectAfterLogin"
			);

			router.replace(
				redirectPath || "/"
			);
		} catch (err: any) {
			console.error(
				"Login failed:",
				err
			);

			setError(
				err.message ||
					"Login failed"
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<Header />

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<div className="bg-white shadow-lg rounded-2xl p-8">
						<h1 className="text-3xl font-bold text-gray-900 mb-6">
							Welcome Back
						</h1>

						<form
							onSubmit={
								handleLogin
							}
							className="space-y-5"
						>
							{error && (
								<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
									{
										error
									}
								</div>
							)}

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Email
								</label>

								<input
									type="email"
									required
									value={
										email
									}
									onChange={(
										e
									) =>
										setEmail(
											e
												.target
												.value
										)
									}
									disabled={
										loading
									}
									className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none disabled:bg-gray-100"
									placeholder="you@example.com"
								/>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Password
								</label>

								<input
									type="password"
									required
									value={
										password
									}
									onChange={(
										e
									) =>
										setPassword(
											e
												.target
												.value
										)
									}
									disabled={
										loading
									}
									className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none disabled:bg-gray-100"
									placeholder="••••••••"
								/>
							</div>

							<button
								type="submit"
								disabled={
									loading
								}
								className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
							>
								{loading
									? "Logging in..."
									: "Login"}
							</button>
						</form>

						<p className="text-sm text-gray-600 mt-4 text-center">
							Don't have an account?{" "}
							<Link
								href="/signup"
								className="text-green-600 font-medium hover:underline"
							>
								Sign Up
							</Link>
						</p>
					</div>

					<div className="hidden lg:flex items-center justify-center">
						<div className="w-full h-96 bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500 text-center p-8">
							Welcome back to your food ordering platform.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}