// Written by Mohammed Zarrar Shahid, updated by Aleem-Deen Abbas-Hussain

import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

// Mock all page components to isolate routing behavior
jest.mock("../pages/Splash", () => () => <div data-testid="splash">Mock SplashScreen</div>);
jest.mock("../pages/LoginForm", () => () => <div data-testid="loginform">Mock LoginForm</div>);
jest.mock("../pages/SignUp", () => () => <div data-testid="signup">Mock SignUp</div>);
jest.mock("../pages/Home", () => () => <div data-testid="home">Mock Home</div>);
jest.mock("../pages/NotFound", () => () => <div data-testid="notfound">Mock NotFound</div>);
jest.mock("../pages/QRScreen", () => () => <div data-testid="qr">Mock QRScreen</div>);
jest.mock("../pages/UserProfile", () => () => <div data-testid="user">Mock UserProfile</div>);
jest.mock("../pages/Taskboard", () => () => <div data-testid="taskboard">Mock Taskboard</div>);
jest.mock("../pages/Leaderboard", () => () => <div data-testid="leaderboard">Mock Leaderboard</div>);
jest.mock("../pages/ResetPassword", () => () => <div data-testid="reset">Mock ResetPwd</div>);
jest.mock("../pages/TermsAndConditions", () => () => <div data-testid="terms">Mock Terms</div>);
jest.mock("../pages/UserForm", () => () => <div data-testid="userform">Mock UserForm</div>);
jest.mock("../pages/Inventory", () => () => <div data-testid="inventory">Mock Inventory</div>);
jest.mock("../pages/Store", () => () => <div data-testid="store">Mock Store</div>);
jest.mock("../pages/Map", () => () => <div data-testid="map">Mock Map</div>);
jest.mock("../pages/Achievements", () => () => <div data-testid="achievements">Mock Achievements</div>);
jest.mock("../pages/PackOpening", () => () => <div data-testid="packopening">Mock PackOpening</div>);

// ProtectedRoute passthrough
jest.mock("../components/ProtectedRoute", () => ({ children }) => <>{children}</>);

describe("App Routing", () => {
  test("renders SplashScreen for the default route", () => {
    window.history.pushState({}, "Test page", "/");
    render(<App />);
    expect(screen.getByTestId("home")).toBeInTheDocument();
  });

  test("renders LoginForm for /loginform route", () => {
    window.history.pushState({}, "Test page", "/loginform");
    render(<App />);
    expect(screen.getByTestId("loginform")).toBeInTheDocument();
  });

  test("renders SignUp for /signup route", () => {
    window.history.pushState({}, "Test page", "/signup");
    render(<App />);
    expect(screen.getByTestId("signup")).toBeInTheDocument();
  });

  test("renders ResetPwd for /reset route", () => {
    window.history.pushState({}, "Test page", "/reset");
    render(<App />);
    expect(screen.getByTestId("reset")).toBeInTheDocument();
  });

  test("renders Terms for /Terms route", () => {
    window.history.pushState({}, "Test page", "/Terms");
    render(<App />);
    expect(screen.getByTestId("terms")).toBeInTheDocument();
  });

  test("renders Home for /home route", () => {
    window.history.pushState({}, "Test page", "/home");
    render(<App />);
    expect(screen.getByTestId("home")).toBeInTheDocument();
  });

  test("renders QRScreen for /qr route", () => {
    window.history.pushState({}, "Test page", "/qr");
    render(<App />);
    expect(screen.getByTestId("qr")).toBeInTheDocument();
  });

  test("renders UserProfile for /user route", () => {
    window.history.pushState({}, "Test page", "/user");
    render(<App />);
    expect(screen.getByTestId("user")).toBeInTheDocument();
  });

  test("renders Taskboard for /taskboard route", () => {
    window.history.pushState({}, "Test page", "/taskboard");
    render(<App />);
    expect(screen.getByTestId("taskboard")).toBeInTheDocument();
  });

  test("renders Leaderboard for /leaderboard route", () => {
    window.history.pushState({}, "Test page", "/leaderboard");
    render(<App />);
    expect(screen.getByTestId("leaderboard")).toBeInTheDocument();
  });

  test("renders UserForm for /UserForm route", () => {
    window.history.pushState({}, "Test page", "/UserForm");
    render(<App />);
    expect(screen.getByTestId("userform")).toBeInTheDocument();
  });

  test("renders Inventory for /inventory route", () => {
    window.history.pushState({}, "Test page", "/inventory");
    render(<App />);
    expect(screen.getByTestId("inventory")).toBeInTheDocument();
  });

  test("renders Store for /store route", () => {
    window.history.pushState({}, "Test page", "/store");
    render(<App />);
    expect(screen.getByTestId("store")).toBeInTheDocument();
  });

  test("renders Map for /map route", () => {
    window.history.pushState({}, "Test page", "/map");
    render(<App />);
    expect(screen.getByTestId("map")).toBeInTheDocument();
  });

  test("renders Achievements for /achievements route", () => {
    window.history.pushState({}, "Test page", "/achievements");
    render(<App />);
    expect(screen.getByTestId("achievements")).toBeInTheDocument();
  });

  test("renders PackOpening for /packopening route", () => {
    window.history.pushState({}, "Test page", "/packopening");
    render(<App />);
    expect(screen.getByTestId("packopening")).toBeInTheDocument();
  });

  test("clears localStorage and redirects on /logout", () => {
    localStorage.setItem("test", "value");
    window.history.pushState({}, "Test page", "/logout");
    render(<App />);
    expect(localStorage.getItem("test")).toBe(null);
  });

  test("renders NotFound for unknown route", () => {
    window.history.pushState({}, "Test page", "/some/unknown/path");
    render(<App />);
    expect(screen.getByTestId("notfound")).toBeInTheDocument();
  });
});
