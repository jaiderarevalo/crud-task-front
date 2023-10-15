import { RootState, useAppDispatch } from "../store";
import { registerUser } from "../store/actions/auth.action";
import { register } from "../interfaces/user.interface";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";

function Register() {
  const initial = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const schemaValidateRegister = Yup.object({
    name: Yup.string().required("Campo requerido"),
    email: Yup.string().email("Correo no valido").required("Campo requerido"),
    password: Yup.string()
      .min(4, "Minimo 8 caracteres")
      .required("Campo requerido"),
    confirmPassword: Yup.string().required("Campo requerido"),
  });

  const { isRegister } = useSelector((root: RootState) => root.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = (data: register) => {
    dispatch(registerUser(data)).then((response) => {
      console.log(response);
      if (response.type === "auth/registerUser/fulfilled") {
        if (isRegister) {
          navigate("/login");
        }
        resetForm();
      }
      if (response.type === "auth/registerUser/rejected") {
        alert("El usuario ya existe");
      }
    });
  };

  const { values, handleChange, handleSubmit, resetForm ,errors} = useFormik({
    initialValues: initial,
    onSubmit: onSubmit,
    enableReinitialize: true,
    validationSchema: schemaValidateRegister
  });

  return (
    <div className="font-sans  ">
      <div className="relative h-screen flex flex-col sm:justify-center items-center bg-gradient-to-tr from-red-400 to-blue-400  w-full ">
        <div className="relative sm:max-w-sm w-full">
          <div className="card bg-blue-400 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"></div>
          <div className="card bg-red-400 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"></div>
          <div className="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md">
            <label className="block mt-3 text-sm text-gray-700 text-center font-semibold">
              Regístrate
            </label>
            <div className="mt-10">
              <div>
                <label className="block text-sm text-gray-700">Nombres</label>
                <input
                  type="text"
                  placeholder="Nombres"
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  className="mt-1 block w-full px-1 border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
              <div className="mt-7">
                <label className="block text-sm text-gray-700">E-mail</label>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
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
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  className="mt-1 px-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
              <div className="mt-7">
                <label className="block text-sm text-gray-700">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  placeholder="Confirmar Contraseña"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full px-1 border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}

              <form onSubmit={handleSubmit} className="mt-7">
                <button
                  className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                  type="submit"
                >
                  Registrar
                </button>
              </form>

              <div className="mt-7">
                <div className="flex justify-center items-center">
                  <label className="mr-2">¿Ya tienes una cuenta?</label>
                  <Link
                    to="/login"
                    className="text-blue-500 transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                  >
                    Iniciar sesión
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

export default Register;
