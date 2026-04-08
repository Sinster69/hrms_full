from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, date

from database.connection import get_db
from models.attendance import Attendance

router = APIRouter()


# 🔐 Mock user (replace later with real auth)
def get_current_user():
    return {"id": 1}


# 🧮 Helper: format hours into "Xh Ym"
def format_hours(hours: float):
    h = int(hours)
    m = int((hours - h) * 60)
    return f"{h}h {m}m"


# 🟢 Punch In
@router.post("/punch")
def punch_in(db: Session = Depends(get_db), user=Depends(get_current_user)):
    today = date.today()

    existing = (
        db.query(Attendance)
        .filter(Attendance.user_id == user["id"], Attendance.date == today)
        .first()
    )

    if existing:
        raise HTTPException(status_code=400, detail="Already punched in today")

    new_entry = Attendance(user_id=user["id"], check_in=datetime.now(), date=today)

    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)

    return {"message": "Punch in successful", "check_in": new_entry.check_in}


# 🔴 Punch Out
@router.post("/punch-out")
def punch_out(db: Session = Depends(get_db), user=Depends(get_current_user)):
    today = date.today()

    record = (
        db.query(Attendance)
        .filter(Attendance.user_id == user["id"], Attendance.date == today)
        .first()
    )

    if not record:
        raise HTTPException(status_code=400, detail="No punch-in found for today")

    if record.check_out:
        raise HTTPException(status_code=400, detail="Already punched out")

    record.check_out = datetime.now()

    # Calculate total hours
    duration = record.check_out - record.check_in
    record.total_hours = duration.total_seconds() / 3600

    db.commit()
    db.refresh(record)

    return {
        "message": "Punch out successful",
        "total_hours": round(record.total_hours, 2),
        "worked_hours": format_hours(record.total_hours),
    }


# 📊 Get Today's Attendance (Dashboard)
@router.get("/today")
def get_today_attendance(db: Session = Depends(get_db), user=Depends(get_current_user)):
    today = date.today()

    record = (
        db.query(Attendance)
        .filter(Attendance.user_id == user["id"], Attendance.date == today)
        .first()
    )

    if not record:
        return {
            "status": "Not started",
            "check_in": None,
            "check_out": None,
            "total_hours": 0,
            "worked_hours": "0h 0m",
        }

    # Determine status
    status = "Working"
    if record.check_out:
        status = "Completed"

    # Calculate live hours if still working
    if not record.check_out:
        duration = datetime.now() - record.check_in
        total_hours = duration.total_seconds() / 3600
    else:
        total_hours = record.total_hours

    return {
        "status": status,
        "check_in": record.check_in,
        "check_out": record.check_out,
        "total_hours": round(total_hours, 2),
        "worked_hours": format_hours(total_hours),
    }


@router.get("/logs")
def get_attendance_logs(db: Session = Depends(get_db), user=Depends(get_current_user)):
    records = (
        db.query(Attendance)
        .filter(Attendance.user_id == user["id"])
        .order_by(Attendance.date.desc())
        .limit(7)
        .all()
    )

    logs = []

    for r in records:
        logs.append(
            {
                "date": r.date,
                "check_in": r.check_in,
                "check_out": r.check_out,
                "total_hours": round(r.total_hours, 2) if r.total_hours else 0,
                "worked_hours": (
                    format_hours(r.total_hours) if r.total_hours else "0h 0m"
                ),
            }
        )

    return logs
