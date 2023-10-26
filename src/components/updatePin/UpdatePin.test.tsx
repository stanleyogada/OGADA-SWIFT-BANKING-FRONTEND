import TestProviders from "@components/TestProviders";
import { BASE_URL, ENDPOINTS } from "@constants/services";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import { handleAssertLoadingState } from "@utils/test/assertUtils";
import createServer from "@utils/test/createServer";
import UpdatePin from ".";

let user: UserEvent;

beforeEach(() => {
  user = userEvent.setup();
});

const { handleCreateErrorConfig } = createServer([
  {
    method: "patch",
    url: `${BASE_URL}${ENDPOINTS.updatePass}`,
    res() {
      return {
        data: {
          status: "success",
          message: "Login passcode updated successfully!",
        },
      };
    },
  },
]);

const simulateTypePin = async () => {
  let newPasscodeInput = screen.getByPlaceholderText(/Old transfer pin/);
  let oldPasscodeInput = screen.getByPlaceholderText(/New transfer pin/);

  user.type(oldPasscodeInput, "4444444");
  user.type(newPasscodeInput, "123456");
  const updateBtn = screen.getByTestId("updatebtn");
  await user.click(updateBtn);

  await handleAssertLoadingState("load");
};

test("assert user update the password successfully", async () => {
  render(<UpdatePin />, {
    wrapper: TestProviders,
  });

  await simulateTypePin();
  const success = await screen.findByTestId("success");
  expect(success).toBeInTheDocument();
});

test("assert user update the password failed", async () => {
  handleCreateErrorConfig({
    method: "patch",
    url: `${BASE_URL}${ENDPOINTS.updatePass}`,
    statusCode: 404,
  });
  render(<UpdatePin />, {
    wrapper: TestProviders,
  });

  await simulateTypePin();
  const error = await screen.findByTestId("error");
  expect(error).toBeInTheDocument();
});
