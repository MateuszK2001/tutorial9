import React from 'react';
import Blog from './containers/Blog/Blog';
import {BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Blog />
      </div>
    </BrowserRouter>
  );
}

export default App;
