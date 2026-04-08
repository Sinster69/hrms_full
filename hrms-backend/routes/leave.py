from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date

from database.connection import get_db
from models.leave import Leave

router = APIRouter()


# Mock user
def get_current_user():
    return {"id": 1}


# 🟢 Get Leave Balance
@router.get("/balance")
def get_leave_balance(db: Session = Depends(get_db), user=Depends(get_current_user)):
    leaves = (
        db.query(Leave)
        .filter(Leave.user_id == user["id"], Leave.status == "approved")
        .all()
    )

    used_paid = 0
    used_sick = 0
    used_casual = 0

    for l in leaves:
        days = (l.end_date - l.start_date).days + 1

        if l.leave_type == "paid":
            used_paid += days
        elif l.leave_type == "sick":
            used_sick += days
        elif l.leave_type == "casual":
            used_casual += days

    return {"paid": 20 - used_paid, "sick": 10 - used_sick, "casual": 7 - used_casual}


# 🔵 Request Leave
@router.post("/request")
def request_leave(
    leave_type: str,
    start_date: date,
    end_date: date,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    if start_date > end_date:
        raise HTTPException(status_code=400, detail="Invalid date range")

    new_leave = Leave(
        user_id=user["id"],
        leave_type=leave_type,
        start_date=start_date,
        end_date=end_date,
        status="pending",
    )

    db.add(new_leave)
    db.commit()
    db.refresh(new_leave)

    return {"message": "Leave request submitted", "leave_id": new_leave.id}
