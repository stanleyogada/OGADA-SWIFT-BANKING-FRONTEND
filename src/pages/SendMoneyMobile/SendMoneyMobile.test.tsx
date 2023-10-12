import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SEND_MONEY_MOBILE_NETWORKS, SEND_MONEY_MOBILE_BUNDLES } from "@constants/index";

import SendMoneyMobile from ".";

import type { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import type { TSendMoneyMobileNetwork } from "@customTypes/SendMoneyMobileNetwork";
import { handleAssertLoadingState } from "@utils/test/assertUtils";
import TestProviders from "@components/TestProviders";
import createServer from "@utils/test/createServer";
import { BASE_URL, ENDPOINTS } from "@constants/services";

let user: UserEvent;
beforeEach(() => (user = userEvent.setup()));

createServer([
  {
    url: `${BASE_URL}${ENDPOINTS.sendMoneyMobile}`,
    method: "post",
  },
]);

test("Renders as mobile page as tabs", async () => {
  render(<SendMoneyMobile />, {
    wrapper: TestProviders,
  });

  const $tabs = screen.getByTestId("tabs");
  const withinTabs = within($tabs);

  expect(withinTabs.getAllByTestId("tab")).toHaveLength(2);
  expect(withinTabs.getAllByTestId("tab")[0]).toHaveTextContent(/airtime/i);
  expect(withinTabs.getAllByTestId("tab")[1]).toHaveTextContent(/data/i);
});

test("Renders a network selector", async () => {
  render(<SendMoneyMobile />, {
    wrapper: TestProviders,
  });

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
  render(<SendMoneyMobile />, {
    wrapper: TestProviders,
  });

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

    const [$firstBundle, $secondBundle] = screen.getAllByTestId("bundle");

    if (!isAirtimeTab) {
      expect(screen.getAllByTestId("bundle")).toHaveLength(bundles.length);
      expect($firstBundle).toHaveTextContent(new RegExp(bundles[0].amount.toString(), "i"));
      expect($firstBundle).toHaveTextContent(new RegExp(bundles[0].data as string, "i"));
      expect($firstBundle).toHaveTextContent(new RegExp(bundles[0].validity as string, "i"));

      expect(screen.getAllByTestId("bundle-tag")).toHaveLength(bundlesTags.length);
    }

    if (isAirtimeTab) {
      expect(screen.getAllByTestId("bundle")).toHaveLength(6);
      expect($firstBundle).toHaveTextContent(new RegExp(SEND_MONEY_MOBILE_BUNDLES[0].amount.toString(), "i"));
      expect($firstBundle).not.toHaveTextContent(new RegExp(SEND_MONEY_MOBILE_BUNDLES[0].data as string, "i"));
      expect($firstBundle).not.toHaveTextContent(new RegExp(SEND_MONEY_MOBILE_BUNDLES[0].validity as string, "i"));

      expect(screen.queryAllByTestId("bundle-tag")).toHaveLength(0);
    }

    let lastIndex = bundles.length - 1;
    expect(screen.getAllByTestId("bundle")[lastIndex]).toHaveTextContent(
      new RegExp(bundles[lastIndex].amount.toString(), "i")
    );

    const handleAssertAmountInput = async (amount: string) => {
      if (!isAirtimeTab) return;

      const $amount = screen.getByPlaceholderText(/amount/i);
      expect($amount).toHaveValue(amount);

      return $amount;
    };

    const $payButton = screen.getByRole("button", { name: /pay/i });

    expect($payButton).toBeDisabled();
    expect($firstBundle).not.toHaveClass("active");
    handleAssertAmountInput("");

    await user.click($firstBundle);
    expect($firstBundle).toHaveClass("active");
    expect($payButton).toBeEnabled();
    handleAssertAmountInput(SEND_MONEY_MOBILE_BUNDLES[0].amount.toString());

    await user.click($firstBundle);
    expect($firstBundle).not.toHaveClass("active");
    expect($payButton).toBeDisabled();
    handleAssertAmountInput("");

    await user.click($secondBundle);
    expect($firstBundle).not.toHaveClass("active");
    expect($secondBundle).toHaveClass("active");
    expect($payButton).toBeEnabled();
    handleAssertAmountInput(SEND_MONEY_MOBILE_BUNDLES[1].amount.toString());

    await user.click($firstBundle);
    expect($firstBundle).toHaveClass("active");
    expect($secondBundle).not.toHaveClass("active");
    expect($payButton).toBeEnabled();
    handleAssertAmountInput(SEND_MONEY_MOBILE_BUNDLES[0].amount.toString());

    const allAccountTypeRadio = screen.getAllByTestId("account-type-radio");
    expect(allAccountTypeRadio).toHaveLength(2);

    const [$NormalAccountTypeRadio, $CashbackAccountTypeRadio] = allAccountTypeRadio;
    expect($NormalAccountTypeRadio).toHaveTextContent(/normal/i);
    expect($CashbackAccountTypeRadio).toHaveTextContent(/cashback/i);

    expect($NormalAccountTypeRadio).toHaveClass("active");
    expect($CashbackAccountTypeRadio).not.toHaveClass("active");

    const handleAssertClickAccountTypeRadio = async (isNormalAccountTypeRadio: boolean) => {
      if (isNormalAccountTypeRadio) {
        await user.click($NormalAccountTypeRadio);

        expect($NormalAccountTypeRadio).toHaveClass("active");
        expect($CashbackAccountTypeRadio).not.toHaveClass("active");

        return;
      }

      await user.click($CashbackAccountTypeRadio);

      expect($CashbackAccountTypeRadio).toHaveClass("active");
      expect($NormalAccountTypeRadio).not.toHaveClass("active");
    };

    await handleAssertClickAccountTypeRadio(false);
    await handleAssertClickAccountTypeRadio(true);
    await handleAssertClickAccountTypeRadio(true);

    await user.click($payButton);

    await handleAssertLoadingState($payButton);
    expect(screen.getByTestId("success")).toBeInTheDocument();
  };

  await handleAssertPhone($dataTab);
  expect(screen.queryByPlaceholderText(/amount/i)).not.toBeInTheDocument();
  await handleAssertBundles(false);

  // await handleAssertPhone($airtimeTab);
  // expect(screen.getByPlaceholderText(/amount/i)).toBeInTheDocument();
  // await handleAssertBundles(true);
});
