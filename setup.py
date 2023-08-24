import platform
import subprocess

os = platform.system()

if os == "Windows":
    subprocess.run(['powershell', '-ExecutionPolicy', 'Unrestricted', '-File', "install-requirements.ps1"])
elif os == "Linux" or os == "Darwin":
    import os.path
    if os.path.exists("install-requirements.sh"):
        os.chmod("install-requirements.sh", 0o755)  
        subprocess.run(['./install-requirements.sh'])
    else:
        print("Error: install-requirements.sh does not exist.")
        exit(1)