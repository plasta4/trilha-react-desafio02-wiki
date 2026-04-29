import { useState } from 'react';
import gitLogo from '../assets/github.png'
import Input from '../components/Input';
import ItemRepo from '../components/ItemRepo';

import { Container } from './styles';
import Button from '../components/Button';
import { api } from '../services/api';

function App() {

  const [repos, setRepos] = useState([]);
  const [currentRepo, setCurrentRepo] = useState('');

  const handleSearchRepo = async () => {
    let apiResp = {};

    try{ 
      apiResp = await api.get(`repos/${currentRepo}`);
    } 
    catch (err) {
      console.log(err);
    }

    const {data} = apiResp;

    if(data && data.id){
      const isExist = repos.find(repo => repo.id === data.id)
      if(!isExist){
        setRepos(prev => [...prev, data]);
        setCurrentRepo('');
        return;

      }
    }
    alert("Repositório não encontrado.")
  }

  const handleRemoveRepo = (id) => {
    const filteredArray = repos.filter(repo => repo.id !== id);
    setRepos(filteredArray);
  }

  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt="Github logo" />
      <Input value={currentRepo} onChange={e => setCurrentRepo(e.target.value)}/>
      <Button onClick={handleSearchRepo}/>
      {repos.map(repo => <ItemRepo repo={repo} removeButton={handleRemoveRepo}/>)}
    </Container>
  );
}

export default App;
