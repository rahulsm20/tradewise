import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";

const SignupButton = () => {
  const { loginWithPopup } = useAuth0();

  return <Button onClick={() => loginWithPopup()}>Sign Up</Button>;
};

export default SignupButton;
