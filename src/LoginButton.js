import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import './Login.css';
import { useAuth0 } from '@auth0/auth0-react';
import LogIN from './Button';
function LoginButton() {
  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();
  return (
    <>
      
        <>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Log In</Card.Title>
              <Card.Text>
                Click Below to Log In
          </Card.Text>
              {/* TODO: add a `LoginButton` component here that will log the user in with Auth0 */
                <LogIN />
              }
            </Card.Body>
          </Card>
        </>
      
    </>
  );
}
export default LoginButton;