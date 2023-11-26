import { ID } from "appwrite";
import { INewUser } from "@/types";
import { account, avatars, databasese, appwriteConfig } from "./config";

export async function createUser(user: INewUser) {
	try {
		const newAccount = await account.create(
			ID.unique(),
			user.email,
			user.password,
			user.name
		);

		if (!newAccount) {
			throw Error;
		}

		const avatarUrl = avatars.getInitials(user.name);

		const savedUser = saveUserToDB({
			name: newAccount.name,
			email: newAccount.email,
			accountId: newAccount.$id,
			imageUrl: avatarUrl,
			username: user.username,
		});

		return newAccount;
	} catch (err) {
		console.log(err);
	}
}

export async function saveUserToDB(user: {
	name: string;
	email: string;
	accountId: string;
	imageUrl: URL;
	username?: string;
}) {
	{
		try {
			const newUser = await databasese.createDocument(
				appwriteConfig.appwriteDatabaseId,
				appwriteConfig.appwriteUsersCollectionId,
				ID.unique(),
				user
			);
			return newUser;
		} catch (err) {
			console.log(err);
		}
	}
}

export async function signInUser(user: { email: string; password: string }) {
	try {
		const session = account.createEmailSession(user.email, user.password);
		return session;
	} catch (error) {
		console.log(error);
	}
}
