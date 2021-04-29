import { Switch, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Signin from './components/signin/Signin';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/auth">
          <Signin />
        </Route>
      </Switch>
    </div>
  );
}

export default App;