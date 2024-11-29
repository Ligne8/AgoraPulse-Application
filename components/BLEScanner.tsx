/* eslint-disable no-bitwise */
import { useState } from 'react';

import { BleManager, Device } from 'react-native-ble-plx';

const DEVICE_UUID = 'CD051DF7-FEA7-FBD5-BA28-A67FD30A1F9D';

const bleManager = new BleManager();

function useBLE() {
  const [allDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [color] = useState('white');

  const connectToDevice = async () => {
    try {
      const device = await bleManager.connectToDevice(DEVICE_UUID);
      setConnectedDevice(device);
      await device.discoverAllServicesAndCharacteristics();
    } catch (error) {
      console.log('Échec de la connexion :', error);
    }
    if (connectedDevice) {
      console.log('Connecté à :', connectedDevice.name);
    }
  };

  return {
    connectToDevice,
    allDevices,
    connectedDevice,
    color
  };
}

export default useBLE;
