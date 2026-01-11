import React from 'react';
import { FaRunning, FaAppleAlt, FaHeartbeat, FaSpa } from 'react-icons/fa';

const PreventionTips = ({ result }) => {
    const isHighRisk = result.result === 1;

    const tips = {
        lifestyle: {
            title: 'Limatyle & Habits',
            icon: <FaRunning />,
            high: [
                'Aim for at least 30 minutes of moderate-intensity aerobic activity (e.g., brisk walking) 5 days a week.',
                'Quit smoking immediately. Seek support groups or nicotine replacement therapy if needed.',
                'Limit alcohol intake to a minimum or avoid it completely.',
                'Prioritize 7-8 hours of quality sleep every night to reduce heart strain.'
            ],
            low: [
                'Maintain your current activity level of 150 minutes of moderate exercise per week.',
                'Avoid smoking and secondhand smoke exposure.',
                'Drink alcohol in moderation (if at all).',
                'Keep a consistent sleep schedule to support overall well-being.'
            ]
        },
        diet: {
            title: 'Dietary Guidelines',
            icon: <FaAppleAlt />,
            high: [
                'Adopt a heart-healthy diet (e.g., DASH or Mediterranean diet).',
                'Reduce sodium intake to under 1,500 mg per day.',
                'Limit saturated fats (red meat, full-fat dairy) and avoid trans fats.',
                'Increase fiber intake with fruits, vegetables, whole grains, and legumes.'
            ],
            low: [
                'Continue a balanced diet rich in fruits, vegetables, and whole grains.',
                'Limit processed foods and sugary beverages.',
                'Choose healthy fats like olive oil, avocados, and nuts.',
                'Stay hydrated and monitor calorie intake to maintain a healthy weight.'
            ]
        },
        monitoring: {
            title: 'Health Monitoring',
            icon: <FaHeartbeat />,
            high: [
                'Measure blood pressure daily and keep a log for your doctor.',
                'Check weight daily to monitor for fluid retention.',
                'Schedule regular cholesterol and glucose screenings as advised by your doctor.',
                'Be aware of warning signs like chest pain, shortness of breath, or palpitations.'
            ],
            low: [
                'Check blood pressure at least once a year.',
                'Monitor weight periodically to prevent gradual gain.',
                'Get a routine physical exam and blood work annually.',
                'Know your family history and discuss any changes with your doctor.'
            ]
        },
        stress: {
            title: 'Stress Management',
            icon: <FaSpa />,
            high: [
                'Practice daily stress-reduction techniques like deep breathing or meditation.',
                'Consider counseling or therapy to manage chronic stress or anxiety.',
                'Ensure you have time for relaxation and hobbies.',
                'Connect with friends and family for emotional support.'
            ],
            low: [
                'Incorporate relaxation techniques into your daily routine.',
                'Maintain a healthy work-life balance.',
                'Engage in social activities and hobbies you enjoy.',
                'Practice mindfulness to stay grounded.'
            ]
        }
    };

    const renderSection = (key, sectionData) => (
        <div key={key} className="prevention-card">
            <div className="prevention-header">
                <span className="prevention-icon">{sectionData.icon}</span>
                <h4 className="prevention-title">{sectionData.title}</h4>
            </div>
            <ul className="prevention-list">
                {(isHighRisk ? sectionData.high : sectionData.low).map((tip, index) => (
                    <li key={index}>{tip}</li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="prevention-container">
            <h3 className="section-heading" style={{ color: 'var(--text-main)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: isHighRisk ? '#f43f5e' : '#4ade80' }}>
                    {isHighRisk ? 'Critical' : 'Proactive'}
                </span> 
                Health Recommendations
            </h3>
            <div className="prevention-grid">
                {Object.keys(tips).map(key => renderSection(key, tips[key]))}
            </div>
            
            <style jsx>{`
                .prevention-container {
                    margin-top: 2rem;
                    padding-top: 2rem;
                    border-top: 1px solid var(--border-color);
                }
                .prevention-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 1.5rem;
                }
                .prevention-card {
                    background: var(--card-bg);
                    border: 1px solid var(--border-color);
                    border-radius: 12px;
                    padding: 1.5rem;
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .prevention-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }
                .prevention-header {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 1rem;
                    padding-bottom: 0.75rem;
                    border-bottom: 1px solid var(--border-color);
                }
                .prevention-icon {
                    font-size: 1.25rem;
                    color: var(--primary);
                    background: rgba(6, 182, 212, 0.1);
                    padding: 8px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .prevention-title {
                    margin: 0;
                    color: var(--text-main);
                    font-size: 1.1rem;
                }
                .prevention-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .prevention-list li {
                    position: relative;
                    padding-left: 1.25rem;
                    margin-bottom: 0.75rem;
                    color: var(--text-muted);
                    font-size: 0.95rem;
                    line-height: 1.5;
                }
                .prevention-list li:last-child {
                    margin-bottom: 0;
                }
                .prevention-list li::before {
                    content: "•";
                    position: absolute;
                    left: 0;
                    color: ${isHighRisk ? '#f43f5e' : '#4ade80'};
                    font-weight: bold;
                }
                
                @media (max-width: 768px) {
                    .prevention-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

export default PreventionTips;
