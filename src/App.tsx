import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { DemoAPI } from "./api";

function App() {
  const { t } = useTranslation();
  const { data, isLoading } = useQuery(["hello"], DemoAPI.hello);

  if (isLoading) return <h1>loading</h1>;

  return <h1>{t(data!.data)}</h1>;
}

export default App;
