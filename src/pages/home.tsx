import { useQuery } from "@tanstack/react-query"
import DemoComp from "@/components/demo-comp"
import api from "@/lib/api"

export default function HomeView() {
  const { data, isPending } = useQuery({
    queryKey: ["demo"],
    queryFn: () => api.demo.getDemo(),
  })

  if (isPending) return <h1 className="text-gray-5">loading</h1>

  if (data) return <DemoComp title={data.data} />

  return null
}
