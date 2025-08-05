function calculateBMI() {
    const weight = parseFloat(document.getElementById('userWeight').value);
    const height = parseFloat(document.getElementById('userHeight').value);
    const unit = document.getElementById('unitSystem').value;

    if (!weight || !height) {
        document.getElementById('bmiResult').innerText = 'Please enter both weight and height.';
        return;
    }

    let bmiValue;
    if (unit === 'metric') {
        bmiValue = weight / (height * height);
    } else {
        bmiValue = 703 * (weight / (height * height));
    }

    let bmiCategory = '';
    if (bmiValue < 18.5) {
        bmiCategory = 'Underweight';
    } else if (bmiValue < 24.9) {
        bmiCategory = 'Normal weight';
    } else if (bmiValue < 29.9) {
        bmiCategory = 'Overweight';
    } else {
        bmiCategory = 'Obesity';
    }

    const resultMessage = `Your BMI is ${bmiValue.toFixed(2)}, which is considered ${bmiCategory}.`;
    document.getElementById('bmiResult').innerText = resultMessage;

    generatePDFReport(bmiValue, bmiCategory);
}

function generatePDFReport(bmi, category) {
    const { jsPDF } = window.jspdf;
    const report = new jsPDF();

    report.setFontSize(18);
    report.text('Your Personal BMI Report', 20, 20);

    report.setFontSize(12);
    report.text(`BMI Value: ${bmi.toFixed(2)}`, 20, 40);
    report.text(`Category: ${category}`, 20, 50);
    report.text('Health Advice:', 20, 70);

    let adviceText = '';
    if (category === 'Underweight') {
        adviceText = 'Consider a nutrient-rich diet and consult a doctor.';
    } else if (category === 'Normal weight') {
        adviceText = 'Keep up the good work and stay active!';
    } else if (category === 'Overweight') {
        adviceText = 'Try incorporating exercise and a balanced diet.';
    } else {
        adviceText = 'Seek professional medical advice for a healthy plan.';
    }

    report.text(adviceText, 20, 80);
    report.save('BMI_Report.pdf');
}
