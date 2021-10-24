import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import { UserContext } from "./context/UserContext";

// style
import '../src/pages/Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// pages
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import DetailBook from './pages/DetailBook';
import ReadBook from './pages/ReadBook';
import Subscribe from './pages/Subscribe';
import ProfileUser from './pages/ProfileUser';
import ListTrans from './pages/ListTrans';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import DataBooks from './pages/DataBooks';
import NotFound from './pages/NotFound';
import Complain from './pages/Complain';
import ComplainAdmin from './pages/ComplainAdmin';

import PrivateRoute from './components/partials/PrivateRoute';

import { API } from "./config/api";

function App() {
  let api = API();
  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (state.isLogin == false) {
      history.push("/");
    }
    else {
      if (state.user.role == "Admin") {
        history.push("/data-books");
      } else if (state.user.role == "Customer") {
        history.push("/home");
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const config = {
        method: "GET",
        headers: {
          Authorization: "Basic " + localStorage.token,
        },
      };
      const response = await api.get("/check-auth", config);

      // If the token incorrect
      if (response.status === "failed") {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data.user;
      payload.token = localStorage.token;
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (

    <Router>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <PrivateRoute path="/home" exact component={Home} />
        <PrivateRoute path="/detail-book/:id" exact component={DetailBook} />
        <PrivateRoute path="/read-book/:id" exact component={ReadBook} />
        <PrivateRoute path="/subscribe" exact component={Subscribe} />
        <PrivateRoute path="/profile-user" exact component={ProfileUser} />
        <PrivateRoute path="/list-transaksi" exact component={ListTrans} />
        <PrivateRoute path="/add-book" exact component={AddBook} />
        <PrivateRoute path="/edit-book/:id" exact component={EditBook} />
        <PrivateRoute path="/data-books" exact component={DataBooks} />
        <PrivateRoute path="/complain" exact component={Complain} />
        <PrivateRoute path="/complain-admin" exact component={ComplainAdmin} />
        <Route path="*" exact component={NotFound} />
      </Switch>
    </Router >

  );
}

export default App;
