import React from 'react';
import { 
  useHistory,
  useLocation,
  Route 
} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faSmile, faComments, faUsers, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import Join from './components/Join/';
import Chat from './components/Chat/';

library.add(fab, faSmile, faComments, faUsers, faPaperPlane);

function App() {
  const history = useHistory();
  const location = useLocation();

  return (
    <>  
      <Route exact path='/'>
        <Join 
          history = {history}
        />
      </Route>
      <Route exact path='/chat'>
        <Chat
          history = {history}
          location = {location}
        />
      </Route>
    </>
  )
}

export default App;
