import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/v1'; // URL base da sua API

export async function cadastroApi(email, username, id_discord, senha) {
  try {
    const response = await axios.post(`${BASE_URL}/users/adiciona`, {
      email: email,
      username: username,
      id_discord: id_discord,
      password: senha,
    });

    return response;
  } catch (error) {
    throw error;
  }
}
