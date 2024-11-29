import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, PermissionsAndroid, Platform } from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';

const BLEScanner = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const manager = new BleManager();

  useEffect(() => {
    return () => {
      manager.stopDeviceScan();
    };
  }, [manager]);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const apiLevel = Platform.Version ? parseInt(Platform.Version, 10) : 0;
      if (apiLevel < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permission de localisation',
            message: 'Le Bluetooth Low Energy nécessite la localisation',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const bluetoothScanPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          {
            title: 'Permission de scan Bluetooth',
            message: 'Le Bluetooth Low Energy nécessite la permission de scan Bluetooth',
            buttonPositive: 'OK',
          }
        );
        const bluetoothConnectPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          {
            title: 'Permission de connexion Bluetooth',
            message: 'Le Bluetooth Low Energy nécessite la permission de connexion Bluetooth',
            buttonPositive: 'OK',
          }
        );
        const fineLocationPermission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permission de localisation',
            message: 'Le Bluetooth Low Energy nécessite la localisation',
            buttonPositive: 'OK',
          }
        );

        return (
          bluetoothScanPermission === PermissionsAndroid.RESULTS.GRANTED &&
          bluetoothConnectPermission === PermissionsAndroid.RESULTS.GRANTED &&
          fineLocationPermission === PermissionsAndroid.RESULTS.GRANTED
        );
      }
    } else {
      return true;
    }
  };

  const startScan = async () => {
    const permissionGranted = await requestPermissions();
    if (!permissionGranted) {
      console.log('Permissions non accordées');
      return;
    }

    setIsScanning(true);
    setDevices([]);

    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
        setIsScanning(false);
        return;
      }

      if (device && !devices.find((d) => d.id === device.id)) {
        setDevices((prevDevices) => [...prevDevices, device]);
      }
    });

    setTimeout(() => {
      manager.stopDeviceScan();
      setIsScanning(false);
    }, 20000); // Scanne pendant 5 secondes
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button
        title={isScanning ? 'Scanning...' : 'Scan for BLE Devices'}
        onPress={startScan}
        disabled={isScanning}
      />
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>Nom : {item.name ? item.name : 'Inconnu'}</Text>
            <Text>ID : {item.id}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default BLEScanner;