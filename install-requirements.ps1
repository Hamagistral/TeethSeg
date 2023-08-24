try {
    echo "Creating venv..."
    py -m venv venv
    echo "venv is created successfully."

    echo "Activating venv..."
    ./venv/Scripts/Activate
    echo "venv activated."

    echo "Installing requirements..."
    pip install --no-cache-dir -r requirements.txt
    pip install --no-cache-dir pygco
    echo "requirements installed successfully."

    echo "Your project is ready :)"
}
catch {
    Write-Host "An error occurred: $($_.Exception.Message)"
}

