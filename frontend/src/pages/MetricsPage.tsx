import { useCallback, useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getMetricsSummary } from "../api/metrics";
import { ApiError } from "../api/client";
import { useAuth } from "../context/AuthContext";
import type { MetricsSummary } from "../types/api";

const chartColors = ["#2563eb", "#16a34a", "#dc2626", "#9333ea", "#ea580c"];

function toChartData(labels: Record<string, number>) {
  return Object.entries(labels).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));
}

function genderChartData(summary: MetricsSummary) {
  return [
    { name: "F", value: summary.by_gender.F },
    { name: "M", value: summary.by_gender.M },
    { name: "Other", value: summary.by_gender.Other },
  ];
}

function MetricChart({ title, data }: { title: string; data: { name: string; value: number }[] }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="chart">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function MetricsPage() {
  const { logout } = useAuth();
  const [summary, setSummary] = useState<MetricsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMetrics = useCallback(async () => {
    setError("");
    try {
      const data = await getMetricsSummary();
      setSummary(data);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        logout();
        return;
      }
      setError(err instanceof Error ? err.message : "Could not load metrics");
    } finally {
      setLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    void loadMetrics();
  }, [loadMetrics]);

  if (loading) {
    return (
      <div className="page">
        <h1>Metrics</h1>
        <p className="muted">Loading...</p>
      </div>
    );
  }

  if (error || !summary) {
    return (
      <div className="page">
        <h1>Metrics</h1>
        <p className="error">{error || "Could not load metrics"}</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Metrics</h1>
      <div className="stats-grid">
        <div className="card stat-card">
          <p className="muted">Total participants</p>
          <p className="stat-value">{summary.total_participants}</p>
        </div>
        <div className="card stat-card">
          <p className="muted">Average age</p>
          <p className="stat-value">{summary.average_age}</p>
        </div>
      </div>
      <div className="charts-grid">
        <MetricChart title="By study group" data={toChartData(summary.by_study_group)} />
        <MetricChart title="By status" data={toChartData(summary.by_status)} />
        <MetricChart title="By gender" data={genderChartData(summary)} />
      </div>
    </div>
  );
}
