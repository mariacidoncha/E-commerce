export interface Form {
  email: string;
  password: string;
}

export enum Types {
  ChangeEmail = 'CH_EMAIL',
  ChangePassword = 'CH_PASSWORD',
  Reset = 'RESET',
}

export interface ActionForm {
  type: Types;
  value?: string;
}
