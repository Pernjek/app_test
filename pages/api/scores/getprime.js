import { apiHandler, scoresRepo } from "helpers/api";

export default apiHandler({
  get: getAllPrime,
});

async function getAllPrime(req, res) {
  const allScores = await scoresRepo.getAll();
  const primeScores = allScores.filter(
    (score) => score.gameType === "prime"
  );
  return res.status(200).json(primeScores);
}
