import React, { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "@/types";

export const INITIAL_USER = {
	id: "",
	name: "",
	username: "",
	email: "",
	bio: "",
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
	// Exam Da
	const checkAuthUser = async () => {
		try {
			const currentAccount = await getCurrentAccount();
		} catch (error) {
			console.log(error);
			return false;
		} finally {
			setIsLoading(false);
		}
	};

	const value = {
		user,
		isLoading,
		isAuthenticated,
		setUser,
		setIsAuthenticated,
		checkAuthUser: async () => false as boolean,
	};
	// Exam Day
	return (
		<div>
			<AuthContext.Provider value={value}>
				{children}
			</AuthContext.Provider>
		</div>
	);
};
export default AuthContext;
// Working on CHeck Auth
