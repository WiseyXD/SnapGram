import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { SignupSchema } from "@/lib/Validation";
import Loader from "@/components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";

import {
	useCreateNewUser,
	useSignInUser,
} from "@/lib/reactQuery/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { getAccount } from "@/lib/appwrite/api";

export default function SignupForm() {
	const { toast } = useToast();
	const navigate = useNavigate();

	const [isSignedin, setIsSignedin] = useState(null);

	const { isPending: isCreating, mutateAsync: createUser } =
		useCreateNewUser();
	const { isPending: isSigningIn, mutateAsync: signInUser } = useSignInUser();

	const { checkAuthUser, isPending: isUserLoggingIn } = useUserContext();

	const form = useForm<z.infer<typeof SignupSchema>>({
		resolver: zodResolver(SignupSchema),
		defaultValues: {
			name: "",
			username: "",
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof SignupSchema>) {
		const newUser = await createUser(values);
		console.log(newUser);

		if (!newUser) {
			return toast({
				title: "Signup Failed please try again.",
			});
		}

		const session = signInUser({
			email: values.email,
			password: values.password,
		});

		if (!session) {
			return toast({
				title: "Signup Failed please try again.",
			});
		}

		const response = await getAccount();
		console.log(response);

		const isLoggedIn = await checkAuthUser();

		if (isLoggedIn) {
			form.reset();
			navigate("/sign-in");
		} else {
			toast({
				title: "Signup Failed please try again in is loggedin.",
			});
		}
	}

	return (
		<>
			{isSignedin ? (
				<>
					Is Loggedin as {isSignedin?.name}
					<Button
						type="submit"
						className="shad-button_primary"
						// onClick={async () => {
						// 	await account.deleteSession("current");
						// 	setIsSignedin(null);
						// }}
					>
						{isSigningIn ? (
							<div className="flex-center gap-2">
								<Loader />
							</div>
						) : (
							"Logout"
						)}
					</Button>
				</>
			) : (
				<Form {...form}>
					<div className="sm:w-420 flex-center flex-col">
						<img src="/assets/images/logo.svg" alt="" />

						<h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
							Create a new Account
						</h2>
						<p className="text-light-3 small-medium md:base-regular mt-2">
							To use Snapgram enter your details
						</p>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="flex flex-col gap-5 w-full mt-4"
						>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<Input
											type="text"
											className="shad-input"
											{...field}
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input
												type="text"
												className="shad-input"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												type="email"
												className="shad-input"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												type="password"
												className="shad-input"
												{...field}
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>

							<Button
								type="submit"
								className="shad-button_primary"
							>
								{isSigningIn ? (
									<div className="flex-center gap-2">
										<Loader />
									</div>
								) : (
									"Sign up"
								)}
							</Button>
							<p className="text-small text-light-2 text-center">
								Already Have an Account ?
								<Link
									to="/sign-in"
									className="text-primary-500 text-small-semibold ml-1 hover:underline"
								>
									Log In
								</Link>
							</p>
						</form>
					</div>
				</Form>
			)}
		</>
	);
}
