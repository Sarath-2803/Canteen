"use client";

import Header from "@/components/Header";
import Link from "next/link";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";
import { usersService } from "@/services/users";

function SignUpForm() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const { login } = useAuth();

	const redirect =
		searchParams.get("redirect") || "/";

	const [firstName, setFirstName] =
		useState("");
	const [lastName, setLastName] =
		useState("");
	const [phone, setPhone] =
		useState("");
	const [email, setEmail] =
		useState("");
	const [password, setPassword] =
		useState("");
	const [confirmPassword, setConfirmPassword] =
		useState("");

	const [error, setError] =
		useState("");
	const [loading, setLoading] =
		useState(false);

	const handleSignUp = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();

		setError("");

		if (
			password !==
			confirmPassword
		) {
			setError(
				"Passwords do not match"
			);
			return;
		}

		if (password.length < 6) {
			setError(
				"Password must contain at least 6 characters."
			);
			return;
		}

		try {
			setLoading(true);

			const response =
				await usersService.signUp({
					firstName,
					lastName,
					phone,
					email,
					password,
					role: "customer",
				});

			if (
				!response.success ||
				!response.data
			) {
				throw new Error(
					response.message ||
						"Signup failed"
				);
			}

			const { user, token } = response.data;

			// Persist through AuthContext
			login(
				user,
				token
			);

			router.replace(
				redirect
			);
		} catch (err: unknown) {
			if(err instanceof Error) {
				console.error(
					"Signup failed:",
					err
				);
			

				setError(
					err.message ||
						"Failed to create account"
				);
			} else {
				console.error(
					"Signup failed:",
					err
				);
				setError("An unexpected error occurred");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
	<div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-gray-100">
		<Header />

		<div className="mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl items-center px-4 py-8 sm:px-6 lg:px-8">
			<div className="grid w-full grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2">

				{/* Left Panel */}

				<div className="hidden bg-gradient-to-br from-green-600 to-emerald-700 p-10 text-white lg:flex lg:flex-col lg:justify-center">

					<div className="max-w-md">
						<h1 className="mb-6 text-5xl font-bold leading-tight">
							Join Our
							<br />
							Canteen
						</h1>

						<p className="mb-8 text-lg text-green-100">
							Create your account and enjoy a fast,
							easy and secure food ordering experience.
						</p>

						<div className="space-y-4 text-green-100">

							<div className="flex items-center gap-3">
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
									🍽️
								</div>

								<span>Browse the complete menu</span>
							</div>

							<div className="flex items-center gap-3">
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
									⚡
								</div>

								<span>Quick checkout & payments</span>
							</div>

							<div className="flex items-center gap-3">
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
									📦
								</div>

								<span>Track your orders instantly</span>
							</div>

						</div>
					</div>

				</div>

				{/* Right Panel */}

				<div className="p-6 sm:p-10 lg:p-12">

					<div className="mx-auto max-w-md">

						<h2 className="text-3xl font-bold text-gray-900">
							Create Account
						</h2>

						<p className="mt-2 mb-8 text-gray-500">
							Start ordering delicious food today.
						</p>

						<form
							onSubmit={handleSignUp}
							className="space-y-5"
						>

							{error && (
								<div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
									{error}
								</div>
							)}

							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

								<div>
									<label className="mb-2 block text-sm font-medium text-gray-700">
										First Name
									</label>

									<input
										type="text"
										required
										disabled={loading}
										value={firstName}
										onChange={(e) =>
											setFirstName(
												e.target.value
											)
										}
										className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
										placeholder="John"
									/>
								</div>

								<div>
									<label className="mb-2 block text-sm font-medium text-gray-700">
										Last Name
									</label>

									<input
										type="text"
										required
										disabled={loading}
										value={lastName}
										onChange={(e) =>
											setLastName(
												e.target.value
											)
										}
										className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
										placeholder="Doe"
									/>
								</div>

							</div>

							<div>
								<label className="mb-2 block text-sm font-medium text-gray-700">
									Phone Number
								</label>

								<input
									type="tel"
									required
									disabled={loading}
									value={phone}
									onChange={(e) =>
										setPhone(
											e.target.value
										)
									}
									className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
									placeholder="+91XXXXXXXXXX"
								/>
							</div>

							<div>
								<label className="mb-2 block text-sm font-medium text-gray-700">
									Email
								</label>

								<input
									type="email"
									required
									disabled={loading}
									value={email}
									onChange={(e) =>
										setEmail(
											e.target.value
										)
									}
									className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
									placeholder="you@example.com"
								/>
							</div>

							<div>
								<label className="mb-2 block text-sm font-medium text-gray-700">
									Password
								</label>

								<input
									type="password"
									required
									disabled={loading}
									value={password}
									onChange={(e) =>
										setPassword(
											e.target.value
										)
									}
									className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
									placeholder="••••••••"
								/>
							</div>

							<div>
								<label className="mb-2 block text-sm font-medium text-gray-700">
									Confirm Password
								</label>

								<input
									type="password"
									required
									disabled={loading}
									value={confirmPassword}
									onChange={(e) =>
										setConfirmPassword(
											e.target.value
										)
									}
									className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none"
									placeholder="••••••••"
								/>
							</div>

							<button
								type="submit"
								disabled={loading}
								className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
							>
								{loading
									? "Creating Account..."
									: "Create Account"}
							</button>

						</form>

						<p className="mt-6 text-center text-sm text-gray-600">
							Already have an account?{" "}
							<Link
								href="/login"
								className="font-semibold text-green-600 hover:text-green-700"
							>
								Login
							</Link>
						</p>

					</div>

				</div>

			</div>
		</div>
	</div>
);
}

export default function SignUpPage() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen bg-gray-50">
					<Header />

					<div className="flex items-center justify-center py-20">
						<div className="text-gray-600">
							Loading...
						</div>
					</div>
				</div>
			}
		>
			<SignUpForm />
		</Suspense>
	);
}