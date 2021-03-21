import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import LayoutBack from "./components/BackOffice/Layout";
import LayoutFront from "./components/FrontOffice/Layout";
// import Login from "./Login";
import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProducts } from "./actions/products";
import { getCategories } from "./actions/categories";

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
   dispatch(getProducts());
   dispatch(getCategories());
  }, [dispatch])


  const [connectedUser, setConnectedUser] = useState(null);

  return (
    <BrowserRouter basename="/">
    <Switch>
      <Route path="/admin">
        <LayoutBack />
      </Route>
      <Route path="/">
        <LayoutFront />
      </Route>
      <Route
        
        render={() => (
          <p>Default rendered page! Welcome {connectedUser.name}</p>
        )}
      ></Route>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
