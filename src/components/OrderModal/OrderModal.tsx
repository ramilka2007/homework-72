import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import React, { PropsWithChildren } from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Props extends PropsWithChildren {
  open: boolean;
  handleClose: () => void;
}
const OrderModal: React.FC<Props> = ({
  open = false,
  handleClose,
  children,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default OrderModal;
