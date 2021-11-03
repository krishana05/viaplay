import React from 'react';
import './App.css';
import Header from './header/Header';
import ShowList from './showsList/ShowsList';
import Footer from './footer/Footer';

function App() {

  return (
    <div className='App'>
      <Header />
      <ShowList />
      <Footer />
    </div>
  );
}

export default App;
