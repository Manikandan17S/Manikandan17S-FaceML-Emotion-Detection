#!/usr/bin/env python3
"""
Simple script to run the Flask backend server
"""

import os
import sys
import subprocess

def main():
    print("🚀 Starting FaceML Backend Server...")
    print("=" * 50)
    
    # Check if we're in the backend directory
    if not os.path.exists('app.py'):
        print("❌ Error: app.py not found!")
        print("Please run this script from the backend directory:")
        print("cd backend && python run.py")
        sys.exit(1)
    
    # Check if virtual environment exists
    venv_path = 'venv'
    if os.path.exists(venv_path):
        print("✅ Virtual environment found")
        if sys.platform.startswith('win'):
            python_path = os.path.join(venv_path, 'Scripts', 'python.exe')
        else:
            python_path = os.path.join(venv_path, 'bin', 'python')
    else:
        print("⚠️  No virtual environment found, using system Python")
        python_path = sys.executable
    
    print(f"🐍 Using Python: {python_path}")
    print("🌐 Backend will run at: http://localhost:5000")
    print("🎥 Frontend should run at: http://localhost:5173")
    print("=" * 50)
    
    try:
        # Run the Flask app
        subprocess.run([python_path, 'app.py'], check=True)
    except KeyboardInterrupt:
        print("\n👋 Backend server stopped")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error running backend: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()