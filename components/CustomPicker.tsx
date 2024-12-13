import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export interface Item {
  label: string;
  value: string;
}

interface CustomPickerProps {
  title?: string;
  items: Item[];
  backgroundColor?: string;
  textColor?: string;
  iconColor?: string;
  selectedItemColor?: string;
  // eslint-disable-next-line no-unused-vars
  onValueChange?: (value: string) => void;
  value?: string;
}

const CustomPicker: React.FC<CustomPickerProps> = ({
  title = 'Sélectionnez une option',
  items = [],
  backgroundColor = '#fff',
  textColor = '#000',
  iconColor = '#666',
  selectedItemColor = '#1A3D5D',
  onValueChange,
  value,
}) => {
  const [selectedValue, setSelectedValue] = useState<Item | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleItemPress = (item: Item) => {
    setSelectedValue(item);
    onValueChange && onValueChange(item.value); // Trigger the callback if provided
    setModalVisible(false);
  };

  useEffect(() => {
    if (value) {
      const val = value.trim();
      console.log('The value is :');
      console.log(val);
      const item = items.find((item) => item.value === val);
      console.log('The item is :');

      console.log(item);
      setSelectedValue(item || null);
    }
  }, [value]);
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <TouchableOpacity style={styles.pickerButton} onPress={() => setModalVisible(true)}>
        <Text style={[styles.selectedText, { color: textColor }]}>{selectedValue ? selectedValue.label : title}</Text>
        <FontAwesomeIcon icon={faChevronDown} size={20} color={iconColor} />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{title}</Text>
            <FlatList
              data={items}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.modalItem,
                    item.value === selectedValue?.value && { backgroundColor: selectedItemColor },
                  ]}
                  onPress={() => handleItemPress(item)}
                >
                  <Text
                    style={[styles.modalItemText, { color: item.value === selectedValue?.value ? '#fff' : textColor }]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  selectedText: {
    fontSize: 16,
    fontFamily: 'Montserrat',
    color: '#0E3D60',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'MontserratBold',
    marginBottom: 15,
  },
  modalItem: {
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    fontFamily: 'Montserrat',
    color: '0E3D60',
  },
  modalItemText: {
    fontSize: 16,
    fontFamily: 'Montserrat',
  },
  modalCloseButton: {
    marginTop: 10,
    alignItems: 'center',
    padding: 10,
  },
  modalCloseButtonText: {
    color: '#1A3D5D',
    fontFamily: 'MontserratBold',
    fontSize: 16,
  },
});

export default CustomPicker;
