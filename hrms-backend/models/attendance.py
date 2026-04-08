from sqlalchemy import Column, Integer, DateTime, Float, Date
from database.connection import Base


class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)

    check_in = Column(DateTime)
    check_out = Column(DateTime)

    total_hours = Column(Float, default=0)
    date = Column(Date)
