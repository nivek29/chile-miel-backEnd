exports.buildParams = (validParams, body) => {
  const params = {};

  validParams.forEach((attr) => {
    if (body[attr] !== undefined) {
      params[attr] = body[attr];
    }
  });

  return params;
};
