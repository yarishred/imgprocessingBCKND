import sys

from pythonscripts.imgprocessing import open_image

# # Obtener el dato enviado desde Node.js
image_path = sys.argv[1]

# Función que procesa el dato
def main(image_path):
    
    new_path = open_image(image_path)
    return new_path

# # Llamar a la función y obtener la salida de la ruta
new_path = main(image_path)
sys.stdout.write(new_path)