import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import TabelaAgenda from '@react-native-async-storage/async-storage';

const Pagina = styled.View`
  flex: 1;
  align-items: center;
`;

const Header = styled.View`
  height: 70px;
  width: 100%;
  background-color: #0271ad;
  justify-content: center;
  margin-bottom: 40px;
`;

const TextHeader = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  text-align: center;
`;

const Input = styled.TextInput`
  background-color: #ddd;
  padding: 10px;
  color: #000;
  font-size: 19px;
  border-radius: 10px;
  width: 80%;
  margin-bottom: 40px;
`;

const Botao = styled.TouchableOpacity`
  width: 80%;
  padding: 10px;
  background-color: #41AEF4;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 40px;
`;

const TextoBt = styled.Text`
  font-size: 25px;
  color: white;
`;

const Resultado = styled.Text`
  font-size: 19px;
  color: black;
  text-align: center;
  margin-bottom: 30px;
`;

const Mensagem = styled.Text`
  font-size: 24px;
  color: black;
  text-align: center;
`;

export default function App() {
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [finded, setFinded] = useState('');

  const Armazenar = (chave, valor) =>{
    if(chave ==''|| valor ==''){
      setMensagem("Telefone não adicionado.");
      alert("Os dados são obrigatórios.")
      return;
    }
    TabelaAgenda.setItem(chave,valor)
    setMensagem("Telefone Adicionado.");
    
  }

  const limpar = ()=>{
    setNome('');
    setTelefone('');
  }
  //função de leitura de dados
  //recebe a chave e retorna o valor
  const Buscar = async(chave)=>{
      const nomeAdicionado = chave;
      const verificador = await TabelaAgenda.getItem(chave);
    if (chave =='') {
      alert("O campo Nome precisa ser preenchido.");
      setMensagem("Telefone não encontrado.");
      return;
    }
    if(verificador === null){
      alert("Nome não encontrado.")
      setMensagem("Telefone não encontrado.")
      limpar();
      return;
    }
      limpar();
      setFinded(verificador)
      setMensagem("Telefone encontrado.");
      
    //valor é gravado na variável "curso"
    //poderia ter usado outra forma (mostrar na tabela, etc.)
    
  }
   const Excluir = async(chave)=>{
    const verificador = await TabelaAgenda.getItem(chave);
    if (chave =='') {
      alert("O campo 'nome' precisa estar preenchido para excluir um contato.");
      setMensagem('Telefone não excluído.');
      return;
    }
    if(verificador === null){
      alert("Nome não encontrado.")
      setMensagem("Telefone não excluido.")
      limpar();
      return;
    }
    TabelaAgenda.removeItem(chave);
    setMensagem("Telefone excluído.");
    setFinded(null)
    limpar();
   }


  return (
    <Pagina>
      <Header>
        <TextHeader>Agenda do Antônio Rodrigo</TextHeader>
      </Header>
      <Input
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <Input
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType='numeric'
      />

      <Botao onPress={
        ()=>{
          if (telefone == '') {
            alert("O campo 'telefone' precisa estar preenchido");
            setMensagem("Telefone não adicionado.")
            return;
          }
          Armazenar(nome,telefone); 
          limpar();
          
        }}>
        <TextoBt>Adicionar</TextoBt>
      </Botao>

      <Botao onPress={
        ()=>{Buscar(nome); 
        
        }}>
        <TextoBt>Buscar</TextoBt>
      </Botao>

      <Resultado>{finded}</Resultado>

      <Botao onPress={()=>{Excluir(nome)}}>
        <TextoBt>Excluir</TextoBt>
      </Botao>

    <Mensagem>{mensagem}</Mensagem>

    </Pagina>
  );
}
