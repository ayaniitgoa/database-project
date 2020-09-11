import React from 'react';
import { Provider } from 'react-redux';
import store from './reduxSetup/store';
import SelectFormat from './components/SelectFormat/SelectFormat';
import Navbar from './components/Navbar/Navbar';
import SelectSource from './components/SelectSource/SelectSource';
import EnterTables from './components/EnterTables/EnterTables';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CommonTables from './components/CommonTables/CommonTables';
import ChooseColumns from './components/ChooseColumns/ChooseColumns';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <div className='App'>
          <Navbar />
          <div className='funtionalities'>
            <SelectFormat />
            <SelectSource />
            <EnterTables />
            <CommonTables />
            <ChooseColumns />
          </div>
        </div>
      </DndProvider>
    </Provider>
  );
}

export default App;
