import { useAppDispatch } from "../store";
import { verifyToken } from "../store/actions/auth.action";
import React,{ useEffect } from "react";
import { setLogin } from "../store/reducer/auth.slice";

type Props = {
  children: React.ReactElement;
};


const AuthVerify = ({ children }: Props) => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		const token = localStorage.getItem('token');

		dispatch(verifyToken(token)).then(response => {
			if (response.type === 'auth/verifyToken/fulfilled') {
				dispatch(setLogin(response.payload))
			}
		})

	}, []);

	return <>{children}</>;
};

export default AuthVerify;