from enum import Enum


class StudyGroup(str, Enum):
    treatment = "treatment"
    control = "control"


class ParticipantStatus(str, Enum):
    active = "active"
    completed = "completed"
    withdrawn = "withdrawn"


class Gender(str, Enum):
    F = "F"
    M = "M"
    Other = "Other"
