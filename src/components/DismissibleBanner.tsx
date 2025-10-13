import React, { useState, useEffect } from "react";
import { Alert, IconButton, Collapse } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function DismissableBanner({
  storageKey,
  severity = "info",
  children,
  ...props
}: {
  storageKey: string;
  severity?: "error" | "info" | "success" | "warning";
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(storageKey);
    if (dismissed === "true") {
      setOpen(false);
    }
    else {
      setOpen(true);
    }
  }, [storageKey]);

  const handleClose = () => {
    localStorage.setItem(storageKey, "true");
    setOpen(false);
  };

  return (
    <>
    <Collapse in={open}>
      <Alert
        severity={severity}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        {...props}
      >
        {children}
      </Alert>
    </Collapse>
    </>
  );
}