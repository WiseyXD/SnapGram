import {
	useQuery,
	useMutation,
	useQueryClient,
	useInfiniteQuery,
} from "@tanstack/react-query";
import { createUser, signInUser } from "../appwrite/api";
import { INewUser } from "@/types";

export const useCreateNewUser = () => {
	return useMutation({
		mutationFn: (user: INewUser) => createUser(user),
	});
};

export const useSignInUser = () => {
	return useMutation({
		mutationFn: (user: { email: string; password: string }) =>
			signInUser(user),
	});
};
