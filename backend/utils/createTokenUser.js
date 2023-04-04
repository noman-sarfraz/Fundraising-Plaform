const createTokenUser = (user, role) => {
  return { name: user.name, userId: user._id, role };
};

module.exports = createTokenUser;
