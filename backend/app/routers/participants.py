from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.dependencies.auth import get_current_user
from app.models.participant import Participant
from app.schemas.participant import ParticipantCreate, ParticipantRead, ParticipantUpdate

router = APIRouter(
    prefix="/participants",
    tags=["participants"],
    dependencies=[Depends(get_current_user)],
)


@router.post("", response_model=ParticipantRead, status_code=status.HTTP_201_CREATED)
def create_participant(payload: ParticipantCreate, db: Session = Depends(get_db)):
    participant = Participant(**payload.model_dump())
    db.add(participant)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=409, detail="Subject ID already exists")
    db.refresh(participant)
    return participant


@router.get("", response_model=list[ParticipantRead])
def list_participants(db: Session = Depends(get_db)):
    stmt = select(Participant).order_by(Participant.enrollment_date.desc())
    return db.scalars(stmt).all()


@router.get("/{participant_id}", response_model=ParticipantRead)
def get_participant(participant_id: UUID, db: Session = Depends(get_db)):
    participant = db.get(Participant, participant_id)
    if participant is None:
        raise HTTPException(status_code=404, detail="Participant not found")
    return participant


@router.patch("/{participant_id}", response_model=ParticipantRead)
def update_participant(
    participant_id: UUID,
    payload: ParticipantUpdate,
    db: Session = Depends(get_db),
):
    participant = db.get(Participant, participant_id)
    if participant is None:
        raise HTTPException(status_code=404, detail="Participant not found")

    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(participant, field, value)

    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=409, detail="Subject ID already exists")
    db.refresh(participant)
    return participant


@router.delete("/{participant_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_participant(participant_id: UUID, db: Session = Depends(get_db)):
    participant = db.get(Participant, participant_id)
    if participant is None:
        raise HTTPException(status_code=404, detail="Participant not found")
    db.delete(participant)
    db.commit()
