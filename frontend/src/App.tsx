import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"

function App() {

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Toaster />
    </>
  )
}

export default App
