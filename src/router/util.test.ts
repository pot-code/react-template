import { RouterConfig } from "./type";
import { routeConfigToNavItems } from "./util";

describe("routeConfigToNavItems", () => {
  it("normal case", () => {
    const config: RouterConfig = [
      {
        path: "/",
        label: "test",
      },
    ];
    const items = routeConfigToNavItems(config);
    expect(items).toEqual([
      {
        key: "/",
        label: "test",
      },
    ]);
  });

  it("empty case", () => {
    const config: RouterConfig = [
      {
        path: "/",
        label: "test",
        invisibleToMenu: true,
      },
    ];
    const items = routeConfigToNavItems(config);
    expect(items).toHaveLength(0);
  });

  it("custom nav key", () => {
    const config: RouterConfig = [
      {
        path: "/",
        label: "test",
        navKey: "test",
      },
    ];
    const items = routeConfigToNavItems(config);
    expect(items).toEqual([
      {
        key: "test",
        label: "test",
      },
    ]);
  });
});
