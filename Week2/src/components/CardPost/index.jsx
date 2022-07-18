import React from "react";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";

const index = ({ title, name, dateTime, description }) => {
  return (
    <Card raised={false} elevation={0}>
      <CardHeader
        avatar={
          <IconButton className="circle">
            <ReplyIcon />
          </IconButton>
        }
        action={
          <IconButton className="circle" color="error">
            <DeleteIcon />
          </IconButton>
        }
        subheader={`Membalas thread ${name} - ${dateTime}`}
      />
      <CardContent>
        <Typography variant="h5" fontWeight="bold" ml="3.5rem" mt="-1.7rem">
          {title}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          mt="1rem"
          ml="3.5rem"
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default index;
