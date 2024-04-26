export interface I_GetErrorRes {
  code: number;
  message: string;
  errors: {
    [key: string]: string[];
  };
}
