import { render, screen } from "@testing-library/react";
import CandidateList from "./CandidateList";
import UserEvent from "@testing-library/user-event";

describe("CandidateList Component", () => {
  test("on load it should display 0", () => {
    render(<CandidateList/>);
    // assert functions
    expect(screen.getByTestId("candidatevalue")).toHaveTextContent("0");
  });
  test("on increment click it should display 1", () => {
    render(<CandidateList/>);
    // simulate event
    UserEvent.click(screen.getByTestId("increment-btn"));
    // assert functions
    expect(screen.getByTestId("candidatevalue")).toHaveTextContent("1");
  });
  test("on decrement click it should be -1", () => {
    render(<CandidateList />);
    // simulate event
    UserEvent.click(screen.getByTestId("decrement-btn"));
    // assert functions
    expect(screen.getByTestId("candidatevalue")).toHaveTextContent("-1");
  });
  test("match snapshot", () => {
    const { asFragment } = render(<CandidateList />);
    expect(asFragment).toMatchSnapshot();
  });
});
