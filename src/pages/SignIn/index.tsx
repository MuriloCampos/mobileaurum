import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { useAuth } from '../../hooks/auth';

import TextInput from '../../components/TextInput';
import PrimaryButton from '../../components/PrimaryButton';

import { Container, FormTitle, ErrorText } from './styles';

const SignIn: React.FC = () => {
  const { signIn, user } = useAuth();
  const { control, handleSubmit, errors } = useForm();
  const [response, setResponse] = useState('');

  const onSubmit = async data => {
    const signInResponse = await signIn(data);

    setResponse(signInResponse);
  };

  return (
    <Container>
      <FormTitle>Login</FormTitle>

      {errors.username && <ErrorText>Insira o usuário</ErrorText>}
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            placeholder="Usuário"
            onBlur={onBlur}
            onChangeText={newValue => onChange(newValue)}
            value={value}
          />
        )}
        name="username"
        rules={{ required: true }}
        defaultValue={user.email}
      />

      {errors.password && <ErrorText>Insira a senha</ErrorText>}
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            placeholder="Senha"
            onBlur={onBlur}
            onChangeText={newValue => onChange(newValue)}
            value={value}
            secureTextEntry
          />
        )}
        name="password"
        rules={{ required: true }}
        defaultValue=""
      />

      {response !== '' && <ErrorText>Usuário ou senha incorretos</ErrorText>}
      <PrimaryButton text="ENTRAR" onPress={handleSubmit(onSubmit)} />
    </Container>
  );
};

export default SignIn;
