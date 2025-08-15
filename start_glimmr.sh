#!/bin/bash

echo "🚀 Starting GLIMMR Website..."

# Check if .env files exist
if [ ! -f "backend/.env" ]; then
    echo "❌ Backend .env file not found!"
    echo "Please create backend/.env file with your configuration"
    exit 1
fi

if [ ! -f "frontend/.env" ]; then
    echo "❌ Frontend .env file not found!"
    echo "Please create frontend/.env file with your configuration"
    exit 1
fi

# Check if MongoDB is running
echo "🔍 Checking MongoDB connection..."
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first:"
    echo "   sudo systemctl start mongod"
    echo "   or"
    echo "   mongod --dbpath /path/to/your/data/directory"
    echo ""
    read -p "Continue anyway? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Install dependencies if node_modules doesn't exist
echo "📦 Installing backend dependencies..."
cd backend
if [ ! -d "node_modules" ]; then
    npm install
fi

echo "📦 Installing frontend dependencies..."
cd ../frontend
if [ ! -d "node_modules" ]; then
    npm install
fi

# Start backend server
echo "🔧 Starting backend server..."
cd ../backend
gnome-terminal --title="GLIMMR Backend" -- npm run dev &

# Wait a moment for backend to start
sleep 3

# Start frontend server
echo "🎨 Starting frontend server..."
cd ../frontend
gnome-terminal --title="GLIMMR Frontend" -- npm start &

echo ""
echo "✅ GLIMMR is starting up!"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:5000"
echo ""
echo "📱 Check the new terminal windows for server logs"
echo "🔄 To stop servers, close the terminal windows or press Ctrl+C"
echo ""
echo "🎉 Happy shopping with GLIMMR! ✨"