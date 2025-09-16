export type SignUpUser = {
  firstName: string;

  lastName: string;

  phoneNumber: string;

  hashed: string;

  role?: UserRole;
};
