import React from "react";

export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 pd-4 text-center">
      Copyright &copy; {new Date().getFullYear()} <a href="https://en.wikipedia.org/wiki/Copyright_notice#:~:text=When%20a%20work%20is%20published,registration%20with%2C%20the%20Copyright%20Office.">Team Web </a>
    </footer>
  );
}
