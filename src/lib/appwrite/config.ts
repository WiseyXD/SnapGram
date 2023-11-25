import { Client, Account, Databases, Avatars, Storage } from "appwrite";

export const appwriteConfig = {
	projectId: import.meta.env.VITE_APPWRITE_PROJECT,
	appwriteUrl: import.meta.env.VITE_APPWRITE_URL,
	appwriteStorageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
	appwriteDatabaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
	appwriteUsersCollectionId: import.meta.env
		.VITE_APPWRITE_USERS_COLLECTIONS_ID,
	appwritePostsCollectionId: import.meta.env
		.VITE_APPWRITE_POSTS_COLLECTIONS_ID,
	appwriteSavesCollectionId: import.meta.env
		.VITE_APPWRITE_SAVES_COLLECTIONS_ID,
};

export const client = new Client();
export const account = new Account(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
export const databasese = new Databases(client);

client
	.setEndpoint(appwriteConfig.appwriteUrl)
	.setProject(appwriteConfig.projectId);

export { ID } from "appwrite";
