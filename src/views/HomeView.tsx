import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { DemoAPI } from "@/features/app/api";

const Title = styled.h1`
  color: #c7e8ca;
`;

function Home() {
  const { t } = useTranslation();
  const { data, isLoading } = useQuery(["hello"], DemoAPI.hello);

  if (isLoading) return <Title>loading</Title>;

  return <Title>{t(data!.data)}</Title>;
}
Home.whyDidYouRender = true;

export default Home;
