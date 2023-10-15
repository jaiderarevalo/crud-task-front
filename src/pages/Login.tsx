import { RootState, useAppDispatch } from "../store";
import { LoginUser } from "../store/actions/auth.action";
import { login } from "../interfaces/user.interface";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
function Login() {
  const initial = {
    email: "jaider12@gmail.com",
    password: "123456789",
  };
  const schemaValidateLogin = Yup.object({
    email: Yup.string().email("Correo no valido").required("Campo requerido"),
    password: Yup.string()
      .min(4, "Minimo 8 caracteres")
      .required("Campo requerido"),
  });
  const { isLogin } = useSelector((root: RootState) => root.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isLogin) {
      navigate("/dashboard/create-task");
    }
  }, [isLogin]);
  const onSubmit = (data: login) => {
    console.log(data);

    dispatch(LoginUser(data)).then((response) => {
      console.log(response);

      if (response.type === "user/registerUser/fulfilled") {
        alert("Usuario registrado");
      }
      if (response.type === "user/registerUser/rejected") {
        alert("El usuario ya existe");
      }
    });
  };
  const { values, handleChange, handleSubmit, handleBlur, errors } =
    useFormik<login>({
      initialValues: initial,
      onSubmit: onSubmit,
      enableReinitialize: true,
      validationSchema: schemaValidateLogin,
    });

  return (
    <div className="font-sans bg-gradient-to-tr from-green-300 to-purple-400  h-full    ">
      <div className=" h-screen flex flex-col sm:justify-center items-center  ">
        <div className="relative sm:max-w-sm w-full">
          <div className="card bg-green-400 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"></div>
          <div className="card bg-purple-400 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"></div>
          <div className="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md">
            <label className="block mt-3 text-sm text-gray-700 text-center font-semibold">
              Login
            </label>
            <div className="mt-10">
              <div className="mt-7">
                <label className="block text-sm text-gray-700">E-mail</label>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  onChange={handleChange}
                  name="email"
                  value={values.email}
                  className="mt-1 block px-1 w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}

              <div className="mt-7">
                <label className="block text-sm text-gray-700">
                  Contraseña
                </label>
                <input
                  type="password"
                  placeholder="Contraseña"
                  onChange={handleChange}
                  name="password"
                  value={values.password}
                  className="mt-1 px-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
              <form onSubmit={handleSubmit} className="mt-7">
                <button
                  className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                  type="submit"
                  onBlur={handleBlur}
                >
                  Ingresar
                </button>
              </form>

              <div className="mt-7">
                <div className="flex justify-center items-center">
                  <label className="mr-2">¿No tienes cuenta?</label>
                  <Link
                    to="/register"
                    className="text-blue-500 transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                  >
                    Crear cuenta
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
