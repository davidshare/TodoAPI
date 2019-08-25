const sendResponse = (res, statusCode, success, message, payload='') => {
  return res.status(statusCode).json({
    success,
    message,
    payload
  });
};

export default sendResponse;
