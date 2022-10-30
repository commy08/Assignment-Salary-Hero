export type ClassBaseType = {
  [key: string]: Function;
};

export type ResponseErrorType = {
  status: number;
  message: string;
};

export type FindAndCountAllResponseType<T> = {
  rows: T[];
  count: number;
};

export type RequestHeadersType = {
  usercompanyrole: string;
};
