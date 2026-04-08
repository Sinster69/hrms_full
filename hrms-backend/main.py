from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from database.connection import engine, Base
from models import attendance, leave
from routes import attendance, dashboard, leave

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(attendance.router, prefix="/attendance", tags=["Attendance"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])
app.include_router(leave.router, prefix="/leave", tags=["Leave"])

# Create tables
Base.metadata.create_all(bind=engine)


def get_current_user():
    return {"id": 1, "name": "Pranav"}


@app.get("/")
def root():
    return {"message": "HRMS Backend Running 🚀"}


@app.get("/test-user")
def test_user(user=Depends(get_current_user)):
    return {"message": "User fetched successfully", "user": user}
