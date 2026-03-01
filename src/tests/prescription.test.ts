import * as fs from "fs"
import * as path from "path"
import { generatePrescriptionPDF } from "../index"

async function runTest() {
    console.log("🚀 Starting PDF Generation Test...")

    const testData = {
        datetime: "2025-11-22-11-39-03-520",
        isPsychologist: false,
        isBracEmployee: false,
        prescription: {
            Advices: [],
            Escalation: { issues: [], details: null },
            DistressLevels: { start: null, end: null },
            PatientArea: { district: null, division: null, upazila: null, details: null },
            WellBeing: { questionAndAnswers: [], result: null },
            RefferedTo: {},
            Complaints: [
                { label: "cold", for: 1, period: "Days" },
                { label: "Runny nose", for: 1, period: "Days" },
                { label: "Runny nose", for: 1, period: "Days" },
                { label: "Runny nose", for: 1, period: "Days" },
                { label: "Runny nose", for: 1, period: "Days" },
                { label: "Runny nose", for: 1, period: "Days" },
                { label: "Runny nose", for: 1, period: "Days" },
                { label: "Runny nose", for: 1, period: "Days" },
                { label: "Runny nose", for: 1, period: "Days" },
                { label: "Runny nose", for: 1, period: "Days" },
                { label: "Runny nose", for: 1, period: "Days" },
                { label: "Runny nose", for: 1, period: "Days" },
                { label: "Runny nose", for: 1, period: "Days" },
                { label: "Runny nose", for: 1, period: "Days" },
                { label: "Runny nose", for: 1, period: "Days" },
                { label: "Runny nose", for: 1, period: "Days" },
                { label: "Runny nose", for: 1, period: "Days" },
                { label: "Runny nose", for: 1, period: "Days" },
                { label: "Runny nose", for: 1, period: "Days" },
                { label: "Runny nose", for: 1, period: "Days" },
                { label: "Runny nose", for: 1, period: "Days" },
                { label: "Runny nose", for: 1, period: "Days" },
                { label: "Runny nose", for: 1, period: "Days" },
                { label: "Runny nose", for: 1, period: "Days" },
                { label: "Runny nose", for: 1, period: "Days" },
                { label: "Runny nose", for: 1, period: "Days" },
                { label: "Runny nose", for: 1, period: "Days" },
                { label: "Runny nose", for: 1, period: "Days" },
                { label: "Runny nose", for: 1, period: "Days" }
            ],
            Histories: [],
            Findings: [],
            Investigations: [],
            Diagnosis: [],
            TreatmentPlans: [],
            OnExamination: {
                bmi: {
                    age: "25",
                    bmi: "19",
                    gender: "Male",
                    height: "5.9",
                    specialNote: null,
                    weight: "52"
                }
            },
            MedicineTag: {
                items: [
                    {
                        drug: "Fexo 120",
                        type: "Tablet",
                        generic: "Fexofenadine Hydrochloride",
                        doseAmount: 1,
                        doseType: "",
                        schedules: "0 + 0 + 1",
                        remark: "খাবার পরে",
                        duration: 3,
                        durationType: "দিন",
                        continuousDuration: false
                    },
                    {
                        drug: "Antazol",
                        type: "Nasal Drops",
                        generic: "Xylometazoline Hydrochloride",
                        doseAmount: 1,
                        doseType: "Unit",
                        schedules: "1 + 0 + 1",
                        remark: "খাবার পরে"
                    },
                    {
                        drug: "Fexo 120",
                        type: "Tablet",
                        generic: "Fexofenadine Hydrochloride",
                        doseAmount: 1,
                        doseType: "",
                        schedules: "0 + 0 + 1",
                        remark: "খাবার পরে",
                        duration: 3,
                        durationType: "দিন",
                        continuousDuration: false
                    },
                    {
                        drug: "Antazol",
                        type: "Nasal Drops",
                        generic: "Xylometazoline Hydrochloride",
                        doseAmount: 1,
                        doseType: "Unit",
                        schedules: "1 + 0 + 1",
                        remark: "খাবার পরে"
                    },
                    {
                        drug: "Fexo 120",
                        type: "Tablet",
                        generic: "Fexofenadine Hydrochloride",
                        doseAmount: 1,
                        doseType: "",
                        schedules: "0 + 0 + 1",
                        remark: "খাবার পরে",
                        duration: 3,
                        durationType: "দিন",
                        continuousDuration: false
                    },
                    {
                        drug: "Antazol",
                        type: "Nasal Drops",
                        generic: "Xylometazoline Hydrochloride",
                        doseAmount: 1,
                        doseType: "Unit",
                        schedules: "1 + 0 + 1",
                        remark: "খাবার পরে"
                    },
                    {
                        drug: "Fexo 120",
                        type: "Tablet",
                        generic: "Fexofenadine Hydrochloride",
                        doseAmount: 1,
                        doseType: "",
                        schedules: "0 + 0 + 1",
                        remark: "খাবার পরে",
                        duration: 3,
                        durationType: "দিন",
                        continuousDuration: false
                    },
                    {
                        drug: "Antazol",
                        type: "Nasal Drops",
                        generic: "Xylometazoline Hydrochloride",
                        doseAmount: 1,
                        doseType: "Unit",
                        schedules: "1 + 0 + 1",
                        remark: "খাবার পরে"
                    },
                    {
                        drug: "Fexo 120",
                        type: "Tablet",
                        generic: "Fexofenadine Hydrochloride",
                        doseAmount: 1,
                        doseType: "",
                        schedules: "0 + 0 + 1",
                        remark: "খাবার পরে",
                        duration: 3,
                        durationType: "দিন",
                        continuousDuration: false
                    },
                    {
                        drug: "Antazol",
                        type: "Nasal Drops",
                        generic: "Xylometazoline Hydrochloride",
                        doseAmount: 1,
                        doseType: "Unit",
                        schedules: "1 + 0 + 1",
                        remark: "খাবার পরে"
                    },
                    {
                        drug: "Fexo 120",
                        type: "Tablet",
                        generic: "Fexofenadine Hydrochloride",
                        doseAmount: 1,
                        doseType: "",
                        schedules: "0 + 0 + 1",
                        remark: "খাবার পরে",
                        duration: 3,
                        durationType: "দিন",
                        continuousDuration: false
                    },
                    {
                        drug: "Antazol",
                        type: "Nasal Drops",
                        generic: "Xylometazoline Hydrochloride",
                        doseAmount: 1,
                        doseType: "Unit",
                        schedules: "1 + 0 + 1",
                        remark: "খাবার পরে"
                    },
                    {
                        drug: "Fexo 120",
                        type: "Tablet",
                        generic: "Fexofenadine Hydrochloride",
                        doseAmount: 1,
                        doseType: "",
                        schedules: "0 + 0 + 1",
                        remark: "খাবার পরে",
                        duration: 3,
                        durationType: "দিন",
                        continuousDuration: false
                    },
                    {
                        drug: "Antazol",
                        type: "Nasal Drops",
                        generic: "Xylometazoline Hydrochloride",
                        doseAmount: 1,
                        doseType: "Unit",
                        schedules: "1 + 0 + 1",
                        remark: "খাবার পরে"
                    },
                    {
                        drug: "Fexo 120",
                        type: "Tablet",
                        generic: "Fexofenadine Hydrochloride",
                        doseAmount: 1,
                        doseType: "",
                        schedules: "0 + 0 + 1",
                        remark: "খাবার পরে",
                        duration: 3,
                        durationType: "দিন",
                        continuousDuration: false
                    },
                    {
                        drug: "Antazol",
                        type: "Nasal Drops",
                        generic: "Xylometazoline Hydrochloride",
                        doseAmount: 1,
                        doseType: "Unit",
                        schedules: "1 + 0 + 1",
                        remark: "খাবার পরে"
                    },
                    {
                        drug: "Fexo 120",
                        type: "Tablet",
                        generic: "Fexofenadine Hydrochloride",
                        doseAmount: 1,
                        doseType: "",
                        schedules: "0 + 0 + 1",
                        remark: "খাবার পরে",
                        duration: 3,
                        durationType: "দিন",
                        continuousDuration: false
                    },
                    {
                        drug: "Antazol",
                        type: "Nasal Drops",
                        generic: "Xylometazoline Hydrochloride",
                        doseAmount: 1,
                        doseType: "Unit",
                        schedules: "1 + 0 + 1",
                        remark: "খাবার পরে"
                    },
                    {
                        drug: "Fexo 120",
                        type: "Tablet",
                        generic: "Fexofenadine Hydrochloride",
                        doseAmount: 1,
                        doseType: "",
                        schedules: "0 + 0 + 1",
                        remark: "খাবার পরে",
                        duration: 3,
                        durationType: "দিন",
                        continuousDuration: false
                    },
                    {
                        drug: "Antazol",
                        type: "Nasal Drops",
                        generic: "Xylometazoline Hydrochloride",
                        doseAmount: 1,
                        doseType: "Unit",
                        schedules: "1 + 0 + 1",
                        remark: "খাবার পরে"
                    },
                    {
                        drug: "Fexo 120",
                        type: "Tablet",
                        generic: "Fexofenadine Hydrochloride",
                        doseAmount: 1,
                        doseType: "",
                        schedules: "0 + 0 + 1",
                        remark: "খাবার পরে",
                        duration: 3,
                        durationType: "দিন",
                        continuousDuration: false
                    },
                    {
                        drug: "Antazol",
                        type: "Nasal Drops",
                        generic: "Xylometazoline Hydrochloride",
                        doseAmount: 1,
                        doseType: "Unit",
                        schedules: "1 + 0 + 1",
                        remark: "খাবার পরে"
                    },
                    {
                        drug: "Fexo 120",
                        type: "Tablet",
                        generic: "Fexofenadine Hydrochloride",
                        doseAmount: 1,
                        doseType: "",
                        schedules: "0 + 0 + 1",
                        remark: "খাবার পরে",
                        duration: 3,
                        durationType: "দিন",
                        continuousDuration: false
                    },
                    {
                        drug: "Antazol",
                        type: "Nasal Drops",
                        generic: "Xylometazoline Hydrochloride",
                        doseAmount: 1,
                        doseType: "Unit",
                        schedules: "1 + 0 + 1",
                        remark: "খাবার পরে"
                    },
                    {
                        drug: "Fexo 120",
                        type: "Tablet",
                        generic: "Fexofenadine Hydrochloride",
                        doseAmount: 1,
                        doseType: "",
                        schedules: "0 + 0 + 1",
                        remark: "খাবার পরে",
                        duration: 3,
                        durationType: "দিন",
                        continuousDuration: false
                    },
                    {
                        drug: "Antazol",
                        type: "Nasal Drops",
                        generic: "Xylometazoline Hydrochloride",
                        doseAmount: 1,
                        doseType: "Unit",
                        schedules: "1 + 0 + 1",
                        remark: "খাবার পরে"
                    },
                    {
                        drug: "Fexo 120",
                        type: "Tablet",
                        generic: "Fexofenadine Hydrochloride",
                        doseAmount: 1,
                        doseType: "",
                        schedules: "0 + 0 + 1",
                        remark: "খাবার পরে",
                        duration: 3,
                        durationType: "দিন",
                        continuousDuration: false
                    },
                    {
                        drug: "Antazol",
                        type: "Nasal Drops",
                        generic: "Xylometazoline Hydrochloride",
                        doseAmount: 1,
                        doseType: "Unit",
                        schedules: "1 + 0 + 1",
                        remark: "খাবার পরে"
                    }
                ]
            },
            FollowupTag: {
                items: [],
                duration: 7,
                unit: "দিন পর",
                date: "29 November, 2025"
            },
            Clinic: {
                Id: "4b98ca7e-7763-4c9e-bd56-e081606bd612",
                Name: "Mirpur Adhunik Clinic",
                Address: "Kalshi Rd, Dhaka 1216, Bangladesh"
            },
            Doctor: {
                Name: "Neeramoy Test Doctor",
                EducationalQualification: ["MBBS", "FCPS", "MD"],
                Specialties: ["General", "Orthopedics", "Medicine"],
                BMDC: "3453453"
            },
            Patient: {
                Id: "f4f4acf9-17a1-410c-84a5-999a73834521",
                Name: "Rohid-Hasan",
                Gender: "Male",
                Age: "10 Month, 29 Days",
                BloodGroup: "A+"
            },
            Version: "v3-desktop"
        },
        prescriptionConfig: {
            investigationListStyle: "BULLET_POINT",
            medicineTitle: "Medicine (Rx)",
            signature: {
                type: "NOTE",
                note: "This is a computer-generated Prescription by doctor. No signature is required.",
                text: ""
            },
            showClinicInfo: true,
            historyTitle: "History",
            hideHistoryTitle: false,
            onExaminationTitle: "On Examination",
            complaintTitle: "Problems",
            medicineNameType: "MEDICINE_WITH_GENERIC",
            complaintListStyle: "BULLET_POINT",
            historyListStyle: "BULLET_POINT",
            findingsListStyle: "NUMBER",
            adviceListStyle: "NUMBER",
            followupTitle: "Follow up",
            hideOnExaminationTitle: false,
            findingsTitle: "Findings",
            prescriptionSendType: [],
            treatmentPlanTitle: "Treatment Plan",
            followupListStyle: "BULLET_POINT",
            version: "v3-desktop",
            hideComplaintTitle: false,
            adviceTitle: "Advice",
            diagnosisTitle: "Diagnosis",
            hideAge: false,
            onExaminationListStyle: "BULLET_POINT",
            hideBloodGroup: false,
            headerHeight: 200,
            investigationTitle: "Tests",
            medicineListStyle: "NUMBER",
            hideGender: false,
            treatmentPlanListStyle: "NUMBER",
            diagnosisListStyle: "BULLET_POINT",
            baseFontSize: 16
        }
    }

    try {
        const html = await generatePrescriptionPDF(testData as any)

        console.log("✅ HTML generated successfully.")

        // Create output directory if not exists
        const outputDir = path.join(__dirname, "output")
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true })
        }

        // Create file name with timestamp
        const fileName = `prescription.html`
        const filePath = path.join(outputDir, fileName)

        // Write HTML to file
        await fs.promises.writeFile(filePath, html, "utf-8")

        console.log(`📁 File saved at: ${filePath}`)
        console.log("Open it in your browser to preview.")
    } catch (error) {
        console.error("❌ Error generating PDF:", error)
    }
}

runTest()
