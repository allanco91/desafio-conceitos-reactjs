import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then(response => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
    const repository = {
      title: "Novo repositório",
      url: "https://github.com/allanco91/desafio-conceitos-reactjs",
      techs: ["NodeJS", "ReactJS", "JavaScript"]
    };

    const response = await api.post("/repositories", repository);

    if (response.status === 200)
      setRepositories([...repositories, response.data]);
    else
      alert("Erro ao adicionar repositório");
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
    if (response.status === 204)
      setRepositories(repositories.filter(r => r.id !== id));
    else
      alert("Erro ao remover repositório");
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
