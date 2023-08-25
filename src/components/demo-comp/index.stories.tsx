import { Meta, StoryObj } from "@storybook/react"
import DemoComp from "."

type Story = StoryObj<typeof DemoComp>

export const Basic: Story = {}

export default {
  title: "component/DemoComp",
  component: DemoComp,
} as Meta<typeof DemoComp>
