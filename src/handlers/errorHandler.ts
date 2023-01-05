import express from "express";

const error = (
  error: Error,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) => {
  return res.status(401).json({
    message: error.message,
  });
};

export default error;
