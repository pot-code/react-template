import { getDemo } from "@/api/demo"
import DemoComp from "@/components/demo-comp"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: Home,
})

export default function Home() {
  const { data, isPending } = useQuery({
    queryKey: ["demo"],
    queryFn: () => getDemo(),
  })

  if (isPending) return <h1 className="text-gray-5">loading</h1>

  if (data) return <DemoComp title={data.data} />

  return <h1>shit</h1>
}
