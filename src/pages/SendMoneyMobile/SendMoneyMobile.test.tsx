import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SendMoneyMobile from ".";

import type { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { SEND_MONEY_MOBILE_NETWORKS, SEND_MONEY_MOBILE_BUNDLES } from "@constants/index";

import type { TSendMoneyMobileNetwork } from "@customTypes/SendMoneyMobileNetwork";

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

test("Ensure buy mobile data/airtime successfully", async () => {
  render(<SendMoneyMobile />);

  const $airtimeTab = within(screen.getByTestId("tabs")).getAllByTestId("tab")[0];
  const $dataTab = within(screen.getByTestId("tabs")).getAllByTestId("tab")[1];

  const handleAssertPhone = async ($tab: HTMLElement) => {
    await user.click($tab);
    const $phone = screen.getByPlaceholderText(/phone number/i);

    const phoneValue = "08012345678";

    await user.type($phone, phoneValue);
    expect($phone).toHaveValue(phoneValue);

    await user.type($phone, "123456");
    expect($phone).toHaveValue(phoneValue);
  };

  const handleAssertBundles = async (isAirtimeTab: boolean) => {
    const bundles = isAirtimeTab ? SEND_MONEY_MOBILE_BUNDLES.slice(0, 6) : SEND_MONEY_MOBILE_BUNDLES;
    const bundlesTags = bundles.filter((bundle) => bundle.tag);

    if (!isAirtimeTab) {
      expect(screen.getAllByTestId("bundle")).toHaveLength(bundles.length);
      expect(screen.getAllByTestId("bundle")[0]).toHaveTextContent(new RegExp(bundles[0].amount.toString(), "i"));
      expect(screen.getAllByTestId("bundle")[0]).toHaveTextContent(new RegExp(bundles[0].data as string, "i"));
      expect(screen.getAllByTestId("bundle")[0]).toHaveTextContent(new RegExp(bundles[0].validity as string, "i"));

      expect(screen.getAllByTestId("bundle-tag")).toHaveLength(bundlesTags.length);
    }

    if (isAirtimeTab) {
      expect(screen.getAllByTestId("bundle")).toHaveLength(6);
      expect(screen.getAllByTestId("bundle")[0]).toHaveTextContent(
        new RegExp(SEND_MONEY_MOBILE_BUNDLES[0].amount.toString(), "i")
      );
      expect(screen.getAllByTestId("bundle")[0]).not.toHaveTextContent(
        new RegExp(SEND_MONEY_MOBILE_BUNDLES[0].data as string, "i")
      );
      expect(screen.getAllByTestId("bundle")[0]).not.toHaveTextContent(
        new RegExp(SEND_MONEY_MOBILE_BUNDLES[0].validity as string, "i")
      );

      expect(screen.queryAllByTestId("bundle-tag")).toHaveLength(0);
    }

    let lastIndex = bundles.length - 1;
    expect(screen.getAllByTestId("bundle")[lastIndex]).toHaveTextContent(
      new RegExp(bundles[lastIndex].amount.toString(), "i")
    );
  };

  await handleAssertPhone($dataTab);
  expect(screen.queryByPlaceholderText(/amount/i)).not.toBeInTheDocument();
  handleAssertBundles(false);

  await handleAssertPhone($airtimeTab);
  expect(screen.getByPlaceholderText(/amount/i)).toBeInTheDocument();
  handleAssertBundles(true);
});
