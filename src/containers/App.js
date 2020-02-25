import React from 'react';
import SlideContextProvider from '../context/SlideContext'
import Slide from '../slides/Slide'
import './App.scss';

const init = window.pickzen||{};

const cfg = {
    code:init.code||'SH1FfJSgN8H',
    server:init.server||'https://app.pickzen.com',
    preview:init.preview||0
};

const App = () => (
  <SlideContextProvider>
    <Slide />
  </SlideContextProvider>
);

export {cfg}
export default App;
