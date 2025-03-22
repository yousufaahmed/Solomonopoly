// Written by Mohammed Zarrar Shahid

import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

// Mock all the page components to isolate routing behavior
jest.mock("../pages/Splash", () => () => <div data-testid="splash">Mock SplashScreen</div>);
jest.mock("../pages/LoginForm", () => () => <div data-testid="loginform">Mock LoginForm</div>);
jest.mock("../pages/SignUp", () => () => <div data-testid="signup">Mock SignUp</div>);
jest.mock("../pages/Home", () => () => <div data-testid="home">Mock Home</div>);
jest.mock("../pages/NotFound", () => () => <div data-testid="notfound">Mock NotFound</div>);
jest.mock("../pages/QRScreen", () => () => <div data-testid="qr">Mock QRScreen</div>);
jest.mock("../pages/UserProfile", () => () => <div data-testid="user">Mock UserProfile</div>);
jest.mock("../pages/Taskboard", () => () => <div data-testid="taskboard">Mock Taskboard</div>);
jest.mock("../pages/Leaderboard", () => () => <div data-testid="leaderboard">Mock Leaderboard</div>);

describe("App Routing", () => {
  test("renders SplashScreen for the default route", () => {
    window.history.pushState({}, "Test page", "/");
    render(<App />);
    expect(screen.getByTestId("splash")).toBeInTheDocument();
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

  test("renders SplashScreen for /splashscreen route", () => {
    window.history.pushState({}, "Test page", "/splashscreen");
    render(<App />);
    expect(screen.getByTestId("splash")).toBeInTheDocument();
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

  test("renders NotFound for an unknown route", () => {
    window.history.pushState({}, "Test page", "/some/unknown/path");
    render(<App />);
    expect(screen.getByTestId("notfound")).toBeInTheDocument();
  });
});
