import logo from './logo.svg';
import './App.css';
import Header from './components/header/header'
import Taskbody from './components/taskbody/task'
import { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';





function App() {
  const [theme, settheme] = useState(JSON.parse(localStorage.getItem('theme')) || "dark");

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);



  return (
    <div className={`App ${theme}`}>
      <div className='container'>
      <Header  settheme={settheme} theme={theme}/>
      <Taskbody/>
      </div>
    </div>
  );
}

export default App;
