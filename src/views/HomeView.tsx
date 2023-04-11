import { useTranslation } from "react-i18next"
import { useQuery } from "react-query"
import { DemoAPI } from "@/features/app/api"

function Home() {
  const { t } = useTranslation()
  const { data, isLoading } = useQuery(["hello"], DemoAPI.hello)

  if (isLoading) return <h1>loading</h1>

  return <h1>{t(data!.data)}</h1>
}
Home.whyDidYouRender = true

export default Home
