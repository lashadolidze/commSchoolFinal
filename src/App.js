import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {UserContext} from "./context/UserContext.jsx"

function App() {

  const [user, setUser] = useState(
    {
      id: null,
      name: null,
      email:null,
      cartNum: null,
      loading: false,
      cartInfo: null,
    });
    const value = {
      user,
      setUser
    }

  return (
    <div>
      <UserContext.Provider value={value}>
        <Outlet/>
      </UserContext.Provider>
    </div>
  );
}

export default App;
