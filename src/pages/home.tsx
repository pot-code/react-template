import { useQuery } from "@tanstack/react-query"
import DemoComp from "@/components/demo-comp"
import useHttpClient from "@/hooks/useHttpClient"

export default function HomeView() {
  const api = useHttpClient()
  const { data, isPending } = useQuery({
    queryKey: ["demo"],
    queryFn: () => api.demo.getDemo(),
  })

  if (isPending) return <h1 className="text-gray-5">loading</h1>

  if (data) return <DemoComp title={data.data} />

  return null
}
