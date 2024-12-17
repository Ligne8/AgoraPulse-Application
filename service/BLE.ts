import { Buffer } from 'buffer';

import { BleManager, Device } from 'react-native-ble-plx';

global.Buffer = global.Buffer || Buffer;

const bleManager = new BleManager();
export let connectedDevice: Device | null = null;

export function scanForDevices(): Promise<Device | null> {
  return new Promise((resolve) => {
    console.log('Début du scan BLE...');

    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error('Erreur lors du scan BLE :', error);
        resolve(null);
        return;
      }

      if (device) {
        if (device.name?.toLocaleLowerCase().includes('agora')) {
          console.log('Périphérique Agora-Box détecté !');
          connectedDevice = device;
          bleManager.stopDeviceScan();
          resolve(device);
          return;
        }
      }
    });
  });
}

export function getDeviceId(): string {
  return connectedDevice ? connectedDevice.id : '';
}

export function stopScan() {
  bleManager.stopDeviceScan();
}

export async function connectToDevice() {
  try {
    if (!connectedDevice) {
      console.log('Aucun périphérique détecté.');
      return false;
    }
    console.log('id: ' + connectedDevice.id);
    await bleManager.connectToDevice(connectedDevice.id);
    await connectedDevice.discoverAllServicesAndCharacteristics();
    return true;
  } catch (error) {
    console.log('Échec de la connexion :', error);
    return false;
  }
}

export async function sendMessageToDevice(message: string) {
  const serviceUUID = '0000ffe0-0000-1000-8000-00805f9b34fb';
  const characteristicUUID = '0000ffe1-0000-1000-8000-00805f9b34fb';
  if (!connectedDevice) {
    console.log('Aucun périphérique connecté.');
    return;
  }
  await connectedDevice.discoverAllServicesAndCharacteristics();
  const services = await connectedDevice.services();
  for (const service of services) {
    console.log(`Service UUID: ${service.uuid}`);
    const characteristics = await service.characteristics();
    for (const characteristic of characteristics) {
      console.log(`  Characteristic UUID: ${characteristic.uuid}`);
    }
  }

  const base64Message = Buffer.from(message).toString('base64');

  try {
    await connectedDevice.writeCharacteristicWithoutResponseForService(serviceUUID, characteristicUUID, base64Message);
    console.log('Message envoyé :', message); 
  } catch (error) {
    console.error('Erreur: ', error);
  }
}

export async function disconnectDevice(): Promise<void> {
  if (!connectedDevice) {
    console.log('Aucun périphérique connecté.');
    return;
  }

  try {
    await bleManager.cancelDeviceConnection(connectedDevice.id);
    console.log(`Déconnexion réussie du périphérique : ${connectedDevice.name}`);
    connectedDevice = null;
  } catch (error) {
    console.error('Erreur lors de la déconnexion du périphérique :', error);
  }
}
