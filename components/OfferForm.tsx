import { View } from 'react-native';
import { ModalInput } from '@/components/ModalInput';
import { ModalButton } from '@/components/ModalButton';
import React from 'react';

interface OfferFormProps {
  type: string;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (formData: FormData) => void;
}

export interface FormData {
  [key: string]: string | number;
}

const OfferForm = ({ type, onSubmit }: OfferFormProps) => {
  const [formData, setFormData] = React.useState<FormData>({});

  const handleInputChange = (key: string, value: string | number) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleFormSubmit = () => {
    onSubmit(formData);
  };

  const renderFormFields = () => {
    switch (type) {
      case 'reduction':
        return (
          <ModalInput
            placeholder="Pourcentage de réduction"
            onChangeText={(text) => handleInputChange('reduction', text)}
          />
        );
      case 'special':
        return (
          <>
          <ModalInput
            placeholder="Description de l'évènement"
            onChangeText={(text) => handleInputChange('description', text)}
          />
          <ModalInput
            placeholder="Date de l'évènement"
            onChangeText={(text) => handleInputChange('date', text)}
          />
          </>
        );
      // Add more cases here as needed
      default:
        return null;
    }
  };

  return (
    <View>
      {renderFormFields()}
      <ModalButton
        title="Valider"
        onPress={handleFormSubmit}
        backgroundColor="#0E3D60"
        textColor="#FFFFFF"
      />
    </View>
  );
};

export default OfferForm;
