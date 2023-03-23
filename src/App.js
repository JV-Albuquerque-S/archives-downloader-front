import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DownloadPage from './pages/home';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DownloadPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;