import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
from sklearn.model_selection import train_test_split

# Model Building
img_width, img_height = 256, 256
batch_size = 32

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

# Dummy data for demonstration purposes
images = []  # This will be replaced with user uploaded image data
labels = []  # This will be replaced with user uploaded image labels

# Split data into training and testing sets (dummy data)
X_train, X_test, y_train, y_test = train_test_split(images, labels, test_size=0.2, random_state=42)

# Training (dummy data)
epochs = 10

# You can replace this function with how you will handle user uploaded images
def preprocess_image(image_data):
    img = image.array_to_img(image_data, data_format=None, scale=True, dtype=None)
    img = img.resize((img_width, img_height))
    img_array = image.img_to_array(img) / 255.0
    return img_array

# Dummy data for demonstration purposes
X_train = np.array([preprocess_image(image_data) for image_data in X_train])
X_test = np.array([preprocess_image(image_data) for image_data in X_test])
y_train = np.array(y_train)
y_test = np.array(y_test)

model.fit(X_train, y_train, epochs=epochs, validation_data=(X_test, y_test))

# Save the model
model.save('saved_model_capstone')

# Load the model
loaded_model = load_model('saved_model_capstone')

# Evaluation (dummy data)
accuracy = loaded_model.evaluate(X_test, y_test)[1]
print("Accuracy:", accuracy)

# Prediction function
def predict_image(image_data):
    img = preprocess_image(image_data)
    prediction = loaded_model.predict(np.expand_dims(img, axis=0))[0][0]
    if prediction > 0.5:
        return "Lumpy skin disease detected!"
    else:
        return "Normal skin!"