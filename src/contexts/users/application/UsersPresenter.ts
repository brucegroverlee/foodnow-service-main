import UserDTO from './UserDTO';

interface UsersPresenter {
  returnUser(user: UserDTO): void;
}

export default UsersPresenter;
