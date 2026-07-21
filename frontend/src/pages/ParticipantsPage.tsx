import { useCallback, useEffect, useState } from "react";
import { createParticipant, listParticipants } from "../api/participants";
import { ApiError } from "../api/client";
import { useAuth } from "../context/AuthContext";
import AddParticipantForm from "../components/AddParticipantForm";
import ParticipantTable from "../components/ParticipantTable";
import type { Participant, ParticipantCreate } from "../types/api";

export default function ParticipantsPage() {
  const { logout } = useAuth();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadParticipants = useCallback(async () => {
    setError("");
    try {
      const data = await listParticipants();
      setParticipants(data);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        logout();
        return;
      }
      setError(err instanceof Error ? err.message : "Could not load participants");
    } finally {
      setLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    void loadParticipants();
  }, [loadParticipants]);

  async function handleCreate(payload: ParticipantCreate) {
    await createParticipant(payload);
    await loadParticipants();
  }

  return (
    <div className="page">
      <h1>Participants</h1>
      <AddParticipantForm onSubmit={handleCreate} />
      {loading ? <p className="muted">Loading...</p> : null}
      {error ? <p className="error">{error}</p> : null}
      {!loading && !error ? <ParticipantTable participants={participants} /> : null}
    </div>
  );
}
