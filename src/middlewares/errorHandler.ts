import { Request, Response, NextFunction } from "express";

export default async function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.type === "unauthorized") {
    return res.status(401).send(`${error.message}`);
  }

  if (error.type === "unprocessableEntity") {
    return res.status(422).send(`${error.message}`);
  }
  if (error.type === "notFound") {
    return res.status(404).send(`${error.message}`);
  }
  if (error.type === "conflict") {
    return res.status(409).send(`${error.message}`);
  }
  if (error.type === "notAcceptable") {
    return res.status(406).send(`${error.message}`);
  }
  if (error.type === "forbidden") {
    return res.status(403).send(`${error.message}`);
  }

  return res.status(500).send("Internal Error!");
}
