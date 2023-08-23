import platform
import subprocess

os = platform.system()


if(os == "Windows"):
    subprocess.run(['powershell', '-ExecutionPolicy', 'Unrestricted', '-File', "install-requirements.ps1"])

elif(os == "Linux" or os == "Darwin"):
    subprocess.run(['sh', "install-requirements.sh"])
