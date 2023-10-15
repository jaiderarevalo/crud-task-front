import { useEffect, useState,useContext } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store";
import {
  deleteTask,
  getTasks,
  updateTask,
} from "../store/actions/Tasks.action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { faSave } from "@fortawesome/free-regular-svg-icons";
import {
  TaskUserInterface,
  UpdateTaskUserInterface,
} from "../models/task.model";
import { useFormik } from "formik";
import SweetAlertContext from "../providers/SweetAlert.context";

function TableCopy() {
  const [editingTaskId, setEditingTaskId] = useState();
  const [beforeTask, setBeforeTask] = useState<UpdateTaskUserInterface>();
  const initial = {
    status: true,
    task: "",
    description: "",
  };

  const [statusForm, setStatusForm] = useState(initial);
  

  const dispatch = useAppDispatch();

  const onsubmit = (data: UpdateTaskUserInterface) => {
    const dataSend: any = {
      id: editingTaskId,
      body: {
        ...data,
        status: data.status ? 1 : 0,
      },
    };

    dispatch(updateTask(dataSend)).then((response) => {
      console.log(response);
    });
    if (
      beforeTask?.task !== data.task ||
      beforeTask?.description !== data.description ||
      beforeTask?.status != data.status
    ) {
    } else {
      console.log("el campo no se ah modificado");
    }
  };

  const { values, handleChange, handleSubmit,handleBlur } = useFormik({
    initialValues: statusForm,
    onSubmit: onsubmit,
    enableReinitialize: true,
  });
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);
  const { tasks = [] } = useSelector((root: RootState) => root.TasksUser);
  const [localTasks, setLocalTasks] = useState<TaskUserInterface[]>(tasks);

  console.log(tasks);

  const {alertConfirmation} = useContext(SweetAlertContext)
  const removeTask = (id: string) => {
		alertConfirmation({
			title: 'Eliminar imagen',
			text: '¿Está seguro de eliminar la imagen?',
			callback: () => {
				dispatch(
					deleteTask(id)
				);
			},
		});
    setLocalTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
	};
  return (
    <div className="">
      <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          <Link to="/dashboard/create-task">
            <FontAwesomeIcon icon={faArrowLeft} /> Devolver
          </Link>
        </span>
      </button>

      <div>
        <table className="w-full text-center bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white shadow-lg rounded-lg">
          <thead className="w-full bg-gradient-to-tr from-violet-700 to-black via-cyan-700">
            <tr className="rounded-md h-10">
              <th className="px-4">Tarea</th>
              <th className="px-4">Descripción</th>
              <th className="px-4">Tarea Pendiente</th>
              <th className="px-4">Acciones</th>
            </tr>
          </thead>

          <tbody className="bg-gradient-to-b from-cyan-700">
            {tasks.map((item: TaskUserInterface) => (
              <tr className="bg-gradient-to-b from-cyan-700" key={item.id}>
                <td className="cursor-pointer px-4 py-2">
                  {editingTaskId === item.id ? (
                    <div>
                      <input
                        type="text"
                        onChange={handleChange}
                        name="task"
                        value={values.task}
                        className="w-full p-2 text-black bg-white rounded-md focus:ring focus:ring-purple-500"
                      />
                    </div>
                  ) : (
                    item.task
                  )}
                </td>
                <td className="cursor-pointer px-4 py-2 whitespace-nowrap max-w-[10ch] overflow-hidden overflow-ellipsis">
                  {editingTaskId === item.id ? (
                    <div>
                      <input
                        type="text"
                        onChange={handleChange}
                        name="description"
                        value={values.description}
                        className="w-full p-2 bg-white text-black rounded-md focus:ring focus:ring-purple-500"
                      />
                    </div>
                  ) : (
                    item.description
                  )}
                </td>
                <td className="px-4 py-2">
                  <label className="relative inline-flex items-center mr-5 cursor-pointer">
                    <input
                      type="checkbox"
                      name="status"
                      className="sr-only peer"
                      onChange={handleChange}
                      checked={
                        editingTaskId == item.id ? values.status : item.status
                      }
                    />
                    <div className="w-11 h-6 bg-red-500 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-red-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-red-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-red-600 peer-checked:bg-red-600"></div>
                  </label>
                </td>
                <td className="px-4 py-2">
                  <div className="flex justify-center space-x-4">
                    <div>
                      <button
                        className="text-xl hover:text-red-500 hover:text-2xl"
                        type="button"
                        onClick={() => removeTask(item.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="text-xl hover:text-yellow-500 hover:text-2xl"
                        onClick={() => {
                          setBeforeTask(item);
                          setEditingTaskId(item.id);
                          setStatusForm({
                            ...item,
                          });
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </div>
                    <div>
                      <form onSubmit={handleSubmit} action="">
                        {editingTaskId == item.id ? (
                          <button
                           onBlur={handleBlur}
                            type="submit"
                            className="text-xl hover:text-green-500 hover:text-2xl"
                          >
                            <FontAwesomeIcon icon={faSave} />
                          </button>
                        ) : (
                          ""
                        )}
                      </form>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableCopy;
