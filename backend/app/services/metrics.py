from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.enums import Gender, ParticipantStatus, StudyGroup
from app.models.participant import Participant
from app.schemas.metrics import GenderCounts, MetricsSummary, StatusCounts, StudyGroupCounts


def _count_by_enum(rows, enum_cls) -> dict[str, int]:
    counts = {member.value: 0 for member in enum_cls}
    for key, count in rows:
        value = key.value if hasattr(key, "value") else key
        counts[value] = count
    return counts


def get_metrics_summary(db: Session) -> MetricsSummary:
    total = db.scalar(select(func.count()).select_from(Participant)) or 0
    average_age = db.scalar(select(func.avg(Participant.age))) or 0.0

    group_rows = db.execute(
        select(Participant.study_group, func.count())
        .group_by(Participant.study_group)
    ).all()
    status_rows = db.execute(
        select(Participant.status, func.count())
        .group_by(Participant.status)
    ).all()
    gender_rows = db.execute(
        select(Participant.gender, func.count())
        .group_by(Participant.gender)
    ).all()

    by_study_group = _count_by_enum(group_rows, StudyGroup)
    by_status = _count_by_enum(status_rows, ParticipantStatus)
    by_gender = _count_by_enum(gender_rows, Gender)

    return MetricsSummary(
        total_participants=total,
        average_age=round(float(average_age), 1),
        by_study_group=StudyGroupCounts(**by_study_group),
        by_status=StatusCounts(**by_status),
        by_gender=GenderCounts(**by_gender),
    )
