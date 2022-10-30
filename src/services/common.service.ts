import { Request } from "express";

type GetPaginationFromHeadersType = {
  limit: number;
  offset: number;
};

export const getPaginationFromHeaders = (
  request: Request
): GetPaginationFromHeadersType => {
  const limit: number = Number(request.headers.limit) || 5;
  const offset: number = Number(request.headers.offset) || 0;
  return { limit, offset };
};

export default {
  getPaginationFromHeaders,
};
