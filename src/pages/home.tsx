import DemoComp from "@/components/demo-comp"
import { DemoService } from "@/gen/api"
import { useQuery } from "@tanstack/react-query"

export default function HomeView() {
  const { data, isPending } = useQuery({
    queryKey: ["demo"],
    queryFn: () => DemoService.getDemo(),
  })

  if (isPending) return <h1 className="text-gray-5">loading</h1>

  if (data) return <DemoComp title={data.data} />

  return null
}
