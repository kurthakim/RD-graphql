const { authCheck } = require('../helpers/auth');

const me = async (parent, args, { req, res }) => {
  await authCheck(req);
  return 'Kurt';
};
const anotherResolver = () => 'Hakim';

module.exports = {
  Query: {
    me,
  },
};
