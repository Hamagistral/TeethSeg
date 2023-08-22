import os

def delete_temp_file(folder_path, filename):
    file_path = os.path.join(folder_path, filename + ".vtp")
    try:
        os.remove(file_path)
    except Exception as e:
        print(f"Error deleting file {file_path}: {e}")


def delete_temp_files(OUTPUT_FOLDER):
    # Delete all files in the output folder
    for filename in os.listdir(OUTPUT_FOLDER):
        file_path = os.path.join(OUTPUT_FOLDER, filename)
        try:
            os.remove(file_path)
        except Exception as e:
            print(f"Error deleting file {file_path}: {e}")
            

def create_temp_file(folder_path, filename, binary_data):
    temp_filepath = os.path.join(folder_path, filename)
    with open(temp_filepath, "wb") as temp_file:
        temp_file.write(binary_data)
    return temp_filepath