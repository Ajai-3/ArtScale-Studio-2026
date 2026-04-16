import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import CropPage from './pages/CropPage';
import Gallery from './pages/Gallery';
import Workspace from './pages/Workspace';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/crop' element={<CropPage />} />
      <Route path='/gallery' element={<Gallery />} />
      <Route path='/workspace' element={<Workspace />} />
    </Routes>
  );
};
export default App;