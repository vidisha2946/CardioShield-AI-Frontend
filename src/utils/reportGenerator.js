import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generatePDF = (formData, result, action = 'download') => {
    const doc = new jsPDF();
    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();

    // -- Theme Colors --
    const primaryCol = [15, 23, 42];   // Dark Navy (Slate 900)
    const accentCol = [6, 182, 212];   // Cyan (Cyan 500)
    const borderCol = [203, 213, 225]; // Slate 300
    const labelBg = [241, 245, 249];   // Slate 100
    const highRiskCol = [244, 63, 94]; // Rose 500
    const lowRiskCol = [34, 197, 94];  // Green 500

    // -- Background Watermark (Subtle) --
    doc.setTextColor(245, 247, 250);
    doc.setFontSize(60);
    doc.setFont("helvetica", "bold");
    doc.text("CardioShield", width / 2, height / 2, { align: 'center', angle: 45 });

    // -- Border & Header Background --
    doc.setDrawColor(...borderCol);
    doc.setLineWidth(0.5);
    doc.rect(5, 5, width - 10, height - 10);

    // Header Banner
    doc.setFillColor(...primaryCol);
    doc.rect(5, 5, width - 10, 35, 'F');

    // -- HEADER CONTENT --
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("CardioShield AI", 15, 20);

    doc.setFontSize(10);
    doc.setTextColor(accentCol[0], accentCol[1], accentCol[2]);
    doc.text("Advanced Cardiac Diagnostic Center", 15, 28);

    // Report Info Badge (Right side of header)
    doc.setFillColor(30, 41, 59); // Slightly lighter navy
    doc.roundedRect(135, 12, 65, 20, 2, 2, 'F');

    doc.setTextColor(148, 163, 184); // Slate 400
    doc.setFontSize(8);
    doc.text("REPORT ID", 140, 19);
    doc.text("DATE", 140, 27);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(`CS-${Math.floor(Math.random() * 10000)}`, 160, 19);
    doc.text(new Date().toLocaleDateString(), 160, 27);


    // -- HELPER: Attractive Field Box --
    const drawStyleField = (x, y, w, h, label, value, highlight = false) => {
        // Shadow effect
        doc.setFillColor(240, 240, 240);
        // doc.rect(x + 1, y + 1, w, h, 'F'); // Simple shadow

        // Background
        doc.setFillColor(255, 255, 255);
        if (highlight) doc.setFillColor(250, 255, 255); // Very light cyan tint
        doc.rect(x, y, w, h, 'F');

        // Border
        doc.setDrawColor(...borderCol);
        if (highlight) doc.setDrawColor(...accentCol);
        doc.rect(x, y, w, h);

        // Label Section (Top part of box)
        doc.setFillColor(...labelBg);
        if (highlight) doc.setFillColor(...accentCol);
        doc.rect(x, y, w, 7, 'F');

        // Label Text
        doc.setFontSize(7);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(71, 85, 105); // Slate 600
        if (highlight) doc.setTextColor(255, 255, 255);
        doc.text(label.toUpperCase(), x + 3, y + 5);

        // Value Text
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(15, 23, 42);
        if (value) doc.text(String(value), x + 3, y + 14);
    };

    let y = 50;

    // -- SECTION: PATIENT DATA --
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryCol);
    doc.text("PATIENT PROFILE", 10, y);
    doc.setDrawColor(...accentCol);
    doc.line(10, y + 2, 50, y + 2); // Underline
    y += 8;

    const col1 = 10;
    const col2 = 60;
    const col3 = 110;
    const col4 = 160;

    drawStyleField(col1, y, 45, 18, "Age (Years)", formData.age);
    drawStyleField(col2, y, 45, 18, "Gender", formData.gender === '1' ? 'Female' : 'Male');
    drawStyleField(col3, y, 45, 18, "Height (cm)", formData.height);
    drawStyleField(col4, y, 40, 18, "Weight (kg)", formData.weight);

    y += 25;

    // -- SECTION: VITALS --
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryCol);
    doc.text("CLINICAL VITALS", 10, y);
    doc.line(10, y + 2, 50, y + 2);
    y += 8;

    const cholMap = { '1': 'Normal', '2': 'Above Normal', '3': 'High' };
    const glucMap = { '1': 'Normal', '2': 'Above Normal', '3': 'High' };

    drawStyleField(col1, y, 45, 18, "Systolic BP", `${formData.ap_hi} mmHg`);
    drawStyleField(col2, y, 45, 18, "Diastolic BP", `${formData.ap_lo} mmHg`);
    // Highlight BMI
    drawStyleField(col3, y, 90, 18, "BMI Score", result.bmi, true);

    y += 25;
    drawStyleField(col1, y, 95, 18, "Cholesterol Level", cholMap[formData.cholesterol]);
    drawStyleField(col3, y, 95, 18, "Glucose Level", glucMap[formData.gluc]);

    y += 30;

    // -- SECTION: LIFESTYLE --
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryCol);
    doc.text("LIFESTYLE FACTORS", 10, y);
    doc.line(10, y + 2, 50, y + 2);
    y += 10;

    // Stylish Checkboxes
    const drawStylishCheck = (lx, ly, label, yes) => {
        // Label
        doc.setFontSize(10);
        doc.setTextColor(70, 70, 70);
        doc.text(label, lx, ly);

        // Yes Box
        doc.setDrawColor(...borderCol);
        if (yes) {
            doc.setFillColor(...accentCol);
            doc.rect(lx + 40, ly - 4, 12, 6, 'FD'); // Filled box
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(8);
            doc.text("YES", lx + 42, ly);
        } else {
            doc.rect(lx + 40, ly - 4, 12, 6);
            doc.setTextColor(150, 150, 150);
            doc.setFontSize(8);
            doc.text("YES", lx + 42, ly);
        }

        // No Box
        if (!yes) {
            doc.setFillColor(200, 200, 200);
            doc.rect(lx + 55, ly - 4, 10, 6, 'FD');
            doc.setTextColor(50, 50, 50);
            doc.setFontSize(8);
            doc.text("NO", lx + 57, ly);
        } else {
            doc.rect(lx + 55, ly - 4, 10, 6);
            doc.setTextColor(150, 150, 150);
            doc.setFontSize(8);
            doc.text("NO", lx + 57, ly);
        }
    };

    drawStylishCheck(15, y, "Smoker", formData.smoke === '1');
    drawStylishCheck(110, y, "Physical Activity", formData.active === '1');
    y += 12;
    drawStylishCheck(15, y, "Alcohol Intake", formData.alco === '1');

    y += 20;

    // -- ASSESSMENT RESULT (Big Impact) --
    const isHigh = result.result === 1;
    const resColor = isHigh ? highRiskCol : lowRiskCol;

    // Background Container for Result
    doc.setFillColor(isHigh ? 255 : 240, isHigh ? 240 : 255, isHigh ? 240 : 250); // Very light red or green tint
    doc.setDrawColor(...resColor);
    doc.setLineWidth(1);
    doc.roundedRect(10, y, width - 20, 50, 4, 4, 'FD');

    // Icon Placeholder (Circle)
    doc.setFillColor(...resColor);
    doc.circle(35, y + 25, 15, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");

    if (isHigh) {
        // High Risk: "!"
        doc.text("", 35, y + 36, { align: 'center' });
    } else {
        // Low Risk: Draw a Checkmark manually to avoid font issues
        doc.setDrawColor(255, 255, 255);
        doc.setLineWidth(3);
        // doc.line(28, y + 25, 33, y + 32); // Down stroke
        // doc.line(33, y + 32, 42, y + 18); // Up stroke
    }

    // Text
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(...resColor);
    doc.text(isHigh ? "HIGH RISK DETECTED" : "LOW RISK DETECTED", 60, y + 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
    doc.text("Estimated Risk Probability:", 60, y + 35);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(`${result.prob}%`, 115, y + 35);

    y += 65;

    // -- NOTES / RECOMMENDATION --
    doc.setFontSize(10);
    doc.setTextColor(...primaryCol);
    doc.text("MEDICAL NOTES / RECOMMENDATION", 10, y);
    y += 5;

    // Notes Box
    doc.setDrawColor(...borderCol);
    doc.setLineWidth(0.1);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(10, y, width - 20, 30, 2, 2, 'FD');

    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.setFont("helvetica", "italic");
    const recText = isHigh
        ? "Patient analysis indicates elevated risk factors. Immediate consultation with a specialist is advised. Please focus on blood pressure management and lifestyle adjustments."
        : "Patient analysis indicates low risk factors. Current health metrics are within optimal range. Continue balanced diet and regular activity.";

    doc.text(recText, 15, y + 10, { maxWidth: width - 30 });

    // -- FOOTER --
    const footerY = height - 15;
    doc.setFillColor(...primaryCol);
    doc.rect(0, height - 20, width, 20, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Educational Purpose Only. Always consult a doctor for medical advice.", width / 2, height - 8, { align: 'center' });

    // -- NEW PAGE: PREVENTION TIPS --
    doc.addPage();

    // Header for 2nd page
    doc.setFillColor(...primaryCol);
    doc.rect(5, 5, width - 10, 20, 'F');
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("PREVENTION & LIFESTYLE RECOMMENDATIONS", width / 2, 17, { align: 'center' });

    doc.setDrawColor(...borderCol);
    doc.setLineWidth(0.5);
    doc.rect(5, 5, width - 10, height - 10);

    let py = 40;

    // Tips Data (Replicated from PreventionTips.jsx for consistency)
    const tips = {
        lifestyle: {
            title: 'LIFESTYLE & HABITS',
            high: [
                'Aim for at least 30 minutes of moderate-intensity aerobic activity 5 days a week.',
                'Quit smoking immediately. Seek support groups or nicotine replacement therapy.',
                'Limit alcohol intake to a minimum or avoid it completely.',
                'Prioritize 7-8 hours of quality sleep every night.'
            ],
            low: [
                'Maintain your current activity level of 150 minutes of moderate exercise per week.',
                'Avoid smoking and secondhand smoke exposure.',
                'Drink alcohol in moderation.',
                'Keep a consistent sleep schedule to support overall well-being.'
            ]
        },
        diet: {
            title: 'DIETARY GUIDELINES',
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
            title: 'HEALTH MONITORING',
            high: [
                'Measure blood pressure daily and keep a log for your doctor.',
                'Check weight daily to monitor for fluid retention.',
                'Schedule regular cholesterol and glucose screenings as advised.',
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
            title: 'STRESS MANAGEMENT',
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

    const drawTipSection = (title, items, yPos) => {
        doc.setFontSize(12);
        doc.setTextColor(...primaryCol);
        doc.setFont("helvetica", "bold");
        doc.text(title, 15, yPos);
        doc.setDrawColor(...accentCol);
        doc.line(15, yPos + 2, 60, yPos + 2); // Underline

        let tempY = yPos + 10;
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        doc.setFont("helvetica", "normal");

        items.forEach(item => {
            doc.text(`•  ${item}`, 20, tempY);
            tempY += 7;
        });

        return tempY + 5; // Return new Y position
    };

    const tipType = isHigh ? 'high' : 'low';

    py = drawTipSection(tips.lifestyle.title, tips.lifestyle[tipType], py);
    py = drawTipSection(tips.diet.title, tips.diet[tipType], py);
    py = drawTipSection(tips.monitoring.title, tips.monitoring[tipType], py);
    py = drawTipSection(tips.stress.title, tips.stress[tipType], py);

    // Footer for 2nd page
    doc.setFillColor(...primaryCol);
    doc.rect(0, height - 20, width, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text("Educational Purpose Only. Consult a doctor.", width / 2, height - 8, { align: 'center' });
    doc.text("Page 2 of 2", width - 20, height - 8);


    // Output
    if (action === 'view') {
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, '_blank');
    } else {
        doc.save(`CardioShield_Report_${new Date().toISOString().split('T')[0]}.pdf`);
    }
};
