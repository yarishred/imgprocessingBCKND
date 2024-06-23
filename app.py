import sys
import json

import cv2
import base64
from io import BytesIO
from PIL import Image 
# from pythonscripts.imgprocessing import open_image



# # Obtener el dato enviado desde Node.js
options_json = sys.argv[1]
image_options = json.loads(options_json)

def main (options):
    
    image_path = options.get("imagePath")
    img = cv2.imread(image_path)

    alpha_option = options.get("alpha")
    beta_option = options.get("beta")


    alpha = float(alpha_option)
    beta = int(beta_option)

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    adjusted_image = cv2.convertScaleAbs(gray, alpha=alpha, beta=beta)


    pil_image = Image.fromarray(adjusted_image)
    buffer = BytesIO()
    pil_image.save(buffer,format="JPEG")

    img_str = base64.b64encode(buffer.getvalue()).decode("utf-8")
        
    return img_str

result = main(image_options)
print(result)
sys.stdout.flush()