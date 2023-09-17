import getConfig from 'next/config';

import { fetchWrapper } from 'helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/scores`;

export const scoreService = {
    create,
    getAll,
};

async function create(score) {
    await fetchWrapper.post(`${baseUrl}/create`, score);
}

async function getAll() {
    return await fetchWrapper.get(baseUrl);
}