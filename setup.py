#!/usr/bin/env python3
"""
Setup script for FaceML Emotion Detection Project
"""

import os
import sys
import subprocess
import platform

def run_command(command, description):
    """Run a command and handle errors"""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed:")
        print(f"Error: {e.stderr}")
        return False

def main():
    print("🚀 FaceML Emotion Detection Setup")
    print("=" * 50)
    
    # Check Python version
    python_version = sys.version_info
    if python_version.major < 3 or (python_version.major == 3 and python_version.minor < 8):
        print("❌ Python 3.8+ is required")
        sys.exit(1)
    
    print(f"✅ Python {python_version.major}.{python_version.minor}.{python_version.micro} detected")
    
    # Setup backend
    print("\n📦 Setting up Backend...")
    
    # Create backend directory if it doesn't exist
    if not os.path.exists('backend'):
        os.makedirs('backend')
    
    os.chdir('backend')
    
    # Create virtual environment
    if not os.path.exists('venv'):
        if not run_command(f"{sys.executable} -m venv venv", "Creating virtual environment"):
            sys.exit(1)
    else:
        print("✅ Virtual environment already exists")
    
    # Determine pip path
    if platform.system() == "Windows":
        pip_path = os.path.join('venv', 'Scripts', 'pip.exe')
        python_path = os.path.join('venv', 'Scripts', 'python.exe')
    else:
        pip_path = os.path.join('venv', 'bin', 'pip')
        python_path = os.path.join('venv', 'bin', 'python')
    
    # Upgrade pip
    run_command(f"{pip_path} install --upgrade pip", "Upgrading pip")
    
    # Install backend dependencies
    if not run_command(f"{pip_path} install -r requirements.txt", "Installing backend dependencies"):
        print("⚠️  Some dependencies might have failed to install")
        print("You can try installing them manually later")
    
    os.chdir('..')
    
    # Setup frontend
    print("\n🌐 Setting up Frontend...")
    
    # Check if Node.js is installed
    try:
        subprocess.run(['node', '--version'], check=True, capture_output=True)
        print("✅ Node.js detected")
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("❌ Node.js not found. Please install Node.js 16+ from https://nodejs.org/")
        sys.exit(1)
    
    # Install frontend dependencies
    if not run_command("npm install", "Installing frontend dependencies"):
        sys.exit(1)
    
    print("\n🎉 Setup completed successfully!")
    print("=" * 50)
    print("📋 Next steps:")
    print("1. Start the backend server:")
    print("   cd backend")
    print("   python app.py")
    print("")
    print("2. In a new terminal, start the frontend:")
    print("   npm run dev")
    print("")
    print("3. Open your browser and go to: http://localhost:5173")
    print("=" * 50)

if __name__ == '__main__':
    main()