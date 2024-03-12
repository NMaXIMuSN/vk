import { IUser } from "src/pages/form/ui/FormView"

export interface UserInfoProps {
  user: IUser
}

export const UserInfo = ({user}: UserInfoProps) => {
  return (
    <>
      <div>
        name: {user.name}
      </div>
      <div>
        age: {user.age}
      </div>
      <div>
        count: {user.count}
      </div>
    </>)
}