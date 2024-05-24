
import cv2
import os
import uuid
from matplotlib import pyplot as plt


def open_image(image_path):
    image = cv2.imread(image_path)
    
    #Estructura condicional de la imagen
    if image is None:
        print("Error: el archivo no existe o tiene un formato invalido ")
    else:
       #Convertir color BGR a RGB
       rgb_img= cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
       
       path = "uploads"
       filename = str(uuid.uuid4())
       save_image_path= os.path.join(path, filename + '.jpg')

       
    cv2.imwrite(os.path.join(path , filename + '.jpg'), rgb_img)
    return save_image_path