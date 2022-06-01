import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TokenPage from './pages/TokenPage';
import TransferPage from './pages/TransferPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {

  return (
    <div className='h-screen'>
      <Router>
        <Header/>
        <div className='bg-[#ececec] h-5/6 flex justify-center place-items-center'>
          <Routes>
            <Route path="/" exact element={<TokenPage />} />
            <Route path="/token" exact element={<TokenPage />} />
            <Route path="/transfer" element={<TransferPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
