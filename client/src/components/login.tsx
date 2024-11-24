import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      onClick={() => loginWithRedirect()}
      className="flex gap-1 items-center"
    >
      <span>Login</span>
      <ArrowRight className="h-4 w-4" />
    </Button>
  );
};

export default LoginButton;
