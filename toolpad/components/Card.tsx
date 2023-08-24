import * as React from "react";
import { Typography } from "@mui/material";
import { createComponent } from "@mui/toolpad/browser";

export interface CardProps {
  msg: string;
}

function Card({ msg }: CardProps) {
  return <Typography>{msg}</Typography>;
}

export default createComponent(Card, {
  argTypes: {
    msg: {
      type: "string",
      default: "Hello world!",
    },
  },
});
