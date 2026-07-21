export type StudyGroup = "treatment" | "control";
export type ParticipantStatus = "active" | "completed" | "withdrawn";
export type Gender = "F" | "M" | "Other";

export interface Participant {
  participant_id: string;
  subject_id: string;
  study_group: StudyGroup;
  enrollment_date: string;
  status: ParticipantStatus;
  age: number;
  gender: Gender;
}

export interface ParticipantCreate {
  subject_id: string;
  study_group: StudyGroup;
  enrollment_date: string;
  status: ParticipantStatus;
  age: number;
  gender: Gender;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface MetricsSummary {
  total_participants: number;
  average_age: number;
  by_study_group: {
    treatment: number;
    control: number;
  };
  by_status: {
    active: number;
    completed: number;
    withdrawn: number;
  };
  by_gender: {
    F: number;
    M: number;
    Other: number;
  };
}
