import './App.css';
import Layout from './pages/Layout/Layout';
import Routers from './Routers';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <BrowserRouter basename=''>
      <ToastContainer/>
      <Layout/>
      <Routers/>
    </BrowserRouter>
  );
}

export default App;
