import {  afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
    cleanup();
});

globalThis.fetch = vi.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({}),
    })
) as ReturnType<typeof vi.fn>;
