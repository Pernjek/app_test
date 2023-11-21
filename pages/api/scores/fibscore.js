import { apiHandler, scoresRepo } from "helpers/api";

export default apiHandler({
  get: getAllFib,
});

async function getAllFib(req, res) {
  const scores = await scoresRepo.getAllFib();
  return res.status(200).json(scores);
}
