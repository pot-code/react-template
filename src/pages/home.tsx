import { useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { demoApi } from "@/api/demo"
import DemoComp from "@/components/demo-comp"

export default function HomeView() {
  const { t } = useTranslation()
  const { data, isLoading } = useQuery(["hello"], ({ signal }) => demoApi.hello(signal).then((res) => res.data))

  if (isLoading) return <h1 className="text-gray-5">loading</h1>

  if (data) return <DemoComp title={t(data)} />

  return null
}
