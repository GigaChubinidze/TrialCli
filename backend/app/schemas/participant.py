from datetime import date
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

from app.enums import Gender, ParticipantStatus, StudyGroup


class ParticipantCreate(BaseModel):
    subject_id: str = Field(min_length=1, max_length=50)
    study_group: StudyGroup
    enrollment_date: date
    status: ParticipantStatus
    age: int = Field(ge=0, le=150)
    gender: Gender


class ParticipantRead(BaseModel):
    participant_id: UUID
    subject_id: str
    study_group: StudyGroup
    enrollment_date: date
    status: ParticipantStatus
    age: int
    gender: Gender

    model_config = ConfigDict(from_attributes=True)
