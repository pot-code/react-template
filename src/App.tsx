import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useToggle } from "react-use";
import { useTranslation } from "react-i18next";

function App() {
  const [show, toggle] = useToggle(false);
  const { t } = useTranslation();

  return (
    <Box>
      {show && (
        <Typography component="h1" role="heading">
          {t("hello")}
        </Typography>
      )}
      <Button role="button" onClick={toggle}>
        {t("start")}
      </Button>
    </Box>
  );
}

export default App;
