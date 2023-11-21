import { apiHandler, scoresRepo } from 'helpers/api';

export default apiHandler({
    post: createPrime
});

async function createPrime(req, res) {
    await scoresRepo.createPrime(req.body);
    return res.status(200).json({});
}
