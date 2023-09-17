import { apiHandler, scoresRepo } from 'helpers/api';

export default apiHandler({
    post: create
});

async function create(req, res) {
    await scoresRepo.create(req.body);
    return res.status(200).json({});
}
