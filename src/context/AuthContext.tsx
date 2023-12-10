import React, { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "@/types";
import { getCurrentAccount } from "@/lib/appwrite/api";
import { useNavigate } from "react-router-dom";

// I am getting an account but late mil rah hai , means last login next login mai dekh rah hai !
// Bug can not be solved
export const INITIAL_USER = {
	id: "",
	name: "",
	username: "",
	email: "",
	bio: "",
	imageUrl: "",
};

export const INITIAL_STATE = {
	user: INITIAL_USER,
	isLoading: false,
	isAuthenticated: false,
	setUser: () => {},
	setIsAuthenticated: () => {},
	checkAuthUser: async () => false as boolean,
};

type IContextType = {
	user: IUser;
	isLoading: boolean;
	setUser: React.Dispatch<React.SetStateAction<IUser>>;
	isAuthenticated: boolean;
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
	checkAuthUser: () => Promise<boolean>;
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<IUser>(INITIAL_USER);
	const [isLoading, setIsLoading] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const navigate = useNavigate();

	const checkAuthUser = async () => {
		try {
			const currentAccount = await getCurrentAccount();
			setIsLoading(true);
			if (currentAccount) {
				setUser({
					id: currentAccount.$id,
					name: currentAccount.name,
					username: currentAccount.username,
					email: currentAccount.email,
					bio: currentAccount.bio,
					imageUrl: currentAccount.imageUrl,
				});

				setIsAuthenticated(true);

				return true;
			}
			return false;
		} catch (error) {
			console.log(error);
			return false;
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (
			localStorage.getItem("cookieFallback") === "[]" ||
			localStorage.getItem("cookieFallback") === null
		) {
			navigate("/sign-in");
		}

		checkAuthUser();
	}, []);

	const value = {
		user,
		isLoading,
		isAuthenticated,
		setUser,
		setIsAuthenticated,
		checkAuthUser,
	};

	return (
		<div>
			<AuthContext.Provider value={value}>
				{children}
			</AuthContext.Provider>
		</div>
	);
};
export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);
