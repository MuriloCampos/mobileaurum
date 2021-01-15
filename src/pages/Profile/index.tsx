import React from 'react';

import { useAuth } from '../../hooks/auth';

import PrimaryButton from '../../components/PrimaryButton';
import {
  Container,
  InfoContainer,
  SignOutContainer,
  Title,
  UsernameText,
} from './styles';

const Profile: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <Container>
      <InfoContainer>
        <Title>Usuário</Title>
        <UsernameText>{user.email}</UsernameText>
      </InfoContainer>

      <SignOutContainer>
        <PrimaryButton text="SAIR" onPress={signOut} />
      </SignOutContainer>
    </Container>
  );
};

export default Profile;
