import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import CropPage from './pages/CropPage';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/crop' element={<CropPage />} />
      <Route path='/workspace' element={<div className="min-h-screen bg-dark-950 text-white flex items-center justify-center">Workspace (Coming Soon)</div>} />
    </Routes>
  );
};
export default App;