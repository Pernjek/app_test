import { apiHandler, scoresRepo } from "helpers/api";

export default apiHandler({
  get: getAll,
});

async function getAll(req, res) {
  const allScores = await scoresRepo.getAll();
  const regularScores = allScores.filter(
    (score) => score.gameType === "regular"
  );
  return res.status(200).json(regularScores);
}
