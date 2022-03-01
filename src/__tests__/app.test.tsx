import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import App from "../App";

test("smoke test", async () => {
  render(<App />);

  const btn = await screen.findByRole("button");
  fireEvent.click(btn);

  const heading = await screen.findByRole("heading");
  expect(heading).toHaveTextContent("Let's roll");
});
