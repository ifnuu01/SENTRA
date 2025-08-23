import { faqData } from "@/constants/Faq";
import { guideData } from "@/constants/Guide";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function FAQScreen() {
    const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
    const [expandedGuide, setExpandedGuide] = useState<number | null>(null);

    const toggleFAQ = (id: number) => {
        setExpandedFAQ(expandedFAQ === id ? null : id);
    };

    const toggleGuide = (id: number) => {
        setExpandedGuide(expandedGuide === id ? null : id);
    };

    return (
        <LinearGradient
            colors={['#887DFF', '#AD46FF', '#EB3CA9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 2 }}
            style={{ flex: 1 }}
        >
            <ScrollView
                style={{ flex: 1, maxHeight: 610 }}
                contentContainerStyle={{
                    paddingTop: 10,
                    paddingHorizontal: 10,
                    paddingBottom: 120,
                    gap: 10
                }}
                showsVerticalScrollIndicator={false}
            >
                {/* Panduan Penggunaan Section */}
                <View style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: 16,
                    padding: 24,
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                        <MaterialIcons name="menu-book" size={28} color="white" />
                        <Text style={{
                            fontSize: 24,
                            fontWeight: '700',
                            color: 'white',
                            marginLeft: 12,
                        }}>
                            Panduan Penggunaan
                        </Text>
                    </View>

                    {guideData.map((guide) => (
                        <TouchableOpacity
                            key={guide.id}
                            onPress={() => toggleGuide(guide.id)}
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: 12,
                                padding: 16,
                                marginBottom: 12,
                                borderWidth: 1,
                                borderColor: 'rgba(255, 255, 255, 0.15)',
                            }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                    <MaterialIcons name={guide.icon as any} size={24} color="white" />
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: '600',
                                        color: 'white',
                                        marginLeft: 12,
                                        flex: 1,
                                    }}>
                                        {guide.title}
                                    </Text>
                                </View>
                                <MaterialIcons
                                    name={expandedGuide === guide.id ? "expand-less" : "expand-more"}
                                    size={24}
                                    color="white"
                                />
                            </View>

                            {expandedGuide === guide.id && (
                                <Text style={{
                                    fontSize: 14,
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    marginTop: 10,
                                    lineHeight: 20,
                                    paddingLeft: 36,
                                }}>
                                    {guide.content}
                                </Text>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                {/* FAQ Section */}
                <View style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: 16,
                    padding: 24,
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                        <MaterialIcons name="quiz" size={28} color="white" />
                        <Text style={{
                            fontSize: 24,
                            fontWeight: '700',
                            color: 'white',
                            marginLeft: 12,
                        }}>
                            Pertanyaan Umum (FAQ)
                        </Text>
                    </View>

                    {faqData.map((faq) => (
                        <TouchableOpacity
                            key={faq.id}
                            onPress={() => toggleFAQ(faq.id)}
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: 12,
                                padding: 16,
                                marginBottom: 12,
                                borderWidth: 1,
                                borderColor: 'rgba(255, 255, 255, 0.15)',
                            }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                    <MaterialIcons name={faq.icon as any} size={22} color="white" />
                                    <Text style={{
                                        fontSize: 15,
                                        fontWeight: '600',
                                        color: 'white',
                                        marginLeft: 12,
                                        flex: 1,
                                    }}>
                                        {faq.question}
                                    </Text>
                                </View>
                                <MaterialIcons
                                    name={expandedFAQ === faq.id ? "expand-less" : "expand-more"}
                                    size={24}
                                    color="white"
                                />
                            </View>

                            {expandedFAQ === faq.id && (
                                <Text style={{
                                    fontSize: 14,
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    marginTop: 10,
                                    lineHeight: 20,
                                    paddingLeft: 34,
                                }}>
                                    {faq.answer}
                                </Text>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Contact Support Section */}
                <View style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: 16,
                    padding: 24,
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                        <MaterialIcons name="support-agent" size={28} color="white" />
                        <Text style={{
                            fontSize: 24,
                            fontWeight: '700',
                            color: 'white',
                            marginLeft: 12,
                        }}>
                            Butuh Bantuan Lain?
                        </Text>
                    </View>

                    <Text style={{
                        fontSize: 16,
                        color: 'rgba(255, 255, 255, 0.9)',
                        lineHeight: 24,
                        textAlign: 'center',
                    }}>
                        Jika pertanyaan Anda belum terjawab, silakan hubungi tim support kami untuk bantuan lebih lanjut.
                    </Text>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 10,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: 8,
                        padding: 12,
                    }}>
                        <MaterialIcons name="email" size={20} color="white" />
                        <Text style={{
                            fontSize: 14,
                            color: 'white',
                            marginLeft: 8,
                            fontWeight: '500',
                        }}>
                            ifnuu01@gmail.com
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}