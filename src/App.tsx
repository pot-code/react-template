import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useToggle } from "react-use";

function App() {
  const [show, toggle] = useToggle(false);

  return (
    <Box>
      {show && (
        <Typography component="h1" role="heading">
          Let&apos;s roll
        </Typography>
      )}
      <Button role="button" onClick={toggle}>
        start
      </Button>
    </Box>
  );
}

export default App;
