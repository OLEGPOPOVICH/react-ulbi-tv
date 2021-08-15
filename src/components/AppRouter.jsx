import { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AuthContext } from '../context';
import { privateRoutes, publicRoutes } from '../router';
import { Loader } from './UI/loader/Loader';

function AppRouter() {
  const {isAuth, isLoading} = useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Switch>
      {isAuth && privateRoutes.map((route) =>
        <Route
          path={route.path}
          exact={route.exact}
          component={route.component}
          key={route.path}
        />
      )}
      {!isAuth && publicRoutes.map((route) =>
        <Route
          path={route.path}
          exact={route.exact}
          component={route.component}
          key={route.path}
        />
      )}
      <Redirect to={isAuth ? '/posts' : '/login'} />
    </Switch>
  );
}

export default AppRouter;
