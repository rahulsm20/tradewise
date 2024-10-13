import { RotateCw } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <RotateCw className="animate-spin text-4xl text-gray-500" />
    </div>
  );
};

export default Loading;
