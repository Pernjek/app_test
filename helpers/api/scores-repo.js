import { db } from "helpers/api";

export const scoresRepo = {
  create,
  getAll,
};

async function getAll() {
  return await db.Score.findAll();
}

async function create(params) {
  const { username, score, gameType } = params;

  const user = await db.User.findOne({
    where: { username },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const userId = user.id;
  const transaction = await db.Score.sequelize.transaction();

  try {
    await db.Score.create(
      {
        username,
        score,
        gameType,
        userId,
      },
      { transaction }
    );

    await transaction.commit();
    return { success: true };
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    throw error;
  }
}
