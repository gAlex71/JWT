import React, { useContext } from 'react';
import { FC, useState } from 'react';
import { Context } from '../index.tsx';
import { observer } from 'mobx-react-lite';

const LoginForm: FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

  const { store } = useContext(Context);

	return (
		<div>
			<input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
			<input type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button onClick={() => store.login(email, password)} >Войти</button>
      <button onClick={() => store.registration(email, password)}>Регистрация</button>
		</div>
	);
};

export default observer(LoginForm);
