import { View } from 'react-native';
import { ModalButton } from '@/components/ModalButton';
import React, { useEffect, useState } from 'react';
import EntryField from '@/components/EntryField';
import { faInfoCircle, faQuestionCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-native-date-picker';
import { showToast, ToastComponent } from '@/components/ToastComponent';

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
  const [eventDate, setEventDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const numberRegExp = new RegExp('^[0-9]{0,2}$');

  const handleInputChange = (key: string, value: string | number) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (type === 'special') {
      handleInputChange('eventDate', eventDate.toLocaleDateString());
    }
  }, []);

  const handleFormSubmit = () => {
    if (Object.keys(formData).length === 0) {
      return;
    }
    if (type === 'reduction') {
      if (!formData.reduction || formData.reduction === '' || !formData.product || formData.product === '') {
        showToast('error', 'Erreur', 'Veuillez remplir tous les champs');
        return;
      }
    } else if (type === 'special') {
      if (!formData.description || formData.description === '') {
        return;
      }
    }
    onSubmit(formData);
  };

  const renderFormFields = () => {
    switch (type) {
      case 'reduction':
        return (
          <>
            <EntryField
              icon={faShoppingCart}
              title="Montant de la réduction (%)"
              placeholder="ex: 15"
              backgroundColor="#EEEEEE"
              descriptionColor="#6c7a93"
              marginBottom={10}
              onChangeText={(text) => {
                if (numberRegExp.test(text)) {
                  handleInputChange('reduction', text);
                }
              }}
              value={formData.reduction ? formData.reduction.toString() : ''} // Keep the value controlled
            />
            <EntryField
              icon={faQuestionCircle}
              title="Produit concerné"
              placeholder="ex: Diavola"
              backgroundColor="#EEEEEE"
              descriptionColor="#6c7a93"
              marginBottom={10}
              onChangeText={(text) => {
                handleInputChange('product', text);
              }}
              value={formData.product ? formData.product.toString() : ''} // Keep the value controlled
            />
          </>
        );
      case 'special':
        return (
          <>
            <EntryField
              icon={faInfoCircle}
              title="Nom de l événement"
              placeholder=""
              backgroundColor="#EEEEEE"
              descriptionColor="#6c7a93"
              marginBottom={10}
              onChangeText={(text) => handleInputChange('description', text)}
            />
            <ModalButton
              title={'Date limite de l événement : ' + eventDate.toLocaleDateString()}
              onPress={() => setIsDatePickerOpen(true)}
              backgroundColor="#EEEEEE"
              textColor="#0E3D60"
              borderColor="#CCCCCC"
            />
            <DatePicker
              modal
              open={isDatePickerOpen}
              date={eventDate}
              minimumDate={new Date()}
              mode="date"
              onConfirm={(date) => {
                setIsDatePickerOpen(false);
                setEventDate(date);
                handleInputChange('eventDate', date.toLocaleDateString());
              }}
              onCancel={() => setIsDatePickerOpen(false)}
            />
          </>
        );
      // Add more cases here as needed
      default:
        return null;
    }
  };

  return (
    <>
      <View>
        {renderFormFields()}
        <View className="mt-6">
          <ModalButton title="Valider" onPress={handleFormSubmit} backgroundColor="#0E3D60" textColor="#FFFFFF" />
        </View>
      </View>
      <ToastComponent />
    </>
  );
};

export default OfferForm;
