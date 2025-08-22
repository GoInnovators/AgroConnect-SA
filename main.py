from fastapi import FastAPI, HTTPException, Depends, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from typing import List, Optional
import uvicorn
import os
from datetime import datetime, timedelta
import jwt
from passlib.context import CryptContext
import shutil
import uuid

# Import our modules (we'll create these)
from config.database import get_db, engine
from config.settings import settings
from models import farmer, crop, user
from services.crop_service import CropService
from services.image_service import ImageService
from routes import crops, farmers, auth

# Create database tables
farmer.Base.metadata.create_all(bind=engine)
crop.Base.metadata.create_all(bind=engine)
user.Base.metadata.create_all(bind=engine)

# Initialize FastAPI
app = FastAPI(
    title="AgroConnect SA API",
    description="AI-powered marketplace for South African smallholder farmers",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://goinnovators.github.io/AgroConnect-SA/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static files (for uploaded images)
if not os.path.exists("static"):
    os.makedirs("static")
app.mount("/static", StaticFiles(directory="static"), name="static")

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(crops.router, prefix="/api/crops", tags=["Crops"])
app.include_router(farmers.router, prefix="/api/farmers", tags=["Farmers"])

# Health check endpoint
@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0"
    }

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "AgroConnect SA API",
        "docs": "/api/docs",
        "health": "/api/health"
    }

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
