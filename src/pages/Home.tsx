import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks, faList } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className=" min-h-screen flex flex-col justify-center items-center bg-[url('img/img-Home.jpg')] bg-repeat-x bg-cover">
      <header className="bg-blue-500 text-white py-4 px-8 w-full">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faTasks} className="text-2xl mr-2" />
            <h1 className="text-3xl font-semibold">Tu Lista de Tareas</h1>
          </div>
          <nav>
          </nav>
        </div>
      </header>
      <main className="container mx-auto flex-grow p-8">
        <section className="text-center">
          <h2 className="text-4xl font-semibold mb-4">Bienvenido a Tu Lista de Tareas</h2>
          <p className="text-gray-600 text-lg mb-8">
            Organiza tus tareas de manera eficiente y nunca pierdas el rumbo.
          </p>
          <Link to="/register" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
            Comenzar
          </Link>
        </section>
        <section className="mt-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 md:pr-8">
              <h3 className="text-2xl font-semibold mb-4">Características Principales</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <FontAwesomeIcon icon={faList} className="text-blue-500 mr-2 mt-1" />
                  <p>Gestiona tus tareas de manera efectiva.</p>
                </li>
                <li className="flex items-start">
                  <FontAwesomeIcon icon={faList} className="text-blue-500 mr-2 mt-1" />
                  <p>Prioriza tus tareas y mantén el control.</p>
                </li>
                <li className="flex items-start">
                  <FontAwesomeIcon icon={faList} className="text-blue-500 mr-2 mt-1" />
                  <p>Accede a tus tareas desde cualquier lugar.</p>
                </li>
              </ul>
            </div>
           
          </div>
        </section>
      </main>
      <footer className="bg-gray-200 py-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">&copy; 2023 Tu Lista de Tareas. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
