import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ModalProps } from "@/utils/types";
import { RotateCw } from "lucide-react";
import { useEffect, useState } from "react";

const Modal = ({
  trigger = "Open",
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
  okText = "Yes",
  cancelText = "No",
  onOk,
  loading = false,
  children,
  modalOpen = false,
  setModalOpen = () => {},
  onCancel = async () => {},
}: ModalProps) => {
  const [open, setOpen] = useState(modalOpen || false);

  useEffect(() => {
    setOpen(modalOpen);
  }, [modalOpen]);
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          onCancel();
          setModalOpen(false);
        }
      }}
    >
      {trigger && (
        <DialogTrigger
          className="rounded-[--radius]"
          onClick={() => {
            setOpen(true);
            setModalOpen(true);
          }}
        >
          {trigger}
        </DialogTrigger>
      )}
      <DialogContent className="w-3/4 ">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter className="flex gap-1">
          <Button
            onClick={() => {
              setOpen(false);
              onCancel();
            }}
            disabled={loading}
            className="flex gap-2 items-center"
          >
            {cancelText}{" "}
            {loading ? <RotateCw className="w-4 h-4 animate-spin" /> : ""}
          </Button>
          {okText && onOk && (
            <Button
              type="submit"
              onClick={async () => {
                await onOk();
              }}
              disabled={loading}
              className="flex gap-2 items-center"
            >
              {okText}
              {loading ? <RotateCw className="w-4 h-4 animate-spin" /> : ""}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
