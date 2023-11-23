import { apiHandler, scoresRepo } from "helpers/api";

export default apiHandler({
  get: getAllFib,
});

async function getAllFib(req, res) {
  const allScores = await scoresRepo.getAll();
  const fibScores = allScores.filter(
    (score) => score.gameType === "fibonacci"
  );
  return res.status(200).json(fibScores);
}
