import os
import sys
from PIL import Image

def compress_images_in_dir(directory, max_bytes=2*1024*1024):
    if not os.path.exists(directory):
        print(f"Directory {directory} does not exist.")
        return

    count = 0
    for filename in os.listdir(directory):
        if not filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            continue

        filepath = os.path.join(directory, filename)
        size_bytes = os.path.getsize(filepath)

        if size_bytes > max_bytes:
            print(f"Compressing {filename} (Current size: {size_bytes / 1024 / 1024:.2f} MB)")
            
            temp_filepath = filepath + ".tmp"
            try:
                with Image.open(filepath) as img:
                    width, height = img.size
                    max_dimension = 1500  # shrink to max 1500px to ensure size reduction
                    
                    if img.mode in ("RGBA", "P", "LA"):
                        if filepath.lower().endswith(('.jpg', '.jpeg')):
                            img = img.convert("RGB")
                    
                    if width > max_dimension or height > max_dimension:
                        if width > height:
                            new_width = max_dimension
                            new_height = int(height * (max_dimension / width))
                        else:
                            new_height = max_dimension
                            new_width = int(width * (max_dimension / height))
                        
                        img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                    
                    if filepath.lower().endswith(('.jpg', '.jpeg')):
                        img.save(temp_filepath, format="JPEG", quality=75, optimize=True)
                    else:
                        img.save(temp_filepath, format="PNG", optimize=True)
                
                new_size = os.path.getsize(temp_filepath)
                # Keep replacing if we managed to shrink it and it's under 2.5MB or original
                if new_size < size_bytes:
                    os.replace(temp_filepath, filepath)
                    print(f" -> Compressed to {new_size / 1024 / 1024:.2f} MB")
                    count += 1
                else:
                    os.remove(temp_filepath)
                    print(f" -> Could not compress {filename} effectively.")
            except Exception as e:
                print(f"Error compressing {filename}: {e}")
                if os.path.exists(temp_filepath):
                    os.remove(temp_filepath)

    print(f"\nDone! Successfully compressed {count} images.")

if __name__ == "__main__":
    # Point to the public/images/doctors folder
    target_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "public", "images", "doctors"))
    compress_images_in_dir(target_dir)
