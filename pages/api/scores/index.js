import { apiHandler, scoresRepo } from 'helpers/api';

export default apiHandler({
    get: getAll
});

async function getAll(req, res) {
    const scores = await scoresRepo.getAll();
    return res.status(200).json(scores);
}
