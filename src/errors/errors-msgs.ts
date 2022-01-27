export const errorMsgs = {
  userLoginDuplicated: 'User with the same login already exists',
  usersNotFound: 'User(s) not found',
  usersNotCreated: 'User not created',
};

export const createInvalidUserIdMessage = (id: string) =>
  `User with id: ${id} not found`;
