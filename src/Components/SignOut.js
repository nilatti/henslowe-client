import { Button } from "./Button";
import AuthService from "../services/auth.service";
function handleLogout() {
  AuthService.logout().then((response) => console.log(response));
}
export const SignOut = () => {
  return <Button onClick={handleLogout}>Sign Out</Button>;
};

export default SignOut;
