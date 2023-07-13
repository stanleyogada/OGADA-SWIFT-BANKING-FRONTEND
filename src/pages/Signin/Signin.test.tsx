import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import Signin from "./";
import createServer from "../../utils/test/createServer";
import { BASE_URL } from "../../constants/services";

const renderComponent = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // ✅ turns retries off
        retry: false,
      },
    },
  });

  render(
    // @ts-ignore
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <Signin />
      </MemoryRouter>
    </QueryClientProvider>
  );
};

createServer([
  {
    method: "post",
    url: `${BASE_URL}/auth/signin`,
    res() {
      return {
        token: "1234567890",
      };
    },
  },
  {
    method: "get",
    url: `${BASE_URL}/users/me`,
    res() {
      return {
        data: {
          id: 1,
        },
      };
    },
  },
]);

const { reload } = window.location;

beforeAll(() => {
  Object.defineProperty(window, "location", {
    writable: true,
    value: { reload: jest.fn() },
  });
});

afterAll(() => {
  window.location.reload = reload;
});

test("Render content of Signin page correctly", () => {
  renderComponent();

  const pageTitle = screen.getByRole("heading", { name: /sign in/i });
  const subTitle = screen.getByRole("heading", { name: /welcome back/i });

  const phoneInput = screen.getByPlaceholderText(/phone number/i);
  const passwordInput = screen.getByPlaceholderText(/enter 6 digits login passcode/i);

  const rememberLoginPasscode = screen.getByRole("checkbox", { name: /remember login passcode/i });
  const forgotLoginPasscode = screen.getByRole("link", { name: /forgot login passcode/i });

  const signInButton = screen.getByRole("button", { name: /sign in/i });

  expect(pageTitle).toBeInTheDocument();
  expect(subTitle).toBeInTheDocument();
  expect(phoneInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(rememberLoginPasscode).toBeInTheDocument();
  expect(forgotLoginPasscode).toBeInTheDocument();
  expect(signInButton).toBeInTheDocument();
});

test("Signing form works correctly onSuccess", async () => {
  const user = userEvent.setup();
  renderComponent();

  const phoneInput = screen.getByPlaceholderText(/phone number/i);
  const passwordInput = screen.getByPlaceholderText(/enter 6 digits login passcode/i);

  await user.type(phoneInput, "1234567890");
  await user.type(passwordInput, "123456");

  expect(phoneInput).toHaveValue("1234567890");
  expect(passwordInput).toHaveValue("123456");

  expect(window.location.reload).not.toHaveBeenCalled();

  const signInButton = screen.getByRole("button", { name: /sign in/i });
  await user.click(signInButton);

  expect(window.location.reload).toHaveBeenCalled();
});

const pause = () => new Promise((res) => setTimeout(res, 100));
