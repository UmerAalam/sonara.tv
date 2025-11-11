import { createFileRoute } from "@tanstack/solid-router";
import HomePage from "../pages/HomePage";

export const Route = createFileRoute("/")({ component: HomePage });
