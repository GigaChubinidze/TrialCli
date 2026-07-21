import { FormEvent, useState } from "react";
import type { Gender, ParticipantCreate, ParticipantStatus, StudyGroup } from "../types/api";

const defaultForm: ParticipantCreate = {
  subject_id: "",
  study_group: "treatment",
  enrollment_date: new Date().toISOString().slice(0, 10),
  status: "active",
  age: 45,
  gender: "F",
};

interface AddParticipantFormProps {
  onSubmit: (payload: ParticipantCreate) => Promise<void>;
}

export default function AddParticipantForm({ onSubmit }: AddParticipantFormProps) {
  const [form, setForm] = useState<ParticipantCreate>(defaultForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await onSubmit(form);
      setForm({ ...defaultForm, subject_id: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not add participant");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card" style={{ marginBottom: "1.5rem" }}>
      <h2>Add participant</h2>
      <form onSubmit={handleSubmit} className="form form-grid">
        <label>
          Subject ID
          <input
            value={form.subject_id}
            onChange={(event) => setForm({ ...form, subject_id: event.target.value })}
            required
          />
        </label>
        <label>
          Study group
          <select
            value={form.study_group}
            onChange={(event) =>
              setForm({ ...form, study_group: event.target.value as StudyGroup })
            }
          >
            <option value="treatment">Treatment</option>
            <option value="control">Control</option>
          </select>
        </label>
        <label>
          Enrollment date
          <input
            type="date"
            value={form.enrollment_date}
            onChange={(event) => setForm({ ...form, enrollment_date: event.target.value })}
            required
          />
        </label>
        <label>
          Status
          <select
            value={form.status}
            onChange={(event) =>
              setForm({ ...form, status: event.target.value as ParticipantStatus })
            }
          >
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="withdrawn">Withdrawn</option>
          </select>
        </label>
        <label>
          Age
          <input
            type="number"
            min={0}
            max={150}
            value={form.age}
            onChange={(event) => setForm({ ...form, age: Number(event.target.value) })}
            required
          />
        </label>
        <label>
          Gender
          <select
            value={form.gender}
            onChange={(event) => setForm({ ...form, gender: event.target.value as Gender })}
          >
            <option value="F">F</option>
            <option value="M">M</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add participant"}
          </button>
        </div>
      </form>
      {error ? <p className="error">{error}</p> : null}
    </div>
  );
}
