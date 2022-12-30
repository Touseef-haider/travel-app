exports.getLikeQuery = (query, user) => {
  if (query.is_liked) {
    return {
      $push: {
        liked_by: user,
      },
    };
  }
  return {
    $pull: {
      liked_by: user,
    },
  };
};
