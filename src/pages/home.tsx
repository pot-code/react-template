import { useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import useDemoApi from "@/api/useDemoApi"
import DemoComp from "@/components/demo-comp"

export default function HomeView() {
  const { t } = useTranslation()
  const demoApi = useDemoApi()
  const { data, isPending } = useQuery({
    queryKey: ["hello"],
    queryFn: () => demoApi.hello().then((res) => res.data),
  })

  if (isPending) return <h1 className="text-gray-5">loading</h1>

  if (data) return <DemoComp title={t(data)} />

  return null
}
