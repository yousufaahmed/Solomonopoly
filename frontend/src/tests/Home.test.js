import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../pages/Home.jsx";

// Mock the Footer component so we can isolate Home tests
jest.mock("../components/footer", () => () => <div data-testid="footer">Footer</div>);

describe("Home Component", () => {
  // Before each test, we override window.location and window.open
  beforeEach(() => {
    // Override window.location.href (simulate navigation)
    delete window.location;
    window.location = { href: "", assign: jest.fn() };

    // Spy on window.open for external navigation
    window.open = jest.fn();
  });

  test("renders header and subtitle", () => {
    render(<Home />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Welcome to Green Exeter!")).toBeInTheDocument();
  });

  test("renders all navigation buttons", () => {
    render(<Home />);
    expect(screen.getByRole("button", { name: /Leaderboard/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Taskboard/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Scan a QR Code/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Learn More About Sustainability/i })).toBeInTheDocument();
  });

  test("navigates to /leaderboard when Leaderboard button is clicked", () => {
    render(<Home />);
    fireEvent.click(screen.getByRole("button", { name: /Leaderboard/i }));
    expect(window.location.href).toBe("/leaderboard");
  });

  test("navigates to /taskboard when Taskboard button is clicked", () => {
    render(<Home />);
    fireEvent.click(screen.getByRole("button", { name: /Taskboard/i }));
    expect(window.location.href).toBe("/taskboard");
  });

  test("navigates to /qr when Scan a QR Code button is clicked", () => {
    render(<Home />);
    fireEvent.click(screen.getByRole("button", { name: /Scan a QR Code/i }));
    expect(window.location.href).toBe("/qr");
  });

  test("opens sustainability page in a new tab when button is clicked", () => {
    render(<Home />);
    fireEvent.click(screen.getByRole("button", { name: /Learn More About Sustainability/i }));
    expect(window.open).toHaveBeenCalledWith("https://www.exeter.ac.uk/about/sustainability/", "_blank");
  });

  test("renders the Footer component", () => {
    render(<Home />);
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});
