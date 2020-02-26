import React from 'react';
import SlideContextProvider from '../context/SlideContext'
import Slide from '../slides/Slide'
import './App.scss';

const cfg = window.pickzen||{};

if (!cfg.code) cfg.code='SH1FfJSgN8H';
if (!cfg.server) cfg.server='https://app.pickzen.com';
if (!cfg.preview) cfg.preview=0;

const App = () => (
  <SlideContextProvider>
    <Slide />
  </SlideContextProvider>
);

export {cfg}
export default App;
