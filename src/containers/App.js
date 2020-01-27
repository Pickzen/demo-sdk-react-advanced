import React from 'react';
import SlideContextProvider from '../context/SlideContext'
import Slide from '../slides/Slide'
import './App.scss';

const cfg = {
    code:window.pickzen&&window.pickzen.code?window.pickzen.code:'SH1FfJSgN8H',
    //server:window.pickzen&&window.pickzen.server?window.pickzen.server:'https://local.pickzen.com'
};

const App = () => (
  <SlideContextProvider>
    <Slide />
  </SlideContextProvider>
);

export {cfg}
export default App;
