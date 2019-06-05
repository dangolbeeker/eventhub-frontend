import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import HomeContainer from './containers/home_container'
import DisplayContainer from './containers/display_container'
import LoginContainer from './containers/login_container'
import RegisterContainer from './containers/register_container'
import { Route, Switch} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route path='/login' render={(routerProps)=><LoginContainer{...routerProps}/>}/>
        <Route path='/register' render={(routerProps)=><RegisterContainer{...routerProps}/>}/>
        <Route path='/events' render={(routerProps)=><DisplayContainer{...routerProps}/>}/>
        <Route path='/venues' render={(routerProps)=><DisplayContainer{...routerProps}/>}/>
        <Route path='/' render={(routerProps)=><HomeContainer{...routerProps}/>}/>
      </Switch>
    </div>
  );
}

export default App;
