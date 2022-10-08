import React from "react";
import { useToggle } from "react-use";
import { useTranslation } from "react-i18next";

function App() {
  const [show, toggle] = useToggle(false);
  const { t } = useTranslation();

  return (
    <div>
      {show && <h1>{t("hello")}</h1>}
      <button type="button" onClick={toggle}>
        {t("start")}
      </button>
    </div>
  );
}

export default App;
