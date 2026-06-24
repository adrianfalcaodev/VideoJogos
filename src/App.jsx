import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import JogosPage from './pages/JogosPage'
import RootLayout from './components/rootLayout'
import ErrorPage from './pages/ErrorPage'
import TheLast from './pages/theLast'
import ItTakesTwoPage from './pages/itTakesTwoPage'
import UnchartedPage from './pages/unchartedPage'
import CodPage from './pages/codPage'

export default function App() {
 const router = createBrowserRouter([
 {path: "/", element: <RootLayout />, children: [
  {path: "/", errorElement: <ErrorPage />, element: <HomePage />},
  {path: "/jogos", errorElement: <ErrorPage />, element: <JogosPage />},
  {path: "/theLast", errorElement: <ErrorPage />, element: <TheLast />},
  {path: "/itTakesTwo", errorElement: <ErrorPage />, element: <ItTakesTwoPage />},
  {path: "/uncharted", errorElement: <ErrorPage />, element: <UnchartedPage />},
  {path: "/cod", errorElement: <ErrorPage />, element: <CodPage />},
 ]}
  ])

  return <RouterProvider router={router} />;
}


