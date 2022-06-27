## Steps to install packages

1. ```npm install```
2. ```cd ios && pod install```

## Steps to run (debug mode)

1. For Android ```react-native run-android```
2. For iOS ```react-native run-ios```

### Troubleshooting

The API requests will fail without proper authentication. Add the correct credentials on lines 25 & 26 inside ```src/components/SafecamWrapper.js```