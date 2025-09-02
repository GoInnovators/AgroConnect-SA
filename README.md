# AgroConnect-SA
AgroConnect SA is an AI-powered agricultural marketplace designed specifically for South African farmers and buyers.

Weekly goal:

Week 1

backend/
├── src/                          # MAIN SOURCE CODE DIRECTORY

│   ├── main.py                   # 🚀 APPLICATION ENTRY POINT
│   │                             # - Starts FastAPI server
│   │                             # - Configures CORS for frontend
│   │                             # - Includes all API routes
│   │                             # - Creates database tables
│   │                             # - Serves static files (images)
│   │
│   ├── config/                   # ⚙️ CONFIGURATION & SETUP

│   │   ├── __init__.py           # - Makes it a Python package

│   │   ├── database.py           # 🗄️ DATABASE CONNECTION MANAGER
│   │   │                         # - Creates SQLAlchemy engine
│   │   │                         # - Manages database sessions
│   │   │                         # - Provides database dependency for routes

│   │   ├── settings.py           # 🔧 ENVIRONMENT CONFIGURATION
│   │   │                         # - Loads .env variables
│   │   │                         # - Database URL, JWT secrets
│   │   │                         # - File upload limits, API settings

│   │   └── ai_config.py          # 🤖 AI MODEL CONFIGURATIONS
│   │                             # - ML model paths and parameters
│   │                             # - AI service settings
│   │
│   ├── models/                   # 📊 DATABASE TABLE DEFINITIONS

│   │   ├── __init__.py           # - Package marker

│   │   ├── crop.py               # 🌾 CROP LISTINGS TABLE
│   │   │                         # - Product details (name, price, quantity)
│   │   │                         # - Quality grades, images, location
│   │   │                         # - AI pricing fields, status tracking

│   │   ├── farmer.py             # 👨‍🌾 FARMER PROFILES TABLE
│   │   │                         # - Personal & farm information
│   │   │                         # - Business details, ratings, experience
│   │   │                         # - Relationship to crops

│   │   ├── user.py               # 👤 USER AUTHENTICATION TABLE
│   │   │                         # - Login credentials, roles
│   │   │                         # - Links to farmer/buyer profiles

│   │   └── market_data.py        # 📈 HISTORICAL MARKET DATA
│   │                             # - Price history, demand patterns
│   │                             # - Used for AI training
│   │
│   ├── routes/                   # 🛣️ API ENDPOINTS (HTTP ROUTES)

│   │   ├── __init__.py           # - Package marker

│   │   ├── auth.py               # 🔐 AUTHENTICATION ENDPOINTS
│   │   │                         # - /api/auth/login, /api/auth/register
│   │   │                         # - JWT token creation, user verification

│   │   ├── crops.py              # 🌱 CROP MANAGEMENT ENDPOINTS
│   │   │                         # - GET /api/crops/ (browse marketplace)
│   │   │                         # - POST /api/crops/ (create listing)
│   │   │                         # - PUT/DELETE crop operations
│   │   │                         # - Image upload endpoints

│   │   ├── farmers.py            # 🚜 FARMER PROFILE ENDPOINTS
│   │   │                         # - GET farmer profiles
│   │   │                         # - Update farmer information

│   │   └── ai.py                 # 🔮 AI SERVICE ENDPOINTS
│   │                             # - /api/ai/price-suggestion
│   │                             # - /api/ai/grade-image
│   │                             # - /api/ai/demand-forecast





backend/                          # REQUIRES: Python 3.8+, PostgreSQL 12+
├── src/
│   ├── main.py                   # REQUIRES: FastAPI, uvicorn
│   ├── config/
│   │   ├── __init__.py
│   │   ├── database.py           # REQUIRES: SQLAlchemy, psycopg2-binary, PostgreSQL
│   │   ├── settings.py           # REQUIRES: pydantic-settings, python-dotenv
│   │   └── ai_config.py          # REQUIRES: pydantic, python-dotenv
│   ├── models/
│   │   ├── __init__.py
│   │   ├── crop.py               # REQUIRES: SQLAlchemy, PostgreSQL
│   │   ├── farmer.py             # REQUIRES: SQLAlchemy, PostgreSQL
│   │   ├── user.py               # REQUIRES: SQLAlchemy, PostgreSQL
│   │   └── market_data.py        # REQUIRES: SQLAlchemy, pandas
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── auth.py               # REQUIRES: python-jose[cryptography], passlib[bcrypt]
│   │   ├── crops.py              # REQUIRES: FastAPI, pydantic
│   │   ├── farmers.py            # REQUIRES: FastAPI, pydantic
│   │   └── ai.py                 # REQUIRES: FastAPI, scikit-learn, 
