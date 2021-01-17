<p align="left">
  Aplicação desenvolvida durante o processo seletivo de Dev Mobile para a Aurum Software. Esta aplicação só foi testada na plataforma ANDROID. Para executá-lo em um dispositivo iOS você terá que instalar os cocoa pods (pod install dentro da pasta iOS) e resolver eventuais problemas de permissão/instalação de dependências.
</p>

## Ambiente

Você precisa estar com o ambiente React Native configurado para poder rodar este projeto (https://reactnative.dev/docs/environment-setup). Não foi utilizado Expo, então deve-se seguir o processo de configuração pela React Native CLI.

## Instalação

Este projeto utilizou o [boilerplate de TypeScript](https://github.com/react-native-community/react-native-template-typescript) disponibilizado pela comunidade, que já disponibiliza scripts para build.

- Primeiro, na pasta raiz do projeto, instale as dependências necessárias rodando `yarn` ou `yarn install`
- Com as dependências instaladas, execute `yarn start` para iniciar o React Native Bundler. E em seguida `yarn android` para iniciar o projeto em modo de desenvolvimento em um dispositivo físico conectado ao seu computador ou um emulador Android.
- Para a versão de produção é disponibilizado o comando `yarn android:release`, porém é necessário [gerar uma keystore](https://reactnative.dev/docs/signed-apk-android) e atualizar o arquivo android/app/build.gradle.
