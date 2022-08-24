interface User {
  userId: number;
  userName: string;
  emailAddress: string;
  userPassword: string;
  trustedUser: boolean;
  userLevelId: number;
}

interface CreateUser {
  userName: string;
  emailAddress: string;
  userPassword: string;
}

export { User, CreateUser };
