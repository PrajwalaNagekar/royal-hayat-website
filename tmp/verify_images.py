import os
from PIL import Image

def verify():
    dir_path = 'public/images/doctors'
    files = [f for f in os.listdir(dir_path) if f.lower().endswith('.png')]
    
    ref_path = os.path.join(dir_path, 'mohamed-alkandari.png')
    with Image.open(ref_path) as ref_img:
        target_ar = round(ref_img.size[0] / ref_img.size[1], 4)
    
    print(f"Total PNG files: {len(files)}")
    print(f"Target AR: {target_ar}")
    print("-" * 30)
    
    check_list = [
        'ahmed-al-qalaf.png', 'dherar-alroudhan.png', 'dr-alaa.png', 
        'farah-hashem.png', 'gie.png', 'hanafi.png', 'hussein-faour.png', 
        'mazen-alessa.png', 'mohamad-alturki.png', 'mohamad-razzak.png', 
        'mohamad-jaragh.png', 'prof-omar-alkhateeb.png', 'salah-al-wuhaib.png', 
        'rajesh.png', 'sulaiman-almazeedi.png', 'suraj.png', 'yasmin-othman.png'
    ]
    
    for f in check_list:
        path = os.path.join(dir_path, f)
        if not os.path.exists(path):
            print(f"{f}: MISSING")
            continue
        try:
            with Image.open(path) as img:
                ar = round(img.size[0] / img.size[1], 4)
                status = "OK" if abs(ar - target_ar) < 0.001 else f"MISMATCH ({ar})"
                print(f"{f:<25} | {str(img.size):<12} | AR: {ar:<7} | {status}")
        except Exception as e:
            print(f"{f}: ERROR ({e})")

if __name__ == "__main__":
    verify()
