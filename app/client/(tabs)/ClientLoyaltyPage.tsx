import {Text, TouchableOpacity, View, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {FontAwesome} from '@expo/vector-icons';
import {router} from 'expo-router';

type Status = 'completed' | 'recovered' | 'in_progress';

interface Loyalty {
    title: string;
    description: string;
    fidelity_points: number;
    status: Status;
    threshold: number;
    image_url: string;
}

const CompletedReward = ({title, description, image_url}: Loyalty) => (
    <TouchableOpacity
        onPress={() => router.push('/client/pages/Offer')}
        className="bg-[#2A9BE2] p-2 rounded-lg flex-row items-center justify-between mb-4 w-[100%]"
    >
        <Image source={{uri: image_url}} className="w-10 h-10 rounded-full mr-4"/>
        <View className="flex-1">
            <Text style={{fontFamily: 'MontserratBold', fontSize: 18}} className="text-white text-lg">
                {title}
            </Text>
            <Text style={{fontFamily: 'MontserratSemiBold', fontSize: 18}} className="text-white mt-1">
                {description}
            </Text>
        </View>
        <FontAwesome name="qrcode" size={24} color="white"/>
    </TouchableOpacity>
);

const RecoveredReward = ({title, description, image_url, onRecover}: Loyalty & { onRecover: () => void }) => (
    <View className="border border-[#2A9BE2] p-2 rounded-lg mb-4 w-[100%] bg-[#E5E7EB]">
        <View className="rounded-lg flex-row justify-between ">
            <View className="flex-column flex-start">
                <Image source={{uri: image_url}} className="w-10 h-10 rounded-full self-start mr-4"/>
            </View>
            <View className="flex-1">
                <Text style={{fontFamily: 'MontserratBold', fontSize: 18}} className="text-[#0E3D60] text-lg">
                    {title}
                </Text>
                <Text style={{fontFamily: 'Montserrat', fontSize: 18}} className="text-[#0E3D60] mb-4">
                    {description}
                </Text>
            </View>
        </View>
        <TouchableOpacity onPress={onRecover}
                          className="bg-[#2A9BE2] flex-row items-center justify-center py-3 rounded-md">
            <FontAwesome name="archive" size={18} color="white" style={{marginRight: 10}}/>
            <Text style={{fontFamily: 'MontserratBold', fontSize: 16}} className="text-white">
                Récupérer la récompense
            </Text>
        </TouchableOpacity>
    </View>
);

const InProgressReward = ({title, description, fidelity_points, threshold, image_url}: Loyalty) => (
    <View className="border border-[#1C98DD] p-2 rounded-lg mb-4 w-[100%] bg-[#E5E7EB]">
        <View className="rounded-lg flex-row justify-between ">
            <View className="flex-column flex-start">
                <Image source={{uri: image_url}} className="w-10 h-10 rounded-full self-start mr-4"/>
            </View>
            <View className="flex-1">
                <Text style={{fontFamily: 'MontserratBold', fontSize: 18}} className="text-[#0E3D60] text-lg">
                    {title}
                </Text>
                <Text style={{fontFamily: 'Montserrat', fontSize: 18}} className="text-[#0E3D60] mb-4">
                    {description}
                </Text>
            </View>
        </View>
        <View className="bg-[#D9D9D9] h-7 rounded-full overflow-hidden">
            <View style={{width: `${(fidelity_points / threshold) * 100}%`}} className="bg-[#0E3D60] h-full"/>
        </View>
        <Text
            style={{fontFamily: 'MontserratSemiBold', fontSize: 12}}
            className="text-[#0E3D60] mt-2 font-bold text-right"
        >
            {fidelity_points} / {threshold} pts
        </Text>
    </View>
);

export default function ClientLoyaltyPage() {
    const [loyalty, setLoyalty] = useState<Loyalty[]>([
        {
            title: 'MON BURGER',
            description: 'My big burger',
            fidelity_points: 10,
            status: 'completed',
            threshold: 100,
            image_url: 'https://cdn.stoneline.de/media/b0/c4/37/1721744157/Smash-Burger.png',
        },
        {
            title: 'Giga Tacos',
            description: 'Un caca mou assuré',
            fidelity_points: 58,
            status: 'recovered',
            threshold: 150,
            image_url:
                'https://tb-static.uber.com/prod/image-proc/processed_images/d50875d2d2165417352e129d53bdab3f/30be7d11a3ed6f6183354d1933fbb6c7.jpeg',
        },
        {
            title: 'Dégradé spas 12',
            description: 'DEGRADE TAH LES MURS',
            fidelity_points: 150,
            status: 'in_progress',
            threshold: 200,
            image_url: 'https://static1.millenium.org/articles/9/31/86/39/@/789396-pompe-article_m-1.jpg',
        },
        {
            title: 'Bedo gratuit',
            description: 'De la bonne sa mère',
            fidelity_points: 10,
            status: 'completed',
            threshold: 100,
            image_url: 'https://www.cbd.fr/2941-large_default/blue-dream-fleurs-de-cbd-easy-weed.jpg',
        },
        {
            title: 'Dildo',
            description: 'Gourmand',
            fidelity_points: 289,
            status: 'in_progress',
            threshold: 999,
            image_url:
                'https://cdn.laredoute.com/cdn-cgi/image/width=500,height=500,fit=pad,dpr=1/products/a/3/4/a346a2d3c8b40c51d46504a78bb9c4d1.jpg',
        },
    ]);

    const handleRecoverReward = (index: number) => {
        setLoyalty((prevLoyalty) =>
            prevLoyalty.map((item, i) =>
                i === index && item.status === 'recovered' ? {...item, status: 'completed'} : item
            )
        );
    };

    return (
        <View className="h-full flex-col w-full justify-center items-center">
            <View className="justify-center items-center px-[30px] mb-[20px] mt-[90px]">
                <Text
                    style={{fontFamily: 'MontserratExtraBold', fontSize: 36}}
                    className="text-[36px] font-bold text-[#0E3D60] mb-6 text-center"
                >
                    Vos points de fidélité
                </Text>
                <Text style={{fontFamily: 'Montserrat', fontSize: 16}}
                      className="text-center text-[#0E3D60] text-[16px]">
                    Cumulez des points à chaque utilisation de vos offres et débloquez des récompenses exclusives ! Plus
                    vous
                    utilisez l&apos;application, plus vous gagnez.
                </Text>
            </View>
            <ScrollView className="w-full px-5">
                {loyalty
                    .sort((a, b) => {
                        const order = {completed: 0, recovered: 1, in_progress: 2};
                        return order[a.status] - order[b.status];
                    })
                    .map((item, index) => {
                        if (item.status === 'completed') {
                            return <CompletedReward key={index} {...item} />;
                        } else if (item.status === 'recovered') {
                            return <RecoveredReward key={index} {...item}
                                                    onRecover={() => handleRecoverReward(index)}/>;
                        } else if (item.status === 'in_progress') {
                            return <InProgressReward key={index} {...item} />;
                        }
                        return null;
                    })}
            </ScrollView>
        </View>
    );
}
