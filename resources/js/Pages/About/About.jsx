import AppLayout from "@/Layouts/AppLayout";
import React from "react";
import {
    HeartIcon,
    GlobeAltIcon,
    UsersIcon,
    ChartBarIcon,
} from "@heroicons/react/24/outline";
import PolicyAccordion from "@/Pages/About/PolicyAccordian";
import CoreValues from "@/Pages/About/CoreValues";
import HeroSection from "@/Common/HeroSection";
import Accreditation from "@/Pages/Home/Accreditation";

export default function About() {
    const values = [
        {
            icon: HeartIcon,
            title: "Integrity",
            description: "Ethical practices at our core",
        },
        {
            icon: GlobeAltIcon,
            title: "Sustainability",
            description: "Global environmental stewardship",
        },
        {
            icon: UsersIcon,
            title: "Collaboration",
            description: "Partnership-driven success",
        },
        {
            icon: ChartBarIcon,
            title: "Excellence",
            description: "Uncompromising quality standards",
        },
    ];

    return (
        <AppLayout title="AQI Services">
            <div className="animate-fade-in-up">
                <HeroSection
                    title="About Us"
                    backgroundImage="/images/about1.jpg"
                />

                <CoreValues values={values} />
                <PolicyAccordion />
                <Accreditation />
            </div>
        </AppLayout>
    );
}
