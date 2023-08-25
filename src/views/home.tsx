import { useTranslation } from "react-i18next"
import { useQuery } from "@tanstack/react-query"
import DemoComp from "@/components/demo-comp"
import { demoApi } from "@/api/demo"

export default function HomeView() {
  const { t } = useTranslation()
  const { data, isLoading } = useQuery(["hello"], ({ signal }) => demoApi.hello(signal).then((v) => v.data))

  if (isLoading) return <h1 className="text-gray-5">loading</h1>

  if (data?.data) return <DemoComp title={t(data.data)} />

  return null
}
