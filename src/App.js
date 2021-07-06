import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeView from "./views/HomeView";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" exact>
          <HomeView />
        </Route>
      </Router>
    </Provider>
  );
}

export default App;
