import uuid
from datetime import date

from sqlalchemy import Date, Enum, Integer, String, Uuid
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base
from app.enums import Gender, ParticipantStatus, StudyGroup


class Participant(Base):
    __tablename__ = "participants"

    participant_id: Mapped[uuid.UUID] = mapped_column(
        Uuid,
        primary_key=True,
        default=uuid.uuid4,
    )
    subject_id: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    study_group: Mapped[StudyGroup] = mapped_column(
        Enum(StudyGroup, name="study_group"),
        nullable=False,
    )
    enrollment_date: Mapped[date] = mapped_column(Date, nullable=False)
    status: Mapped[ParticipantStatus] = mapped_column(
        Enum(ParticipantStatus, name="participant_status"),
        nullable=False,
    )
    age: Mapped[int] = mapped_column(Integer, nullable=False)
    gender: Mapped[Gender] = mapped_column(
        Enum(Gender, name="gender"),
        nullable=False,
    )
