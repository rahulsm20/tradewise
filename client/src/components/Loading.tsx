import { Ellipsis, Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className="animate-spin text-4xl" />
    </div>
  );
};

export const LoadingEllipsis = () => {
  return (
    <div className="flex items-center justify-center">
      <Ellipsis className="animate-pulse text-4xl" />
    </div>
  );
};

export default Loading;
