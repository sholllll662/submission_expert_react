import React from "react";
import { render, screen } from "@testing-library/react";
import ThreadItem from "./ThreadItem";

describe("ThreadItem component", () => {
  test("renders title, category and snippet", () => {
    const thread = {
      id: "t1",
      title: "Hello",
      body: "This is a body",
      category: "General",
      createdAt: new Date().toISOString(),
      totalComments: 2,
    };
    const author = { name: "User", avatar: "" };
    render(<ThreadItem thread={thread} author={author} />);

    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("General")).toBeInTheDocument();
    expect(screen.getByText(/This is a body/)).toBeInTheDocument();
  });
});
