import React from "react";

import Button, { ButtonProps } from "@material-ui/core/Button";

import { useStyles } from "./styles";

import SignOffAction, { SignOffActionPropsType } from "./SignOffAction";
import ConfirmationButton from "../../components/buttons/ConfirmationButton";

type ManualClosePropsType = {
  open: boolean;
  onManualClose: (msg: string) => void;
  onManualOpen: () => void;

  reopenButtonText?: string;
  closeButtonText?: string;

  signOffActionProps?: Partial<SignOffActionPropsType>;
  reopenButtonProps?: Partial<ButtonProps>;
  ButtonComponent?: React.ElementType<{ onClick: ButtonProps["onClick"] }>;
};

const ManualClose: React.FC<ManualClosePropsType> = ({
  open,
  onManualClose,
  onManualOpen,
  reopenButtonText = "Open incident",
  closeButtonText = "Close incident",
  signOffActionProps = {},
  reopenButtonProps = {},
  ButtonComponent = Button,
}: ManualClosePropsType) => {
  const classes = useStyles();

  if (open) {
    return (
      <SignOffAction
        dialogTitle="Manually close incident"
        dialogContentText="Write a message describing why the incident was manually closed"
        dialogSubmitText="Close now"
        dialogCancelText="Cancel"
        dialogButtonText={closeButtonText}
        dialogInputLabel="Closing message"
        isDialogInputRequired={false}
        dialogInputType="text"
        title="Manually close incident"
        question="Are you sure you want to close this incident?"
        onSubmit={onManualClose}
        {...signOffActionProps}
      />
    );
  } else {
    return (
      <ConfirmationButton
        title={"Reopen incident"}
        question={"Are you sure you want to reopen this incident?"}
        onConfirm={onManualOpen}
        ButtonComponent={ButtonComponent}
        buttonProps={{
            variant: "contained"
        }}
        className={classes.dangerousButton}
        {...reopenButtonProps}
      >
        {reopenButtonText}
      </ConfirmationButton>
    );
  }
};

export default ManualClose;
