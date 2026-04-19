import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import CropPage from './pages/CropPage';
import Gallery from './pages/Gallery';
import Workspace from './pages/Workspace';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/crop' element={<CropPage />} />
      <Route path='/gallery' element={<Gallery />} />
      <Route path='/workspace/:id?' element={<Workspace />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};
export default App;