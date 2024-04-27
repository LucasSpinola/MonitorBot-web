import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'http://127.0.0.1:8000/api/v1'; // URL base da sua API

export async function loginApi(email, senha) {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, {
      email: email,
      password: senha,
    });

    if (response.data.token) {
      Cookies.set('token', response.data.token); // Armazenar o token JWT nos cookies
      return response;
    } else {
      throw new Error('Token não encontrado na resposta da API');
    }
  } catch (error) {
    throw error;
  }
}

export async function getPerfilUsuario(email, senha) {
  try {
    const token = Cookies.get('token');

    const response = await axios.post(`${BASE_URL}/users/profile_web`, {
      email: email,
      password: senha,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { id_discord, username } = response.data;

    Cookies.set('id_discord', id_discord);
    Cookies.set('username', username);

    return response.data;
  } catch (error) {
    throw error;
  }
}