import Header from './components/Header';
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <>
      <h1 className="text-3xl font-bold text-center">  AppOintment</h1>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
