import React from 'react';
import { FaChartLine, FaDatabase, FaListUl, FaBrain } from 'react-icons/fa';

const StatsSection = () => {
    const stats = [
        {
            icon: <FaDatabase />,
            value: "70,000",
            label: "Patient Records",
            sub: "Dataset Volume",
            colorClass: "pastel-blue"
        },
        {
            icon: <FaChartLine />,
            value: "72.4%",
            label: "Training Accuracy",
            sub: "Consistent Performance",
            colorClass: "pastel-mint"
        },
        {
            icon: <FaListUl />,
            value: "13",
            label: "Biometric Inputs",
            sub: "Features Analyzed",
            colorClass: "pastel-purple"
        },
        {
            icon: <FaBrain />,
            value: "LogReg",
            label: "Linear Classifier",
            sub: "Algorithm Used",
            colorClass: "pastel-peach"
        }
    ];

    return (
        <section className="stats-section hidden-on-mobile">
            <div className="stats-container">
                <h2 className="section-title">Model Performance</h2>
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div key={index} className={`stat-card ${stat.colorClass}`}>
                            <div className="stat-icon-wrapper">
                                {stat.icon}
                            </div>
                            <div className="stat-content">
                                <h3 className="stat-value">{stat.value}</h3>
                                <p className="stat-label">{stat.label}</p>
                                <span className="stat-sub">{stat.sub}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;