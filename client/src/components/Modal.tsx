import { RotateCw } from "lucide-react";
import { Button } from "../@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../@/components/ui/dialog";

type ModalProps = {
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  okText?: string;
  cancelText?: string;
  onOk?: () => void;
  onCancel?: () => void;
  loading?: boolean;
  children?: React.ReactNode;
};
const Modal = ({
  trigger = "Open",
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
  okText = "Yes",
  cancelText = "No",
  onOk = () => {},
  onCancel = () => {},
  loading = false,
  children,
}: ModalProps) => {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <Button type="submit" onClick={() => onOk()} disabled={loading}>
            {loading ? <RotateCw className="w-4 h-4 animate-spin" /> : okText}
          </Button>
          <Button onClick={() => onCancel()} disabled={loading}>
            {loading ? (
              <RotateCw className="w-4 h-4 animate-spin" />
            ) : (
              cancelText
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
