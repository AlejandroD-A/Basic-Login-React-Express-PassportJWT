import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({
  component: Component,
  // eslint-disable-next-line no-unused-vars
  ...props
}) {
  const { user } = useSelector(state => state.App)
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Route {...props}
      // eslint-disable-next-line no-shadow
      render={(props) => user.isLogin === false
        ? (<Redirect to="/" />)
        // eslint-disable-next-line react/jsx-props-no-spreading
        : ( <Component {...props} />)}
    />
  );
}

export default PrivateRoute;
