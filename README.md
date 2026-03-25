# HealthAI Backend — Express + MongoDB

## Setup

```bash
cd backend
npm install
```

## Configure

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

- `MONGODB_URI` — Your MongoDB connection string (local or Atlas)
- `JWT_SECRET` — A strong secret key for JWT tokens
- `PORT` — Server port (default: 5000)

## Seed Database

```bash
node seed.js
```

This populates the doctors collection with Indian doctors.

## Run

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

## API Endpoints

### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register (email, password, full_name) |
| POST | `/api/auth/login` | No | Login (email, password) → returns JWT |
| GET | `/api/auth/me` | Yes | Get current user |

### Doctors
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/doctors` | No | List all doctors (?search, ?specialization, ?location) |
| GET | `/api/doctors/:id` | No | Get single doctor |
| POST | `/api/doctors` | Yes | Add doctor |
| PUT | `/api/doctors/:id` | Yes | Update doctor |
| DELETE | `/api/doctors/:id` | Yes | Delete doctor |

### Profiles
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/profiles/me` | Yes | Get my profile |
| PUT | `/api/profiles/me` | Yes | Update my profile |

### Symptom Checks
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/symptom-checks` | Yes | List my checks |
| GET | `/api/symptom-checks/recent` | Yes | Last 5 checks |
| POST | `/api/symptom-checks` | Yes | Create check |
| DELETE | `/api/symptom-checks/:id` | Yes | Delete check |

### Auth Header
```
Authorization: Bearer <your_jwt_token>
```
