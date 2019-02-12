import config from '../../config/config';

/**
 * @description - function that gets a user based on its id
 * @returns {object} - returns object
 * @param {number} userId - id of user
 */
const getAUser = async (userId) => {
  try {
    const foundUser = await config.query(
      `
    SELECT * FROM users WHERE userId = ($1) LIMIT 1
  `,
      [userId]
    );
    if (foundUser.rows.length) {
      return foundUser.rows[0];
    }
    return { status: 'error', error: 'user not found' };
  } catch (error) {
    return { status: 'error', error };
  }
};
export default getAUser;
