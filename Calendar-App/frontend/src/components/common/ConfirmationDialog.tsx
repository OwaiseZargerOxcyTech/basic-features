import React, { memo, useState, forwardRef, ReactElement, Ref } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { PriorityHighRounded } from "@mui/icons-material";
import { TransitionProps } from "@mui/material/transitions";
import {
  closeCnfModal,
  selectCnfModal,
} from "../.././redux/actions/confirmationModalSlice";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ConfirmationDialogProps {
  value: string;
  handleYes: () => Promise<void>;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  value,
  handleYes,
}) => {
  const activeModal = useSelector(selectCnfModal);
  const modal = activeModal[value];
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    dispatch(closeCnfModal({ modalName: value }));
  };

  const handleYesClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setLoading(true);
    try {
      await handleYes();
      handleClose(event);
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={modal?.isOpen || false}
      TransitionComponent={Transition}
      maxWidth="sm"
      fullWidth={true}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description">
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            gap: 0.5,
          }}>
          <Box
            sx={{
              border: "2px solid #33B548",
              color: "#383838",
              background: "white",
              borderRadius: "50%",
              height: "5rem",
              width: "5rem",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
            }}>
            <PriorityHighRounded sx={{ fontSize: "3.75em" }} />
          </Box>

          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "500",
              color: "#595959",
              my: 1,
            }}>
            {modal?.title}
          </Typography>

          <Typography
            sx={{
              fontSize: "15px",
              color: "#545454",
              mt: 0.5,
            }}>
            {modal?.description}
          </Typography>

          <Box
            p={2}
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}>
            <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
            <PrimaryButton
              onClick={handleYesClick}
              loading={loading}
              disabled={loading}>
              Yes
            </PrimaryButton>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default memo(ConfirmationDialog);
