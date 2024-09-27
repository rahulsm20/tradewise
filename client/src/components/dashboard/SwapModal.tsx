import Modal from "../Modal";
import TWInput from "../TWInput";

const SwapModal = ({ ...props }) => {
  return (
    <Modal {...props}>
      <TWInput name="to" placeholder="Enter address to send to" label="To" />
      <TWInput name="value" placeholder="Enter value to send" label="Value" />
    </Modal>
  );
};

export default SwapModal;
