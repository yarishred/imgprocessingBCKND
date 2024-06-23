
# import cv2
# import os
# import uuid


# def open_image(image_path):
#     image = cv2.imread(image_path)
    
#     #Estructura condicional de la imagen
#     if image is None:
#         print("Error: el archivo no existe o tiene un formato invalido ")
#     else:
#       #Lectura la Imagen y almacenamiento
#        path = "uploads"
#        filename = str(uuid.uuid4())
#        save_image_path= os.path.join(path, filename + '.jpg')
       
#     cv2.imwrite(os.path.join(path , filename + '.jpg'), image)
#     return save_image_path