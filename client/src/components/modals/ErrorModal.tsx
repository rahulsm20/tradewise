import { ModalProps } from "@/utils/types";
import Modal from "../Modal";

const ErrorModal = ({
  title = "Error",
  description = "An error occurred. Please try again later.",
  okText = "OK",
  cancelText = "Cancel",
  loading = false,
  onOk,
  onCancel = async () => {},
  ...props
}: ModalProps) => {
  return (
    <Modal
      {...props}
      title={title}
      description={description}
      okText={okText}
      cancelText={cancelText}
      loading={loading}
      onOk={onOk}
      onCancel={onCancel}
    />
  );
};

export default ErrorModal;
