from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime, date

from database.connection import get_db
from models.attendance import Attendance
from models.leave import Leave

router = APIRouter()


# Mock user (same as before)
def get_current_user():
    return {"id": 1, "name": "Pranav"}


def format_hours_ui(hours: float):
    h = int(hours)
    m = int((hours - h) * 60)
    return f"{h}:{str(m).zfill(2)}"


def format_time_ui(dt):
    if not dt:
        return "--"
    return dt.strftime("%I:%M %p").lstrip("0")


@router.get("/")
def get_dashboard(db: Session = Depends(get_db), user=Depends(get_current_user)):
    today = date.today()

    # -------------------------
    # Today's Attendance
    # -------------------------
    record = (
        db.query(Attendance)
        .filter(Attendance.user_id == user["id"], Attendance.date == today)
        .first()
    )

    if not record:
        attendance_data = {
            "hoursToday": "0:00",
            "avgStart": "--",
            "chartData": [],
            "recentLogs": [],
        }
    else:
        if not record.check_out:
            duration = datetime.now() - record.check_in
            total_hours = duration.total_seconds() / 3600
        else:
            total_hours = record.total_hours

        attendance_data = {
            "hoursToday": format_hours_ui(total_hours),
            "avgStart": format_time_ui(record.check_in),
            "chartData": [],
            "recentLogs": [],
        }

    # -------------------------
    # Recent Logs
    # -------------------------
    records = (
        db.query(Attendance)
        .filter(Attendance.user_id == user["id"])
        .order_by(Attendance.date.desc())
        .limit(5)
        .all()
    )

    logs = []
    for r in records:
        logs.append(
            {
                "date": r.date.strftime("%Y-%m-%d"),
                "time": f"{format_time_ui(r.check_in)} - {format_time_ui(r.check_out)}",
            }
        )

    attendance_data["recentLogs"] = logs

    # -------------------------
    # Leave Balance (REAL DATA)
    # -------------------------
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

    leave_data = [
        {
            "id": "paid",
            "label": "PAID LEAVE",
            "days": 20 - used_paid,
            "status": "Available",
            "statusColor": "text-green-600",
            "accentColor": "bg-green-50 text-green-600",
            "icon": "calendar",
        },
        {
            "id": "sick",
            "label": "SICK LEAVE",
            "days": 10 - used_sick,
            "status": "Healthy & stable",
            "statusColor": "text-orange-600",
            "accentColor": "bg-orange-50 text-orange-600",
            "icon": "plus",
        },
        {
            "id": "casual",
            "label": "CASUAL LEAVE",
            "days": 7 - used_casual,
            "status": "Expires soon",
            "statusColor": "text-red-600",
            "accentColor": "bg-red-50 text-red-600",
            "icon": "calendar",
        },
    ]

    # -------------------------
    # Final Response (UI READY)
    # -------------------------
    return {
        "attendance": attendance_data,
        "leave": leave_data,
        "tasks": [],
        "events": [],
        "announcements": [],
    }
