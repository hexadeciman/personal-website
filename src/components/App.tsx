import { FaSmog } from 'react-icons/fa'
import './app.scss'

export default function App() {
  return (
    <div className="grid h-screen place-items-center bg-slate-200	">
      <a
        href="#"
        className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <FaSmog />
          Hexadeciman - boilerplate
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          A boilerplate for a React project using Tailwind and Vite is a
          pre-built template that provides a starting point for developing a
          modern web application. The boilerplate includes all the necessary
          dependencies, such as React, Tailwind CSS, and Vite, and a
          pre-configured webpack or vite configuration file that supports
          Tailwind CSS and other necessary plugins. It also includes a basic
          file structure for organizing source code, styles, assets, and other
          necessary files. Developers can use this boilerplate as a foundation
          to build their own React application without worrying about setting up
          the initial configuration and dependencies. By utilizing a
          boilerplate, developers can save time and focus on building out the
          unique features of their application.
        </p>
      </a>
    </div>
  )
}
