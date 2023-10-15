import { TasksUser } from "../interfaces/user.interface";
import { RootState, useAppDispatch } from "../store";
import { TaskUser, getTask } from "../store/actions/Tasks.action";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks } from "@fortawesome/free-solid-svg-icons";
import { setLogout } from "../store/reducer/auth.slice";
function Tasks() {
  const initial = {
    id: "",
    task: "",
    description: "",
    status: false,
  };
  const schemaValidateTasks = Yup.object({
    task: Yup.string().required("Campo requerido"),
    description: Yup.string().required("Campo requerido"),
  });

  const { id } = useParams();
  console.log(id);

  const { user } = useSelector((root: RootState) => root.auth);
  useEffect(() => {
    const loadTask = async () => {
      if (id) {
        try {
          const tas = await dispatch(getTask(id));
          console.log(tas);
        } catch (error) {
          // Manejar el error si es necesario
          console.error("Error al cargar la tarea:", error);
        }
      }
    };

    loadTask();
  }, [id]);
  const dispatch = useAppDispatch();
  const onSubmit = (data: TasksUser) => {
    console.log(data);
    const statusValue = data.status ? 1 : 0;
    const adjustData = { ...data, status: statusValue };
    dispatch(TaskUser(adjustData)).then((response) => {
      return response;
    });
  };
  const { handleChange, values, handleSubmit, handleBlur, errors } =
    useFormik<TasksUser>({
      initialValues: initial,
      onSubmit: onSubmit,
      enableReinitialize: true,
      validationSchema: schemaValidateTasks,
    });

  const handlelogout = () => {
    dispatch(setLogout());
  };
  return (
    <div>
      <div className="grid grid-cols-2">
        <div className="  rounded-xl p-12 text-black ">
          <div>
            <h1 className="text-4xl font-semibold">
              ¡Bienvenid@,
              <span className="capitalize text-blue-500">{user?.name}</span>!
            </h1>
            <p className="mt-4 text-lg">
              Gracias por escogernos. Estamos encantados de tenerte aquí.
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-red-600 text-white font-semibold  px-2 w-48 h-10 rounded-full"
            onClick={handlelogout}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
      <div className="min-h-screen bg-gray-100 py-6  flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl w-2/6 sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-3xl text-center font-semibold">Tasks</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      type="text"
                      name="task"
                      value={values.task}
                      onChange={handleChange}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                     
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                      Tarea
                    </label>
                    {errors.task && (
                      <p className="text-red-500 text-xs">{errors.task}</p>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                   
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                      Descripción
                    </label>
                    {errors.description && (
                      <p className="text-red-500 text-xs">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div>
                    <div>
                      <label className="text-base">Tarea Pendiente</label>
                    </div>
                    <label className="relative inline-flex items-center mr-5 cursor-pointer">
                      <input
                        type="checkbox"
                        name="status"
                        onChange={handleChange}
                        value={values.status}
                        className="sr-only peer"
                        defaultChecked={true}
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <form onSubmit={handleSubmit} className="relative">
                    <button
                      className="bg-blue-500 text-white rounded-md px-2 py-1"
                      onBlur={handleBlur}
                      type="submit"
                    >
                      Enviar
                    </button>
                    <div className="text-center space-x-3">
                      Deseas ver las tareas?
                      <span>
                        {" "}
                        <Link
                          className="hover:text-xl hover:text-blue-600 hover:duration-700"
                          to="/dashboard/tasks"
                        >
                          ver
                        </Link>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
