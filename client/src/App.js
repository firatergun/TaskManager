import { Redirect, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route
        path="/dashboard"
        render={(props) => <DashboardPage display={true} {...props} />}
      />
      <Redirect to="/login" />
    </Switch>
  );
}

export default App;
