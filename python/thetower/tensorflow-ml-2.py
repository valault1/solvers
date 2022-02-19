import pandas as pd
import numpy as np

import tensorflow as tf
from tensorflow.keras import layers

# Make numpy values easier to read.
np.set_printoptions(precision=3, suppress=True)
##############################################################################
#Tutorial
abalone_train = pd.read_csv(
    "https://storage.googleapis.com/download.tensorflow.org/data/abalone_train.csv",
    names=["Length", "Diameter", "Height", "Whole weight", "Shucked weight",
           "Viscera weight", "Shell weight", "Age"])

print(abalone_train.head())

abalone_features = abalone_train.copy()
abalone_labels = abalone_features.pop('Age')

abalone_features = np.array(abalone_features)
abalone_features


abalone_model = tf.keras.Sequential([
  layers.Dense(64),
  layers.Dense(1)
])

abalone_model.compile(loss = tf.losses.MeanSquaredError(),
                      optimizer = tf.optimizers.Adam())

#abalone_model.fit(abalone_features, abalone_labels, epochs=10)




print("done with tutorial")
##############################################################################





train = pd.read_csv('wavedata.csv')

features = train.copy()
labels = features.pop('Attack')

features = np.array(features)
print(features)



model = tf.keras.Sequential([
  layers.Dense(64),
  layers.Dense(1)
])

model.compile(loss = tf.losses.MeanSquaredError(),
                      optimizer = tf.optimizers.Adam())

model.fit(features, labels, epochs=10)

use_samples = [5, 38, 3939, 27389]
samples_to_predict = []

# Convert into Numpy array
samples_to_predict = np.array(samples_to_predict)

# Generate predictions for samples
predictions = model.predict()
print(predictions)

print(model)


