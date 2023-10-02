import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SendMoneyMobile from ".";

import type { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { SEND_MONEY_MOBILE_NETWORKS } from "@constants/index";
import { TSendMoneyMobileNetwork } from "@customTypes/SendMoneyMobileNetwork";

let user: UserEvent;
beforeEach(() => (user = userEvent.setup()));

test("Renders as mobile page as tabs", async () => {
  render(<SendMoneyMobile />);

  const $tabs = screen.getByTestId("tabs");
  const withinTabs = within($tabs);

  expect(withinTabs.getAllByTestId("tab")).toHaveLength(2);
  expect(withinTabs.getAllByTestId("tab")[0]).toHaveTextContent(/airtime/i);
  expect(withinTabs.getAllByTestId("tab")[1]).toHaveTextContent(/data/i);
});

test("Renders a network selector", async () => {
  render(<SendMoneyMobile />);

  const assertNetworks = async (currentNetworkName: string) => {
    let currentNetwork: TSendMoneyMobileNetwork | undefined;
    const restNetworks = SEND_MONEY_MOBILE_NETWORKS.filter((network) => {
      if (network.name === currentNetworkName) {
        currentNetwork = network;
        return false;
      }

      return true;
    });

    if (!currentNetwork) {
      throw new Error("currentNetwork is undefined");
    }

    const $currentNetwork = screen.getByTestId("current-network");
    within($currentNetwork).getByRole("img", { name: currentNetwork.name });

    expect(screen.queryByTestId("networks")).not.toBeInTheDocument();
    await user.click($currentNetwork);
    const $networks = screen.getByTestId("networks");
    expect($networks).toBeInTheDocument();

    const withinNetworks = within($networks);
    expect(withinNetworks.getAllByTestId("network")).toHaveLength(restNetworks.length);

    expect($networks).not.toHaveTextContent(new RegExp(currentNetwork.name, "i"));

    restNetworks.forEach((network) => {
      withinNetworks.getByRole("img", { name: network.name });
      expect($networks).toHaveTextContent(new RegExp(network.name, "i"));
    });

    return withinNetworks;
  };

  let withinNetworks = await assertNetworks(SEND_MONEY_MOBILE_NETWORKS[0].name);

  await user.click(withinNetworks.getAllByTestId("network")[0]);
  withinNetworks = await assertNetworks(SEND_MONEY_MOBILE_NETWORKS[1].name);

  await user.click(withinNetworks.getAllByTestId("network")[0]);
  withinNetworks = await assertNetworks(SEND_MONEY_MOBILE_NETWORKS[0].name);
});
