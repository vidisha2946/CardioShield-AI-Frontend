import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generatePDF } from './utils/reportGenerator';
import { FaFileDownload, FaArrowLeft, FaHeartbeat } from 'react-icons/fa';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
import PreventionTips from './components/PreventionTips';

const ReportPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { formData, result } = location.state || {};

    // Redirect if no data is present
    useEffect(() => {
        if (!formData || !result) {
            navigate('/diagnostic');
        }
    }, [formData, result, navigate]);

    if (!formData || !result) return null;

    const getChartData = (prob) => [
        { name: 'Safe', uv: 100, fill: '#334155' },
        { name: 'Risk Probability', uv: prob, fill: prob > 50 ? '#f43f5e' : '#4ade80' }
    ];

    const cholMap = { '1': 'Normal', '2': 'Above Normal', '3': 'High' };
    const glucMap = { '1': 'Normal', '2': 'Above Normal', '3': 'High' };

    return (
        <div className="diagnostic-page">
            <div className="diagnostic-full-width" style={{ maxWidth: '1000px' }}>
                
                {/* Header Controls */}
                <div className="report-controls">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="report-back-btn" 
                    >
                        <FaArrowLeft /> Back
                    </button>
                    <button 
                        onClick={() => generatePDF(formData, result)}
                        className="submit-btn report-download-btn"
                    >
                        <FaFileDownload /> Download PDF
                    </button>
                </div>

                {/* Report Card */}
                <div className="card report-page-card" style={{ borderColor: result.result === 1 ? '#f43f5e' : '#4ade80' }}>
                    
                    {/* Report Header */}
                    <div className="report-header-section">
                        <h1 className="report-title">
                            <FaHeartbeat style={{ color: 'var(--primary)' }} /> CardioShield AI
                        </h1>
                        <p style={{ color: 'var(--text-muted)' }}>Advanced Cardiac Health Diagnostic Report</p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Date: {new Date().toLocaleDateString()}</p>
                    </div>

                    {/* AI Result Banner */}
                    <div className="report-banner" style={{ 
                        background: result.result === 1 ? 'rgba(244, 63, 94, 0.1)' : 'rgba(74, 222, 128, 0.1)', 
                        border: `1px solid ${result.result === 1 ? 'rgba(244, 63, 94, 0.3)' : 'rgba(74, 222, 128, 0.3)'}`
                    }}>
                        <h2 className="report-banner-title" style={{ color: result.result === 1 ? '#f43f5e' : '#4ade80' }}>
                            {result.result === 1 ? 'HIGH RISK DETECTED' : 'LOW RISK DETECTED'}
                        </h2>
                        <p style={{ fontSize: '1.2rem', marginTop: '1rem', color: 'var(--text-main)' }}>
                            Estimated Risk Probability: <strong>{result.prob}%</strong>
                        </p>
                    </div>

                    {/* Data Grid */}
                    <div className="report-grid">
                        
                        {/* Left: Patient Details */}
                        <div>
                            <h3 className="card-heading" style={{ fontSize: '1.4rem' }}>Patient Profile</h3>
                            <table className="report-table">
                                <tbody>
                                    <tr><td style={{ color: 'var(--text-muted)' }}>Age</td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>{formData.age} Years</td></tr>
                                    <tr><td style={{ color: 'var(--text-muted)' }}>Gender</td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>{formData.gender === '1' ? 'Female' : 'Male'}</td></tr>
                                    <tr><td style={{ color: 'var(--text-muted)' }}>Height</td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>{formData.height} cm</td></tr>
                                    <tr><td style={{ color: 'var(--text-muted)' }}>Weight</td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>{formData.weight} kg</td></tr>
                                    <tr><td style={{ color: 'var(--text-muted)' }}>BMI Score</td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>{result.bmi}</td></tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Right: Medical Stats */}
                        <div>
                            <h3 className="card-heading" style={{ fontSize: '1.4rem' }}>Clinical Vitals</h3>
                            <table className="report-table">
                                <tbody>
                                    <tr><td style={{ color: 'var(--text-muted)' }}>Blood Pressure</td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>{formData.ap_hi}/{formData.ap_lo} mmHg</td></tr>
                                    <tr><td style={{ color: 'var(--text-muted)' }}>Cholesterol</td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>{cholMap[formData.cholesterol]}</td></tr>
                                    <tr><td style={{ color: 'var(--text-muted)' }}>Glucose</td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>{glucMap[formData.gluc]}</td></tr>
                                    <tr><td style={{ color: 'var(--text-muted)' }}>Smoker</td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>{formData.smoke === '1' ? 'Yes' : 'No'}</td></tr>
                                    <tr><td style={{ color: 'var(--text-muted)' }}>Alcohol Intake</td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>{formData.alco === '1' ? 'Yes' : 'No'}</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Chart Section */}
                    <div className="report-chart-section">
                         <h4 style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Risk Visualization</h4>
                         <div style={{ height: '250px', width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <RadialBarChart innerRadius="60%" outerRadius="100%" barSize={20} data={getChartData(result.prob)} startAngle={180} endAngle={0}>
                                    <RadialBar minAngle={15} label={{ position: 'insideStart', fill: '#fff' }} background clockWise dataKey="uv" />
                                    <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" wrapperStyle={{ top: 0, left: 0, lineHeight: '24px', display: 'none' }} />
                                </RadialBarChart>
                            </ResponsiveContainer>
                         </div>
                    </div>

                    {/* Recommendation Footer */}
                    <div className="report-recommendation-box">
                        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--primary)' }}>Clinical Recommendation</h4>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-main)' }}>
                            {result.result === 1 
                                ? "We strongly recommend consulting a cardiologist for further evaluation. Focus on lifestyle changes such as a heart-healthy diet, regular moderate exercise, and monitoring blood pressure." 
                                : "Your heart health metrics appear to be within a safe range. Maintain a healthy lifestyle, stay active, and continue regular check-ups to prevent future risks."}
                        </p>
                    </div>

                    {/* Prevention Tips Section */}
                    <PreventionTips result={result} />

                    <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        <p>Disclaimer: This is an AI-generated report for <strong>educational purposes only</strong>. It is not a medical diagnosis.</p>
                        <p style={{ marginTop: '0.5rem' }}>Always <strong>consult a doctor</strong> for professional medical advice.</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ReportPage;
