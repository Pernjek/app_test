import { db } from "helpers/api";

export const scoresRepo = {
  create,
  createPrime,
  createFib,
  getAll,
  getAllPrime,
  getAllFib,
};

async function getAll() {
  return await db.Score.findAll();
}
async function getAllPrime() {
  return await db.PrimeScore.findAll({});
}
async function getAllFib() {
  return await db.FibScore.findAll();
}

async function create(params, gameType) {
  if (gameType === "fibonacci") {
    return createFib(params);
  } else if (gameType === "prime") {
    return createPrime(params);
  } else {
    return createNormalScore(params);
  }
}

async function createNormalScore(params) {
  const user = await db.User.findOne({
    where: { username: params.username },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const userId = user.id;
  const transaction = await db.Score.sequelize.transaction();

  try {
    await db.Score.create(
      {
        username: params.username,
        score: params.score,
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

async function createPrime(params, userId, transaction) {
  await db.PrimeScore.create(
    {
      username: params.username,
      score: params.score,
      userId,
    },
    { transaction }
  );
}

async function createFib(params, userId, transaction) {
  await db.FibScore.create(
    {
      username: params.username,
      score: params.score,
      userId,
    },
    { transaction }
  );
}
