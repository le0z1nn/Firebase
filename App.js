import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { bancoExterno } from './firebaseConnection';
import { useEffect, useState } from 'react';
import { doc, getDoc, onSnapshot, setDoc, addDoc, collection } from 'firebase/firestore';

export default function App() {

  const [nome, setNome] = useState('Carregando...');
  const [nome2, setNome2] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');

  useEffect(() => {
    const referencia = doc(bancoExterno, "aparelhos", "1");

    const fetchInitialData = async () => {
      try {
        const snap = await getDoc(referencia);
        if (snap.exists()) {
          setNome(snap.data()?.TV);
        } else {
          console.log('Documento não encontrado!');
        }
      } catch (erro) {
        console.error("Erro ao buscar documento inicial:", erro);
      }
    };

    fetchInitialData();

    const unsubscribe = onSnapshot(referencia, (snap) => {
      setNome2(snap.data()?.Geladeira);
    }, (erro) => {
      console.error("Erro ao receber snapshot:", erro);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  const addBancoExterno = async () => {
    try {
      await setDoc(doc(bancoExterno, "carros", "1"), {
        marca: "Toyota",
        modelo: "Corolla",
        ano: "2020"
      });
      console.log('Documento de carro adicionado com sucesso');
    } catch (erro) {
      console.error("Erro ao adicionar documento:", erro);
    }
  };

  const addBancoExterno2 = async () => {
    try {
      await addDoc(collection(bancoExterno, "carros"), {
        marca,
        modelo,
        ano
      });
      console.log('Documento de carro adicionado com sucesso');
      setMarca('');
      setModelo('');
      setAno('');
    } catch (erro) {
      console.error("Erro ao adicionar documento:", erro);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Informação: {nome}, {nome2}</Text>
      <Text style={styles.text}>Cadastre um carro:</Text>
      <TextInput
        style={styles.input}
        placeholder="Marca"
        value={marca}
        onChangeText={setMarca}
      />
      <TextInput
        style={styles.input}
        placeholder="Modelo"
        value={modelo}
        onChangeText={setModelo}
      />
      <TextInput
        style={styles.input}
        placeholder="Ano"
        value={ano}
        onChangeText={setAno}
        keyboardType="numeric"
      />
      <TouchableOpacity style={[styles.button, { backgroundColor: "#F50" }]} onPress={addBancoExterno}>
        <Text style={styles.buttonText}>Adicionar Carro Padrão</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: "#AFF" }]} onPress={addBancoExterno2}>
        <Text style={styles.buttonText}>Adicionar Carro</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
});
