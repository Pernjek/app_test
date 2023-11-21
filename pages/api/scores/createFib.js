import { apiHandler, scoresRepo } from 'helpers/api';

export default apiHandler({
    post: createFib
});

async function createFib(req, res) {
    await scoresRepo.createFib(req.body);
    return res.status(200).json({});
}
