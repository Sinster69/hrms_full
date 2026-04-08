from sqlalchemy import Column, Integer, String, Date
from database.connection import Base


class Leave(Base):
    __tablename__ = "leaves"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)

    leave_type = Column(String)  # paid, sick, casual
    start_date = Column(Date)
    end_date = Column(Date)

    status = Column(String, default="pending")  # pending, approved, rejected
