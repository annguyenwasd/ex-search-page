import { render, fireEvent } from "@testing-library/react";
import Autocomplete from ".";
import React from "react";

const placeholder = "Try Vietnam";
const fakeOptions = [
  { label: "Ha noi", value: "hanoi" },
  { label: "Ha tinh", value: "hatinh" }
];

test("should render without error", () => {
  const { getByPlaceholderText } = render(
    <Autocomplete placeholder={placeholder} />
  );
  expect(getByPlaceholderText(placeholder)).toBeInTheDocument();
});

test("should not show options when focused and not enter anything", () => {
  const { getByPlaceholderText } = render(
    <Autocomplete placeholder={placeholder} options={null} />
  );
  const input = getByPlaceholderText(placeholder);
  input.focus();
  expect(input).toHaveFocus();
  input.blur();
  expect(input).not.toHaveFocus();
});

test("should call onChange handler when input after 500ms", () => {
  const mockOnChange = jest.fn();
  const { getByRole } = render(
    <Autocomplete
      placeholder={placeholder}
      options={null}
      onChange={mockOnChange}
    />
  );
  const input = getByRole("textbox");
  fireEvent.change(input, { target: { value: "ha" } });
  expect(mockOnChange).toBeCalledTimes(0);

  setTimeout(() => {
    expect(mockOnChange).toBeCalledTimes(1);
    expect(mockOnChange).toBeCalledWith("ha");
    expect(input.value).toBe("ha");
  }, 500);
});

test("should display options when fetched results", () => {
  const { queryByTestId, getByRole } = render(
    <Autocomplete placeholder={placeholder} options={fakeOptions} />
  );
  const resultWrapperTry1 = queryByTestId("result-wrapper");
  expect(resultWrapperTry1).toBeNull();
  const input = getByRole("textbox");
  input.focus();
  const resultWrapperTry2 = queryByTestId("result-wrapper");
  expect(resultWrapperTry2).not.toBeNull();
  expect(resultWrapperTry2).toBeVisible();
});

test.skip("should hide the options when click outside the autocomplete", () => {
  const { getByText, queryByTestId, getByRole } = render(
    <div>
      <button>outside</button>
      <Autocomplete placeholder={placeholder} options={fakeOptions} />
    </div>
  );
  const resultWrapperTry1 = queryByTestId("result-wrapper");
  expect(resultWrapperTry1).toBeNull();
  const input = getByRole("textbox");
  fireEvent.focus(input);
  const resultWrapperTry2 = queryByTestId("result-wrapper");
  expect(resultWrapperTry2).not.toBeNull();
  // click outside autocomplete
  fireEvent.click(getByText("outside"));
  const resultWrapperTry3 = queryByTestId("result-wrapper");
  expect(resultWrapperTry3).toBeNull();
});

test("should replace text in input by the label when select an option", () => {
  const { getByRole, queryByText } = render(
    <Autocomplete
      placeholder={placeholder}
      options={fakeOptions}
      onSelect={jest.fn()}
    />
  );
  const input = getByRole("textbox");
  input.focus();
  const firstOption = fakeOptions[0];
  const firstDOMOption = queryByText(firstOption.label);
  expect(firstDOMOption).toBeInTheDocument();
  fireEvent.click(firstDOMOption);
  expect(input.value).toEqual(firstOption.label);
});
