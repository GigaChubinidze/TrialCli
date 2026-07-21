import { apiFetch } from "./client";
import type { Participant, ParticipantCreate } from "../types/api";

export function listParticipants(): Promise<Participant[]> {
  return apiFetch<Participant[]>("/participants");
}

export function createParticipant(payload: ParticipantCreate): Promise<Participant> {
  return apiFetch<Participant>("/participants", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
