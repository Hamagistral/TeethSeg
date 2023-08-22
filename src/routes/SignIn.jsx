import Footer from "../components/Footer";
import Header from "./../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { auth } from "../config/firebase";
import {
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
} from "firebase/auth";
import Oauth from "../components/Oauth";

function SignIn() {
	const [user, setUser] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
				navigate("/");
			} else {
				setUser(null);
			}
		});

		return () => unsubscribe();
	}, []);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			email: Yup.string().email().required(),
			password: Yup.string().required("password is required").min(8),
		}),
		onSubmit: async (values, { setSubmitting, setFieldError }) => {
			await signInWithEmailAndPassword(
				auth,
				values.email,
				values.password
			)
				.then((user) => {
					setUser(user);
				})
				.catch((error) => {
					console.log(error.message);
					setFieldError(
						"email",
						"The email or password you entered do not match. Please try again."
					);
				})
				.finally(() => {
					setSubmitting(false);
				});
		},
		validateOnChange: false,
		validateOnBlur: false,
	});

	const resetPassword = async () => {
		try {
			await sendPasswordResetEmail(auth, formik.values.email);
			formik.resetForm();
			alert("Password reset email sent.");
		} catch (error) {
			formik.setFieldError(
				"email",
				"Password reset failed. Please check your email."
			);
		}
	};

	return (
		<div className="flex-box flex-col">
			<Header />
			<div className="text-center text-white w-full py-10 flex-box flex-col scroll-smooth gradient-form h-full bg-slate-800">
				<div className="container h-full p-10">
					<div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
						<div className="w-full">
							<div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
								<div className="g-0 lg:flex lg:flex-wrap">
									<div className="px-4 md:px-0 lg:w-6/12">
										<div className="md:mx-6 md:p-12">
											<div className="text-center">
												<img
													className="mx-auto pt-5 w-20 h-20"
													src="logo.png"
													alt="logo"
												/>
												<h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
													<span className="text-white text-3xl font-bold">
														Teeth
													</span>
													<span className="text-white text-3xl font-light">
														Seg
													</span>
												</h4>
											</div>
											{/* login form start here */}
											<form
												onSubmit={formik.handleSubmit}
											>
												<div>
													<p className="mb-4">
														Please login to your
														account
													</p>
													<div class="mb-4">
														<label
															for="email"
															className="mb-2 text-sm font-medium text-neutral-500 dark:text-neutral-200 flex"
														>
															Username
														</label>
														<input
															type="text"
															id="email"
															className={` ${
																formik.errors
																	.email
																	? "border-red-500 border-2 bg-white  dark:border-red-500 text-sm rounded-lg focus:ring-primary dark:bg-gray-700 dark:text-neutral-200 dark:placeholder-neutral-400 dark:focus:ring-primary dark:border-primary block w-full p-2.5"
																	: "bg-white border border-neutral-300 dark:border-neutral-700 text-sm rounded-lg focus:ring-primary dark:bg-gray-700 dark:text-neutral-200 dark:placeholder-neutral-400 dark:focus:ring-primary dark:border-primary block w-full p-2.5"
															}`}
															placeholder="Username"
															value={
																formik.values
																	.email
															}
															onChange={
																formik.handleChange
															}
															onBlur={
																formik.handleBlur
															}
														/>
														{formik.touched.email &&
															formik.errors
																.email && (
																<p class="mt-2 text-sm text-red-500 dark:text-red-500">
																	<span class="font-medium"></span>{" "}
																	{
																		formik
																			.errors
																			.email
																	}
																</p>
															)}
													</div>

													<div
														className="relative mb-4"
														data-te-input-wrapper-init
													>
														<label
															htmlFor="password"
															className="mb-2 text-sm font-medium text-neutral-500 dark:text-neutral-200 flex"
														>
															Password
														</label>
														<input
															type="password"
															id="password"
															name="password"
															className={` ${
																formik.errors
																	.email
																	? "border-red-500 border-2 bg-white  dark:border-red-500 text-sm rounded-lg focus:ring-primary dark:bg-gray-700 dark:text-neutral-200 dark:placeholder-neutral-400 dark:focus:ring-primary dark:border-primary block w-full p-2.5"
																	: "bg-white border border-neutral-300 dark:border-neutral-700 text-sm rounded-lg focus:ring-primary dark:bg-gray-700 dark:text-neutral-200 dark:placeholder-neutral-400 dark:focus:ring-primary dark:border-primary block w-full p-2.5"
															}`}
															placeholder="Password"
															value={
																formik.values
																	.password
															}
															onChange={
																formik.handleChange
															}
															onBlur={
																formik.handleBlur
															}
														/>
													</div>

													<div>
														{formik.touched
															.password &&
															formik.errors
																.password && (
																<div className="text-red-500 my-6">
																	{
																		formik
																			.errors
																			.password
																	}
																</div>
															)}
													</div>
													<div className="mb-12 pb-1 pt-1 text-center">
														<button
															className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] bg-gradient-to-r from-[#ee7724] to-[#b44593]"
															type="submit"
															data-te-ripple-init
															data-te-ripple-color="light"
															disabled={
																formik.isSubmitting
															}
														>
															Log in
														</button>

														<Link
															to="#"
															onClick={() =>
																resetPassword()
															}
														>
															forgot password?
														</Link>
													</div>

													<div className="flex justify-end pb-6">
														<Link
															to="/sign-up"
															className="mb-0 mr-2 hover:underline text-neutral-500 transition duration-150 ease-in-out hover:text-neutral-700 dark:hover:text-neutral-200"
														>
															Don`t have an
															account?
														</Link>
													</div>
													<Oauth auth={auth} />
												</div>
											</form>

											{/* login form end here */}
										</div>
									</div>

									<div className="flex-box rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none bg-gradient-to-r from-[#ee7724] to-[#b44593]">
										<div className="flex-box flex-col px-4 py-6 text-white md:mx-6 md:p-12">
											<h4 className="mb-6 text-xl font-semibold">
												We are more than just Employees
											</h4>
											<p className="text-sm">
												We Are Interns
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}

export default SignIn;
