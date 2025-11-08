import React, { lazy, Suspense, useState } from "react";
import Header from "./components/Header";
import { BrowserRouter, Route, Switch, useHistory, Redirect } from "react-router-dom";
import { createGenerateClassName, StylesProvider } from "@material-ui/core";
import Progress from "./components/Progress";

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
})

const LazyAuth = lazy(() => import("./components/AuthApp"));
const LazyMarketing = lazy(() => import("./components/MarketingApp"));
const LazyDashboard = lazy(() => import("./components/DashboardApp"));

function AppContent() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const history = useHistory();

  const handleSignIn = () => {
    setIsSignedIn(true);
    history.push('/dashboard');
  };

  return (
    <div>
      <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
      <Suspense fallback={<Progress />}>
        <Switch>
          <Route path="/auth">
            <LazyAuth onSignIn={handleSignIn} />
          </Route>
          <Route path="/dashboard">
            {isSignedIn ? <LazyDashboard /> : <Redirect to="/auth/signin" />}
          </Route>
          <Route path="/" component={LazyMarketing} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </StylesProvider>
  );
}