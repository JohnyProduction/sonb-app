import './App.css';
import Layout from './pages/Layout/Layout';
import Login from './pages/Login/Login';
import Routers from './Routers';
import { BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter basename=''>
      <Layout/>
      <Routers/>
    </BrowserRouter>
  );
}

export default App;
