import React from 'react';

export default function CoreValues({ values }) {
    return (
        <section className="py-20 bg-gray-300/50 text-gray">
            <div className="container mx-auto px-4 lg:px-8">
                <h2 className="text-4xl text-primary font-bold  text-center mb-12">
                    Our Core Values
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => (
                        <ValueCard
                            key={index}
                            icon={value.icon}
                            title={value.title}
                            description={value.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ValueCard({ icon: Icon, title, description }) {
    return (
        <div className="p-6 bg-accent text-center rounded-xl shadow-lg hover:shadow-2xl hover:text-primary transition-shadow">
            <Icon className="h-12 w-12 mb-4 mx-auto text-gray" />
            <h3 className="text-2xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}