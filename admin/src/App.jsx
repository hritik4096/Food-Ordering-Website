import Navbar from './component/Navbar/Navbar'
import Sidebar from './component/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import Orders from './pages/Orders/Orders'
import List from './pages/List/List'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <ToastContainer/>
    <Navbar/>
    <hr />
    <div className='app-content'>
      <Sidebar/>
      <Routes>
        <Route path="/add" element={<Add/>}></Route>
        <Route path="/list" element={<List/>}></Route>
        <Route path="/orders" element={<Orders/>}></Route>
      </Routes>

    </div>
    </div>
  )
}

export default App
