/** Formulário self-service do profissional, com upload de avatar. */
import { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { getMyProfessional, upsertProfessional, uploadAvatar } from '@/services/firestore';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '@/services/auth-context';
import { Appbar, Avatar, Button, HelperText, Text, TextInput } from 'react-native-paper';
import { serviceCategories, shopBranches } from '@/constants/categories';
import { BusinessType, ProfessionalDoc } from '@/types/domain';

export default function ProfessionalFormScreen() {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [type, setType] = useState<BusinessType>('servico');
  const [category, setCategory] = useState('');
  const [phone, setPhone] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>();

  useEffect(() => {
    if (!user) return;
    getMyProfessional(user.uid).then((doc) => {
      if (doc) {
        const p = doc as ProfessionalDoc;
        setName(p.name || '');
        setCategory(p.category || '');
        setPhone(p.phone || '');
        setAvatarUrl(p.avatarUrl);
        setType((p.type as BusinessType) || 'servico');
      }
    });
  }, [user]);

  const pickAvatar = async () => {
    // Mantém MediaTypeOptions por compatibilidade com a versão instalada do Expo SDK
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, quality: 0.7 });
    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      setAvatarUrl(asset.uri);
    }
  };

  const save = async () => {
    if (!user) return Alert.alert('Atenção', 'Faça login para salvar.');
    let finalAvatar = avatarUrl;
    try {
      if (avatarUrl && avatarUrl.startsWith('file:')) {
        finalAvatar = await uploadAvatar(user.uid, avatarUrl);
      }
      await upsertProfessional(user.uid, { name, category, phone, avatarUrl: finalAvatar, type });
      Alert.alert('Sucesso', 'Perfil atualizado!');
    } catch (e: any) {
      Alert.alert('Erro', e.message || 'Falha ao salvar perfil');
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header mode="center-aligned" elevated>
        <Appbar.Content title="Meu Perfil Profissional" />
        <Appbar.Action icon="content-save" onPress={save} />
      </Appbar.Header>
      <View style={{ padding: 16, gap: 16 }}>
        <View style={styles.avatarWrap}>
          {avatarUrl ? <Avatar.Image size={96} source={{ uri: avatarUrl }} /> : <Avatar.Icon size={96} icon="account" />}
          <Button mode="text" onPress={pickAvatar}>Alterar foto</Button>
        </View>

        <TextInput label="Nome" value={name} onChangeText={setName} mode="outlined" />
        <HelperText type="info">Nome do profissional</HelperText>

        <Text variant="labelLarge">Tipo de cadastro</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button mode={type === 'servico' ? 'contained' : 'outlined'} onPress={() => setType('servico')}>Prestador de Serviço</Button>
          <Button mode={type === 'loja' ? 'contained' : 'outlined'} onPress={() => setType('loja')}>Loja</Button>
        </View>

        <Text variant="labelLarge">{type === 'servico' ? 'Categoria' : 'Ramo'}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {(type === 'servico' ? serviceCategories : shopBranches).map((c: string) => (
            <Button
              key={c}
              mode={category === c ? 'contained' : 'outlined'}
              onPress={() => setCategory(c)}
              compact
            >
              {c}
            </Button>
          ))}
        </View>

        <TextInput label="WhatsApp (somente números)" value={phone} onChangeText={setPhone} mode="outlined" keyboardType="phone-pad" />
        <HelperText type="info">Inclua DDD. Ex: 11999999999</HelperText>

        <Button mode="contained" onPress={save}>Salvar</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  avatarWrap: { alignItems: 'center', gap: 8, marginVertical: 8 },
});


