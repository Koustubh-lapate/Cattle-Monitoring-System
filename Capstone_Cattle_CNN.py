# -*- coding: utf-8 -*-
"""
Created on Tue Feb  6 18:49:49 2024

@author: Lokeswar K
"""

import os
import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
from sklearn.model_selection import train_test_split
from tensorflow.keras.models import load_model
#%%
# Data Preparation
data_dir = 'D:/Capstone_Cattle/Datset/Lumpy Skin Images Dataset'
classes = ['LUMPY SKIN', 'NORMAL SKIN']

images = []
labels = []

for class_name in classes:
    class_dir = os.path.join(data_dir, class_name)
    for file in os.listdir(class_dir):
        if file.endswith('.png'):
            images.append(os.path.join(class_dir, file))
            labels.append(class_name)
#%%
# Model Building
img_width, img_height = 256, 256
batch_size = 32
#%%
model = Sequential()
model.add(Conv2D(32, (3, 3), activation='relu', input_shape=(img_width, img_height, 3)))
model.add(MaxPooling2D((2, 2)))
model.add(Conv2D(64, (3, 3), activation='relu'))
model.add(MaxPooling2D((2, 2)))
model.add(Conv2D(128, (3, 3), activation='relu'))
model.add(MaxPooling2D((2, 2)))
model.add(Flatten())
model.add(Dense(128, activation='relu'))
model.add(Dense(1, activation='sigmoid'))

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
#%%
# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(images, labels, test_size=0.2, random_state=42)

# Training
epochs = 10
#%%
def preprocess_image(image_path):
    img = image.load_img(image_path, target_size=(img_width, img_height))
    img_array = image.img_to_array(img) / 255.0
    return img_array
#%%
X_train = np.array([preprocess_image(img) for img in X_train])
X_test = np.array([preprocess_image(img) for img in X_test])
y_train = np.array([1 if label == 'LUMPY SKIN' else 0 for label in y_train])
y_test = np.array([1 if label == 'LUMPY SKIN' else 0 for label in y_test])
#%%
model.fit(X_train, y_train, epochs=epochs, validation_data=(X_test, y_test))
#%%
# Save the model
model.save('D:/Capstone_Cattle/saved_model_capstone')
#%%
# Load the model
loaded_model = load_model('D:/Capstone_Cattle/saved_model_capstone')

#%%
# Evaluation
accuracy = loaded_model.evaluate(X_test, y_test)[1]
print("Accuracy:", accuracy)
#%%
# Prediction
def predict_image(image_path):
    img = preprocess_image(image_path)
    prediction = loaded_model.predict(np.expand_dims(img, axis=0))[0][0]
    if prediction > 0.5:
        return "Lumpy skin disease detected!"
    else:
        return "Normal skin!"

#%%   
# Example Usage
predict_image("C:/Users/Lokeswar K/Desktop/Normal_Skin_6.png")
#%%
predict_image("C:/Users/Lokeswar K/Desktop/Lumpy_Skin_19.png")
#%%
predict_image("C:/Users/Lokeswar K/Desktop/Lumpy_Skin_35.png")
#%%
predict_image("C:/Users/Lokeswar K/Desktop/Cow_female_black_white.jpg")

#%%
predict_image("C:/Users/Lokeswar K/Desktop/Lumpy3.jpg")

#%%
# Data Preparation
# data_dir = 'D:/Capstone_Cattle/Datset/Lumpy Skin Images Dataset/Normal Skin'

# # Get all image paths in the 'LUMPY SKIN' folder
# lumpy_skin_images = [os.path.join(data_dir, filename) for filename in os.listdir(data_dir) if filename.endswith('.png')]
# lumpy_count=0
# normal_count=0
# # Prediction for each image
# for image_path in lumpy_skin_images:
#     if (predict_image(image_path)=="Lumpy skin disease detected!"):
#         lumpy_count+=1
#     else:
#         normal_count+=1
#%%

    