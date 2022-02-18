import tensorflow as tf
print("TensorFlow version:", tf.__version__)

import pyforest
import warnings
warnings.filterwarnings("ignore")
from sklearn import metrics
from sklearn.metrics import accuracy_score

# importing .csv files using Pandas
train = pd.read_csv('wavedata.csv')
test = pd.read_csv('testdata.csv')

import lazypredict
from lazypredict.Supervised import LazyClassifier

clf = LazyClassifier(verbose=0,ignore_warnings=True)
models, predictions = clf.fit(X_train, X_test, y_train, y_test)
models

print("Done!")