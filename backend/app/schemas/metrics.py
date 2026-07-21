from pydantic import BaseModel


class StudyGroupCounts(BaseModel):
    treatment: int
    control: int


class StatusCounts(BaseModel):
    active: int
    completed: int
    withdrawn: int


class GenderCounts(BaseModel):
    F: int
    M: int
    Other: int


class MetricsSummary(BaseModel):
    total_participants: int
    average_age: float
    by_study_group: StudyGroupCounts
    by_status: StatusCounts
    by_gender: GenderCounts
