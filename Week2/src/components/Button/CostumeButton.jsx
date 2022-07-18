import React from "react";
import Button from "@mui/material/Button";

export default function CostumeButton({ children }) {
  return (
    <Button size="medium" sx={{ textTransform: "none", color: "#9E9E9E" }}>
      {children}{" "}
    </Button>
  );
}
