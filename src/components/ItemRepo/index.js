import React from 'react'

import { ItemContainer } from './styles';

function ItemRepo({repo, removeButton}) {
  return (
    <ItemContainer>
        <h3>{repo.full_name}</h3>
        <p>{repo.description ? repo.description : "Sem descrição."}</p>
        <a href={repo.html_url} target="_blank" rel="noreferrer">Ver Repositório</a><br></br>
        <button onClick={e => removeButton(repo.id)}>Remover</button>
        <hr />
    </ItemContainer>
  )
}

export default ItemRepo;