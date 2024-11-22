# ATS SCORE GENERATOR

## Backend Setup

### Step 1: Install Python Dependencies
First, ensure you have Python and pip installed on your system. Then install the required dependencies:

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment (recommended)
python -m venv venv
venv\Scripts\activate
```
```bash
# Install dependencies
pip install -r requirements.txt
```

### Step 2: Configure Environment Variables

Navigate to settings.py in backend in that replace with your api key:

```env
API_KEY=your_gemini_api_key_here
```

### MongoDB Atlas Setup

1. Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (or use existing)
3. Click "Connect" button
4. Choose "Connect your application"
5. Copy the connection string
6. Replace the following in your connection string:
   - `<username>`: Your MongoDB Atlas database user
   - `<password>`: Your database user password
   - `cluster0.xxxxx.mongodb.net`: Your actual cluster address
   - `<database_name>`: Your database name
### Step 3: Run Django Server
Navigate to the backend directory and start the Django development server:

```bash
# Create new migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate
```

```bash
# Start Django server
python manage.py runserver
```

The backend server will be available at `http://localhost:8000`

## Frontend Setup

### Step 1: Install Node Dependencies
Ensure you have Node.js and npm installed on your system. Then install the required dependencies:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

### Step 2: Start Frontend Development Server
In the frontend directory, start the development server:

```bash
# Start frontend development server
npm start
```

The frontend application will be available at `http://localhost:3000`

