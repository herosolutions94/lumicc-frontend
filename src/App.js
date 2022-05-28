import React, { useEffect, Fragment, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ReactGA from 'react-ga';
import './App.css';
import './Main.css';
import Footer from "./components/includes/footer";
import Header from "./components/includes/header";
import Home from "./components/pages/home";
import Error from "./components/pages/error";
import Vendors from "./components/pages/vendors";
import Contact from "./components/popups/contact";
import Publisher from "./components/popups/publisher";

function App() {



  useEffect(() => {
    ReactGA.initialize('UA-221036100-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  const [state, setState] = useState({
    publisherPopup: false,
    contactPopup: false,

  });


  function showPublisherPopup() {
    setState({ ...state, publisherPopup: true });
  }
  function closePublisherPopup() {
    document.getElementById("comments").value = "";
    setState({ ...state, publisherPopup: false });
  }
  function showContactPopup() {
    setState({ ...state, contactPopup: true });
  }
  function closeContactPopup() {
    // document.getElementById("nav").classList.remove("active");
    setState({ ...state, contactPopup: false });

  }



  // if (loading === false) return <div id="loading"> <img src={getSiteImages('/images/loading.gif')} alt="Loading" /></div>;
  return (

    <Router>
      <Fragment>
        <Header settings={state.site_settings} showPublisherPopup={showPublisherPopup} showContactPopup={showContactPopup} />
        <Switch>
          <Route
            exact
            path="/"
            // component={Home}

            render={props => <Home showPublisherPopup={showPublisherPopup} showContactPopup={showContactPopup} />}
          />
          <Route
            exact
            path="/vendors"
            // component={Home}

            render={props => <Vendors />}
          />
          <Route component={Error} />
        </Switch>
        <Footer settings={state.site_settings} />
      </Fragment>
      {
        (state.contactPopup === true)
          ?
          <Contact closeContactPopup={closeContactPopup} />
          :
          ""
      }
      {
        (state.publisherPopup === true)
          ?
          <Publisher closePublisherPopup={closePublisherPopup} />
          :
          ""
      }
    </Router>
  );
}

export default App;
