import { apiHandler, scoresRepo } from "helpers/api";

export default apiHandler({
  get: getAllPrime,
});

async function getAllPrime(req, res) {
  const scores = await scoresRepo.getAllPrime();
  return res.status(200).json(scores);
}
