import { apiFetch } from "./client";
import type { MetricsSummary } from "../types/api";

export function getMetricsSummary(): Promise<MetricsSummary> {
  return apiFetch<MetricsSummary>("/metrics/summary");
}
