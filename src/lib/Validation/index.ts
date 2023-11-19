import * as z from "zod";
export const SignupSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Name too short" })
		.max(50, { message: "Name too Long" }),
	username: z
		.string()
		.min(2, { message: "username too short" })
		.max(50, { message: "username too long" }),
	email: z.string().email(),
	password: z.string().min(8, { message: "Password too weak" }),
});
