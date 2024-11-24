import { DialogProps } from "@radix-ui/react-dialog";
import { RotateCw } from "lucide-react";
import { useState } from "react";
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

type ConfirmationModalProps = DialogProps & {
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  okText?: string;
  close?: boolean;
  onOk?: () => Promise<void>;
  loading?: boolean;
};

const ConfirmationModal = ({
  trigger = "Open",
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
  okText = "Yes",
  onOk = () => Promise.resolve(),
  loading = false,
}: ConfirmationModalProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              onOk().then(() => setOpen(false));
            }}
            disabled={loading}
          >
            {loading ? <RotateCw className="w-4 h-4 animate-spin" /> : okText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;
