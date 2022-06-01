import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Content from './components/Content';
import { useEffect } from 'react';
import 'antd/dist/antd.css';

function App() {

  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
  );
}

export default App;
