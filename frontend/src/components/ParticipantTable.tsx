import type { Participant, ParticipantStatus } from "../types/api";

function statusClass(status: ParticipantStatus): string {
  if (status === "active") return "badge badge-active";
  if (status === "completed") return "badge badge-completed";
  return "badge badge-withdrawn";
}

interface ParticipantTableProps {
  participants: Participant[];
}

export default function ParticipantTable({ participants }: ParticipantTableProps) {
  if (participants.length === 0) {
    return <p className="muted">No participants yet.</p>;
  }

  return (
    <div className="card table-wrap">
      <table>
        <thead>
          <tr>
            <th>Subject ID</th>
            <th>Group</th>
            <th>Enrolled</th>
            <th>Status</th>
            <th>Age</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant) => (
            <tr key={participant.participant_id}>
              <td>{participant.subject_id}</td>
              <td>{participant.study_group}</td>
              <td>{participant.enrollment_date}</td>
              <td>
                <span className={statusClass(participant.status)}>{participant.status}</span>
              </td>
              <td>{participant.age}</td>
              <td>{participant.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
