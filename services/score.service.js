import getConfig from "next/config";

import { fetchWrapper } from "helpers";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/scores`;

export const scoreService = {
  create,
  createPrime,
  createFib,
  getAll,
  getAllPrime,
  getAllFib,
};

async function create(score) {
  await fetchWrapper.post(`${baseUrl}/create`, score);
}

async function createPrime(primescore) {
  await fetchWrapper.post(`${baseUrl}/createPrime`, primescore, {
    gameType: "prime",
  });
}

async function createFib(fibscore) {
  await fetchWrapper.post(`${baseUrl}/createFib`, fibscore, {
    gameType: "fibonacci",
  });
}

async function getAll() {
  return await fetchWrapper.get(baseUrl);
}

async function getAllPrime() {
  return await fetchWrapper.get(`${baseUrl}/primescore`);
}

async function getAllFib() {
  return await fetchWrapper.get(`${baseUrl}/fibscore`);
}
