# Guia de Serviços - Mobile (Expo)

## Configuração

1. Copie variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do app e preencha:

```
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=
EXPO_PUBLIC_GOOGLE_OAUTH_CLIENT_ID=  # Client ID OAuth 2.0 (tipo Web) do Google para Expo Auth Session
```

2. Instale dependências:
   - `npm install`

3. Execução:
   - `npm run android` ou `npm run web`

## Funcionalidades
- Busca e listagem de profissionais com contato por WhatsApp
- Cadastro self-service de profissionais (foto, nome, categoria, WhatsApp)
- Listagem de eventos
- Destaque de perfis (campo `featured` no Firestore)

## Estrutura
- `src/services/firebase.ts`: inicialização do Firebase
- `src/services/firestore.ts`: consultas e gravações (profissionais, eventos, upload de avatar)
- `src/services/auth-context.tsx`: contexto de autenticação
- `src/navigation/RootNavigator.tsx`: navegação com tabs e stack
- `src/screens/*`: telas do app

## Observações
- Em desenvolvimento no Expo Go, `signInWithPopup` não funciona. Para login Google no mobile use `expo-auth-session` e OAuth. Em ambiente web funciona via popup.
- Para destacar um perfil, defina `featured = true` no documento em `professionals/{uid}`.
 - Segurança:
   - Não comite chaves no repositório. Variáveis sensíveis devem ir no `.env`.
   - Ative regras de Firestore/Storage restritivas antes de publicar.
   - Habilite App Check com Play Integrity (Android) e DeviceCheck/App Attest (iOS) para mitigar abuso.
   - Use revisão/aprovação (`status`) para exibir somente perfis verificados.
   - Ative monitoramento (Crashlytics/Analytics) e logging mínimo no cliente em produção.


