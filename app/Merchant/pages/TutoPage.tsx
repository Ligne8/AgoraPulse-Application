import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';

interface Steps {
  title: string;
  text1: string;
  text2: string;
  logo: keyof typeof images;
  step: number;
}

const images = {
  bluetooth: require('@/assets/images/bluetooth.png'),
  power: require('@/assets/images/power.png'),
  magnifyingGlass: require('@/assets/images/magnifying-glass.png'),
  link: require('@/assets/images/link.png'),
};

const steps: Steps[] = [
  {
    title: 'Activez le Bluetooth',
    text1: 'Assurez-vous que le Bluetooth est activé sur votre appareil pour permettre la connexion avec le boîtier.',
    text2: 'Rendez-vous dans les paramètres de votre téléphone si nécessaire.',
    logo: 'bluetooth',
    step: 1,
  },
  {
    title: 'Allumez votre boîtier',
    text1: 'Branchez votre boîtier et appuyez sur le bouton situé sur la face avant de l’appareil pour l’allumer.',
    text2: 'Une lumière bleue apparaîtra, elle indique que le boîtier est prêt pour l’appairage.',
    logo: 'power',
    step: 2,
  },
  {
    title: 'Détection automatique',
    text1: 'Retournez dans l’application.',
    text2: 'Celle-ci va automatiquement détecter votre boîtier allumé à proximité et vous inviter à l’appairer.',
    logo: 'magnifyingGlass',
    step: 3,
  },
  {
    title: 'Appairez votre boîtier',
    text1: 'Suivez les instructions pour confirmer l’appairage avec le boîtier.',
    text2: 'Une notification s’affichera dans l’application une fois la connexion réussie.',
    logo: 'link',
    step: 4,
  },
];

interface StepProps {
  step: Steps;
  nextStep: () => void;
  finalStep?: boolean;
}

interface ReturnButtonProps {
  onPress: () => void;
}

function ReturnButton({ onPress }: ReturnButtonProps) {
  return (
    <TouchableOpacity className="flex-row justify-left items-center invisible " onPress={onPress}>
      <FontAwesome name="chevron-left" size={20} color="#CCCCCC" />
      <Text className="pl-2 text-[16px] text-[#CCCCCC]">Retour</Text>
    </TouchableOpacity>
  );
}

function Step({ step, nextStep, finalStep }: StepProps) {
  return (
    <View className=" justify-center items-center px-8  mt-5">
      <View className="justify-center items-center mt-5">
        <Image className="w-[180px] h-[180px] mb-[25px]" source={images[step.logo]} />
        <View className="h-[282px]">
          <Text className="text-center font-extrabold text-[40px] text-[#0E3D60] mb-[25px]">{step.title}</Text>
          <Text className="text-center text-[18px] text-[#0E3D60] mb-[25px]">{step.text1}</Text>
          <Text className="text-center text-[18px] text-[#0E3D60]">{step.text2}</Text>
        </View>
      </View>
      <View className="mt-8">
        <View className="flex-row justify-center gap-x-[15px] ">
          {steps.map((_, index) => (
            <View
              key={index}
              className={`h-[15px] w-[15px] mx-[7px] rounded-full ${index === step.step - 1 ? 'bg-[#0E3D60]' : 'bg-[#D9D9D9]'}`}
            />
          ))}
        </View>
        <TouchableOpacity onPress={nextStep}>
          <View
            className={`items-center justify-center mt-7 w-[339px] h-[65px] border-[3px] border-[#0E3D60] rounded-[20px] ${finalStep ? 'bg-[#0E3D60]' : ''}`}
          >
            <Text className={`font-bold text-[20px] ${finalStep ? 'text-white' : 'text-[#0E3D60]'} `}>
              {!finalStep ? 'Passer' : 'Commencer'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function MerchantTutoPage() {
  const [currentStep, setCurrentStep] = React.useState(0);

  const nextStep = () => {
    if (currentStep === steps.length - 1) {
      setCurrentStep(0);
      router.push('/Merchant/pages/Bluetooth');
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const previousStep = () => {
    if (currentStep === 0) {
      return;
    }
    setCurrentStep(currentStep - 1);
  };

  return (
    <View className="justify-center flex-col h-full mt-5">
      <View style={{ opacity: currentStep === 0 ? 0 : 100 }} className="ml-5 ">
        <ReturnButton onPress={previousStep} />
      </View>
      <Step step={steps[currentStep]} nextStep={nextStep} finalStep={currentStep === steps.length - 1} />
    </View>
  );
}
