/* eslint-disable no-bitwise */
import { useState } from 'react';
import { Buffer } from 'buffer';

import { BleManager, Device } from 'react-native-ble-plx';

const DEVICE_UUID = 'CD051DF7-FEA7-FBD5-BA28-A67FD30A1F9D';

global.Buffer = global.Buffer || Buffer;

const bleManager = new BleManager();

function useBLE() {
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [, setIsScanning] = useState(false);

  const scanForDevices = () => {
    setIsScanning(true);
    console.log('Début du scan BLE...');

    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error('Erreur lors du scan BLE :', error);
        setIsScanning(false);
        return;
      }

      if (device) {
        if (device.name?.toLocaleLowerCase().includes('agora')) {
          console.log('Périphérique Agora-Box détecté !');
          bleManager.stopDeviceScan();
          setIsScanning(false);
        }

        setAllDevices((prevDevices) => {
          if (!prevDevices.find((d) => d.id === device.id)) {
            return [...prevDevices, device];
          }
          return prevDevices;
        });
      }
    });

    setTimeout(() => {
      bleManager.stopDeviceScan();
      setIsScanning(false);
      console.log('Scan BLE arrêté.');
    }, 30000);
  };

  const connectToDevice = async () => {
    try {
      const device = await bleManager.connectToDevice(DEVICE_UUID);
      setConnectedDevice(device);
      await device.discoverAllServicesAndCharacteristics();
    } catch (error) {
      console.log('Échec de la connexion :', error);
      return false;
    }
    if (connectedDevice) {
      console.log('Connecté à :', connectedDevice.name);
      return true;
    }
  };

  const DiscoverServicesAndCharacteristics = async (device: Device) => {
    console.log('ceci est un test');
    try {
      const services = await device.services();
      console.log('Services trouvés :');
      for (const service of services) {
        console.log(`Service UUID : ${service.uuid}`);
        const characteristics = await service.characteristics();
        for (const characteristic of characteristics) {
          console.log(`\tCaractéristique UUID : ${characteristic.uuid}`);
          console.log(`\tPropriétés : 
            Lecture : ${characteristic.isReadable}, 
            Écriture : ${characteristic.isWritableWithoutResponse}, 
            Notifications : ${characteristic.isNotifiable}`);
        }
      }
    } catch (error) {
      console.error('Erreur lors de la découverte des services et caractéristiques :', error);
    }
  };

  //send message to the device
  const SendMessageToDevice = async (message: string) => {
    if (!connectedDevice) {
      console.log('Aucun périphérique connecté.');
      return;
    }

    try {
      const services = await connectedDevice.services();
      const writeService = services.find((service) => service.uuid === '0000ffe0-0000-1000-8000-00805f9b34fb');

      if (!writeService) {
        console.log('Service non trouvé.');
        return;
      }

      const characteristics = await writeService.characteristics();
      const writeCharacteristic = characteristics.find(
        (char) => char.uuid === '0000ffe1-0000-1000-8000-00805f9b34fb' && char.isWritableWithoutResponse
      );

      if (!writeCharacteristic) {
        console.log('Caractéristique non trouvée ou non inscriptible.');
        return;
      }

      const base64Message = Buffer.from(message).toString('base64');
      await writeCharacteristic.writeWithoutResponse(base64Message);
      console.log('Message envoyé :', message);
    } catch (error) {
      console.error('Erreur lors de l envoi du message :', error);
    }
  };

  return {
    connectToDevice,
    allDevices,
    connectedDevice,
    DiscoverServicesAndCharacteristics,
    SendMessageToDevice,
    scanForDevices,
  };
}

export default useBLE;
