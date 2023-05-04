"use client";

import ErrorBoundary from "@/utils/ErrorBoundary";
import Books from "./books";

export default function BooksRtkQuery() {
  return (
    <ErrorBoundary>
      <Books />
    </ErrorBoundary>
  );
}
