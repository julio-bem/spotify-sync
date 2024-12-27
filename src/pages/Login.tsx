import React from 'react';
import Button from '../components/OrdinaryButton'; // Caminho para o botão

const Login: React.FC = () => {

  return (
    <div>
      <h1>Entra com sua conta Spotify clicando no botão abaixo</h1>
      <Button width='133px' height='42px'>Login</Button>
    </div>
  );
};

export default Login;
