import { Client, Account } from "appwrite";

export const client = new Client();

client
	.setEndpoint("https://cloud.appwrite.io/v1")
	.setProject("655669de89839d0721a4");

export const account = new Account(client);
export { ID } from "appwrite";
