import { db } from 'helpers/api';

export const scoresRepo = {
    getAll,
    create,
};

async function getAll() {
    return await db.Score.findAll();
}

async function create(params) {

    const score = new db.Score(params);

    // save score
    await score.save();
}

