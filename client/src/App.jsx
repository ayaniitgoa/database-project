import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './reduxSetup/store';
import SelectFormat from './components/SelectFormat/SelectFormat';
import Navbar from './components/Navbar/Navbar';
import SelectSource from './components/SelectSource/SelectSource';
import Visualizer from './components/Visualizer/Visualizer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CommonTables from './components/CommonTables/CommonTables';

function App() {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <div className='App'>
          <Navbar />
          <div className='funtionalities'>
            <SelectFormat />
            <SelectSource />
            <Visualizer />
            <CommonTables />
          </div>
        </div>
      </DndProvider>
    </Provider>
  );
}

export default App;
