import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ForgetPassword from ".";
import createServer from "../../../utils/test/createServer";
import { BASE_URL, ENDPOINTS } from "../../../constants/services";
import { handleAssertLoadingAfterSubmitClick } from "../../../utils/test/assertUtils";
import { navigate } from "../../../utils/test/mocks/navigate";
import { CLIENT_ROUTES, LOCAL_STORAGE_KEYS } from "../../../constants";
import { consoleErrorSpy } from "../../../utils/test/mocks/consoleSpy";

import TestProviders from "../../../components/TestProviders";
import { localStorageGetItem, localStorageSetItem } from "../../../utils/test/mocks/localStorage";

const { handleCreateErrorConfig } = createServer([
  {
    method: "post",
    url: `${BASE_URL}${ENDPOINTS.forgetPasscode}`,
  },
  `${BASE_URL}${ENDPOINTS.currentUser}`,
]);

describe("asserts that user is navigated to sign in on success ", () => {
  test("When the localStorage is empty", async () => {
    localStorageGetItem.mockReturnValueOnce(null);

    userEvent.setup();
    render(<ForgetPassword />, {
      wrapper: TestProviders,
    });

    expect(navigate).not.toHaveBeenCalled();
    expect(localStorageGetItem).toHaveBeenCalled();
    expect(localStorageSetItem).not.toHaveBeenCalled();

    const formValues = {
      phone: "1234567890",
      email: "test1@gmail.com",
    };

    const phoneInput = screen.getByLabelText(/phone number/i);
    const emailInput = screen.getByLabelText(/email/i);
    const resendOtpButton = screen.getByRole("button", {
      name: /send/i,
    });

    await userEvent.type(phoneInput, formValues.phone);
    await userEvent.type(emailInput, formValues.email);
    await userEvent.click(resendOtpButton);

    await handleAssertLoadingAfterSubmitClick(resendOtpButton);

    expect(navigate).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith(CLIENT_ROUTES.resetPasscode);

    expect(localStorageSetItem).toHaveBeenCalled();
    expect(localStorageSetItem).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.sendForgetPasscodeOTPSuccess,
      JSON.stringify({
        phone: formValues.phone,
        email: formValues.email,
        savedAtTime: Date.now(),
      })
    );
  });

  test("When the localStorage is NOT empty", async () => {
    const formValues = {
      phone: "1234567890",
      email: "test1@gmail.com",
    };

    localStorageGetItem.mockReturnValueOnce(
      JSON.stringify({
        phone: formValues.phone,
        email: formValues.email,
      })
    );

    const user = userEvent.setup();
    render(<ForgetPassword />, {
      wrapper: TestProviders,
    });
    expect(localStorageGetItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEYS.sendForgetPasscodeOTPSuccess);

    const phoneInput = screen.getByLabelText(/phone number/i);
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole("button", { name: /send/i });

    expect(emailInput).toHaveValue(formValues.email);
    expect(phoneInput).toHaveValue(formValues.phone);

    await user.click(submitButton);

    expect(localStorageSetItem).toHaveBeenCalledTimes(4);
    await handleAssertLoadingAfterSubmitClick(submitButton);
    expect(localStorageSetItem).toHaveBeenCalledTimes(4);

    expect(localStorageSetItem).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEYS.sendForgetPasscodeOTPSuccess,
      JSON.stringify({
        phone: formValues.phone,
        email: formValues.email,
        savedAtTime: Date.now(),
      })
    );
  });
});

test("Displays errors works correctly when the network request errors", async () => {
  handleCreateErrorConfig({
    method: "post",
    url: `${BASE_URL}${ENDPOINTS.forgetPasscode}`,
    statusCode: 400,
  });
  const user = userEvent.setup();
  render(<ForgetPassword />, {
    wrapper: TestProviders,
  });
  const phoneInput = screen.getByLabelText(/phone number/i);
  const email = screen.getByLabelText(/email/i);
  const resendOtpButton = screen.getByRole("button", {
    name: /send/i,
  });

  expect(JSON.stringify(consoleErrorSpy.mock.calls)).not.toContain("Request failed with status code 400");

  await user.type(phoneInput, "1234567890");
  await user.type(email, "test@example.com");
  await user.click(resendOtpButton);

  expect(localStorageSetItem).toHaveBeenCalledTimes(3);
  await handleAssertLoadingAfterSubmitClick(resendOtpButton);
  expect(localStorageSetItem).toHaveBeenCalledTimes(3);

  expect(JSON.stringify(consoleErrorSpy.mock.calls)).toContain("Request failed with status code 400");
  const error = screen.getByTestId("error");
  expect(error).toBeInTheDocument();
  expect(error).toHaveTextContent("");
});
