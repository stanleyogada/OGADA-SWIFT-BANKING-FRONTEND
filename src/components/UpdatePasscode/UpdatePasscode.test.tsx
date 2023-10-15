import TestProviders from "@components/TestProviders";
import { BASE_URL, ENDPOINTS } from "@constants/services";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { handleAssertLoadingState } from "@utils/test/assertUtils";
import createServer from "@utils/test/createServer";
import UpdatePasscode from ".";

let user: UserEvent;

beforeEach(() => {
  user = userEvent.setup();
});

const { handleCreateErrorConfig } = createServer([
  {
    method: "patch",
    url: `${BASE_URL}${ENDPOINTS.updatePass}`,
    res(req, res, ctx) {
      return {
        data: {
          status: "success",
          message: "Login passcode updated successfully!",
        },
      };
    },
  },
]);

const simulateTypePasscode = async () => {
  let newPasscodeInput = screen.getByPlaceholderText(/Old login passcode/);
  let oldPasscodeInput = screen.getByPlaceholderText(/New login passcode/);

  user.type(oldPasscodeInput, "4444444");
  user.type(newPasscodeInput, "123456");
  const updateBtn = screen.getByTestId("updatebtn");
  await user.click(updateBtn);

  await handleAssertLoadingState("load");
};

test("assert user update the password successfully", async () => {
  render(<UpdatePasscode />, {
    wrapper: TestProviders,
  });

  simulateTypePasscode();
  const success = await screen.findByTestId("success");
  expect(success).toBeInTheDocument();
});

test("assert user update the password failed", async () => {
  handleCreateErrorConfig({
    method: "patch",
    url: `${BASE_URL}${ENDPOINTS.updatePass}`,
    statusCode: 404,
  });
  render(<UpdatePasscode />, {
    wrapper: TestProviders,
  });

  simulateTypePasscode();
  const error = await screen.findByTestId("error");
  expect(error).toBeInTheDocument();
});
