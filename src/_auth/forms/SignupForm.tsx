import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { SignupSchema } from "@/lib/Validation";
import Loader from "@/components/shared/Loader";
import { Link } from "react-router-dom";

export default function SignupForm() {
	const isLoading = false;
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
		const newUser = false;
		console.log(values);
	}
	return (
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

					<Button type="submit" className="shad-button_primary">
						{isLoading ? (
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
	);
}
