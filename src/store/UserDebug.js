import { useAtom } from "jotai";
import { userAtom } from "../store/user";

function UserDebug() {
  const [user] = useAtom(userAtom);
  return <pre>{JSON.stringify(user, null, 2)}</pre>;
}

export default UserDebug;
