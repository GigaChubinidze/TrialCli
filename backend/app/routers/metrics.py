from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.dependencies.auth import get_current_user
from app.schemas.metrics import MetricsSummary
from app.services.metrics import get_metrics_summary

router = APIRouter(
    prefix="/metrics",
    tags=["metrics"],
    dependencies=[Depends(get_current_user)],
)


@router.get("/summary", response_model=MetricsSummary)
def metrics_summary(db: Session = Depends(get_db)):
    return get_metrics_summary(db)
