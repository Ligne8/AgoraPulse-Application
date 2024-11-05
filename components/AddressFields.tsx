import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

export default function AddressField() {
  return (
    <View style={styles.addressContainer}>
      <View style={styles.addressLabel}>
        <FontAwesomeIcon icon={faMapMarkerAlt} size={18} color="#0E3D60" />
        <Text style={styles.labelText}>Adresse</Text>
      </View>
      <TextInput style={styles.input} placeholder="Numéro de voie et rue" placeholderTextColor="#6c7a93" />
      <TextInput style={styles.input} placeholder="Code postal" placeholderTextColor="#6c7a93" keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Ville" placeholderTextColor="#6c7a93" />
    </View>
  );
}

const styles = StyleSheet.create({
  addressContainer: {
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    borderColor: '#e3e3e3',
    borderWidth: 1,
    width: '100%',
    marginBottom: 15,
  },
  addressLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0E3D60',
    marginLeft: 5,
  },
  input: {
    height: 40,
    borderColor: '#e3e3e3',
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: 'Montserrat',
    paddingLeft: 10,
    fontSize: 14,
    color: '#6c7a93',
    marginBottom: 5,
    backgroundColor: '#ffffff',
  },
});
