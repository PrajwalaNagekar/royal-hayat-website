import os
from PIL import Image

def compress_to_target(directory, target_kb=500):
    if not os.path.exists(directory):
        print(f"Directory {directory} does not exist.")
        return

    target_bytes = target_kb * 1024
    count = 0
    total_reduction = 0

    print(f"Starting compression in: {directory}")
    print(f"Target size: < {target_kb} KB\n")

    for filename in os.listdir(directory):
        if not filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            continue

        filepath = os.path.join(directory, filename)
        original_size = os.path.getsize(filepath)

        if original_size <= target_bytes:
            continue

        print(f"Compressing {filename} ({original_size / 1024:.1f} KB)...")
        
        try:
            with Image.open(filepath) as img:
                # Convert RGBA to RGB if needed
                if img.mode in ("RGBA", "P", "LA"):
                    background = Image.new("RGB", img.size, (255, 255, 255))
                    background.paste(img, mask=img.split()[3] if img.mode == "RGBA" else None)
                    img = background

                # Resize strategy: max 1200px
                width, height = img.size
                max_dim = 1200
                if width > max_dim or height > max_dim:
                    if width > height:
                        w, h = max_dim, int(height * (max_dim / width))
                    else:
                        w, h = int(width * (max_dim / height)), max_dim
                    img = img.resize((w, h), Image.Resampling.LANCZOS)

                # Iterative quality reduction
                quality = 85
                step = 5
                min_quality = 40
                
                temp_path = filepath + ".tmp.jpg"
                while quality >= min_quality:
                    img.save(temp_path, format="JPEG", quality=quality, optimize=True)
                    if os.path.getsize(temp_path) <= target_bytes:
                        break
                    quality -= step

                new_size = os.path.getsize(temp_path)
                
                # If we still can't hit 500kb, try one more resizing pass to 1000px
                if new_size > target_bytes:
                    img = img.resize((int(img.width * 0.8), int(img.height * 0.8)), Image.Resampling.LANCZOS)
                    img.save(temp_path, format="JPEG", quality=50, optimize=True)
                    new_size = os.path.getsize(temp_path)

                # Final move: replace original but keep original name/extension
                if new_size < original_size:
                    # Note: We keep original extension even if internal format is now highly optimized JPEG
                    os.replace(temp_path, filepath)
                    total_reduction += (original_size - new_size)
                    print(f" -> Final size: {new_size / 1024:.1f} KB (Quality: {quality})")
                    count += 1
                else:
                    os.remove(temp_path)
                    print(f" -> No significant reduction possible.")

        except Exception as e:
            print(f"Error processing {filename}: {e}")

    print(f"\nDone! Compressed {count} images.")
    print(f"Total space saved: {total_reduction / 1024 / 1024:.2f} MB")

if __name__ == "__main__":
    target_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "public", "images", "doctors"))
    compress_to_target(target_dir)
