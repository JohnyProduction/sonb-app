import './App.css';
import Layout from './pages/Layout/Layout';
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
