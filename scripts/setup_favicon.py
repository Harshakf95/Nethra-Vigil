import os
import sys
import subprocess

def install_packages():
    print("Installing required packages...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "cairosvg", "Pillow"])
        print("Successfully installed required packages!")
        return True
    except subprocess.CalledProcessError:
        print("Failed to install required packages. Please install them manually:")
        print("pip install cairosvg Pillow")
        print("Also, make sure you have ImageMagick installed on your system.")
        return False

if __name__ == "__main__":
    if install_packages():
        print("\nRun the following command to generate the favicon:")
        print("python scripts/generate_favicon.py")
    else:
        sys.exit(1)
