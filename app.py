import sys
import json
import matplotlib.pyplot as plt
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
    buffer_grayscale = BytesIO()
    pil_image.save(buffer_grayscale,format="JPEG")
    img_str = base64.b64encode(buffer_grayscale.getvalue()).decode("utf-8")


    #Histograma
    hist = cv2.calcHist([adjusted_image], [0], None, [256], [0, 256])
    # Crear la figura del histograma
    plt.figure()
    plt.plot(hist)
    plt.title('Histograma')
    plt.xlabel('Intensidad de pixel')
    plt.ylabel('Número de pixeles')

    # Guardar la figura en un objeto BytesIO
    buffer_histogram = BytesIO()
    plt.savefig(buffer_histogram, format='jpg')
    plt.close()
    hist_image = base64.b64encode(buffer_histogram.getvalue()).decode("utf-8")

    imageResponse = {
        "grayscaleImage": img_str,
        "histogram": hist_image
    }
        
    return json.dumps(imageResponse)

result = main(image_options)
print(result)
sys.stdout.flush()