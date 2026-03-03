import * as fs from "fs"
import * as path from "path"
import { generatePrescriptionPdf } from "../index"

async function runTest() {
    console.log("🚀 Starting PDF Generation Test...")

    const testData = {
        datetime: "2026-02-26-15-07-44-077",
        prescription: {
            Advices: [
                {
                    label: "take sufficient rest"
                },
                {
                    label: "Take precautions carefully"
                }
            ],
            Escalation: {
                issues: [],
                details: null
            },
            DistressLevels: {
                start: null,
                end: null
            },
            PatientArea: {
                district: null,
                division: null,
                upazila: null,
                details: null
            },
            WellBeing: {
                questionAndAnswers: [],
                result: null
            },
            RefferedTo: {},
            Complaints: [
                {
                    label: "S.Fever",
                    for: 2,
                    period: "Hours",
                    note: "observation"
                },
                {
                    label: "Low back pain",
                    for: 2,
                    period: "Days"
                }
            ],
            Histories: [
                {
                    label: "This is for testing This is for testing This is for testing ",
                    for: 1,
                    period: "Days",
                    note: "jdnjk dngkjdn dnkgndkf kdldkjlkgd dkglk"
                }
            ],
            Findings: [
                {
                    label: "This is for testing This is for testing This is for testing ",
                    query: true,
                    note: "jdkdkgkd "
                }
            ],
            Investigations: [
                {
                    label: "Digital X-Ray of X ray",
                    instruction: "N/A",
                    result: "Positive"
                }
            ],
            Diagnosis: [
                {
                    label: "Dialognosis favorite v-2",
                    for: 1,
                    period: "Days",
                    note: "hj kjk kjkkjkkj"
                }
            ],
            TreatmentPlans: [
                {
                    label: "treatment type 1",
                    for: 6,
                    period: "Days",
                    note: "jhjh kdkm kklsdds ghgf"
                }
            ],
            OnExamination: {
                pregnancyCalendar: {
                    calculateBasedOn: "last-period",
                    currently: "4 weeks, 1 days",
                    cycleLength: "28",
                    lastMenstrualPeriod: "2026-01-27T18:00:00.000Z",
                    specialNote: "gnggh",
                    dueDate: "2026-11-03T18:00:00.000Z"
                },
                temperature: {
                    specialNote: null,
                    type: "F",
                    value: "101"
                },
                pulse: {
                    specialNote: null,
                    type: "PM",
                    value: "75"
                },
                diabetesMellitus: {
                    isActive: true,
                    specialNote: null
                }
            },
            MedicineTag: {
                items: [
                    {
                        duration: 5,
                        schedule: 2,
                        scheduleType: "বেলা",
                        continuousDuration: false,
                        remark: "খাবার পরে",
                        type: "Tablet",
                        durationType: "দিন",
                        generic: "Aceclofenac",
                        drug: "Painex",
                        doseAmount: 1,
                        doseType: "Unit",
                        schedules: "0+0+1",
                        note: "Test Note"
                    },
                    {
                        note: "If Fever increases, take dose more kjvsddkj kjsdkjck djckjakjadc",
                        continuousDuration: false,
                        doseType: "Unit",
                        remark: "খাবার পরে",
                        type: "Tablet",
                        doseAmount: 1,
                        durationType: "দিন",
                        generic: "Paracetamol",
                        drug: "Napa",
                        schedules: "1+0+1",
                        duration: 3
                    }
                ]
            },
            FollowupTag: {
                items: [],
                date: "08 March, 2026",
                duration: 10,
                unit: "দিন পর"
            },
            Clinic: {
                Id: "519c7e51-1fa8-48d0-a893-0ccd90435975",
                Name: "Avash Hospital",
                Address: "Mirpur-1, Dhaka, Bangladesh"
            },
            Doctor: {
                DoctorId: "dc6da771-7e49-41b6-a70c-af9b4c96fc18",
                Name: "Dr. Hossian",
                Address: "Feni, Bangladesh",
                Specialties: ["Medicine", "Sports medicine"],
                Phone: "+8801713602906",
                Location: {
                    Lat: "22.9408784",
                    Lon: "91.4066646"
                },
                Bio: "This is the bio section of the doctor",
                Title: "Asst.Doctor",
                UserId: "a2ad44b0-cb4d-4970-a242-94b849a0575f",
                Clinics: {
                    "2e8b68de-6ff9-46f3-8d47-3e0a2388824c": {
                        Address: "Kutta Para Rd, Dhaka, Bangladesh",
                        ImageUrl:
                            "http://res.cloudinary.com/neeramoy/image/upload/v1685206276/gfmrnqlyrpnkw338rtqh.jpg",
                        Name: "Rafia Hospital"
                    },
                    "97e7b005-20cd-4d35-b95a-2683e499a99d": {
                        Address: "Tejgaon, Dhaka, Bangladesh",
                        ImageUrl: null,
                        Name: "Adhunik Clinic"
                    },
                    "519c7e51-1fa8-48d0-a893-0ccd90435975": {
                        Address: "Mirpur-1, Dhaka, Bangladesh",
                        ImageUrl: null,
                        Name: "avail"
                    },
                    "05a9aa30-5cb4-4f44-acee-b67b79b36c43": {
                        Address: "Dhaka Bangladesh ",
                        ImageUrl: null,
                        Name: "Helo clinic"
                    },
                    "ba7ee68c-64d3-4dbd-9fc5-2d1fae29e6c5": {
                        Address: "Chattogram, Bangladesh",
                        ImageUrl:
                            "http://res.cloudinary.com/neeramoy/image/upload/v1685206958/uibkxj1rue4gumcg3mj8.png",
                        Name: "Second Home Hospital"
                    },
                    "dcd3303d-6b65-44ae-9ea3-eed32ad134eb": {
                        Address: "Dhaka, Bangladesh",
                        ImageUrl:
                            "http://res.cloudinary.com/neeramoy/image/upload/v1685864015/cor9n3bxjxgimubyfvom.png",
                        Name: "Maya Hospital"
                    }
                },
                RequestedClinics: null,
                Email: "testing101@gmail.com",
                EducationalQualification: ["MBBS", "FCPS"],
                BMDC: "423232",
                Source: null,
                BoardingStatus: false,
                Gender: "Male",
                NationalId: null,
                Initial: null,
                PrimaryPhone: "+8801713602906",
                ProfileName: "HossainIqbal",
                FavouriteCount: "0",
                CreatedAt: null,
                UpdatedAt: "2026-02-26-14-30-18",
                BMDCDoc: "",
                NID: "3434377777",
                NIDDoc: "",
                ImageUrl:
                    "http://res.cloudinary.com/neeramoy/image/upload/v1712562399/dnwe3x4mdldrotfkqpgh.png",
                ShortId: "d-742",
                BMDCRegType: null,
                LiveSettings: {
                    Live: true,
                    AppointmentSettings: {
                        LiveFee: 0,
                        Duration: 20
                    }
                },
                SelectedClinic: "519c7e51-1fa8-48d0-a893-0ccd90435975",
                IsPsychologist: false,
                ExperienceYears: "7",
                B2B: {
                    "admin-panel-fixed-0-bdt": {
                        B2BPackageId: "admin-panel-fixed-0-bdt",
                        B2BPackageName: "Test From Admin Panel",
                        B2BPackageFeeType: "FixedAmount",
                        B2BPackageFeeAmount: 0,
                        B2BPackageStartDate: "2026-03-01",
                        B2BPackageEndDate: "2026-12-31"
                    },
                    "brac-fixed-amount-0-bdt": {
                        B2BPackageId: "brac-fixed-amount-0-bdt",
                        B2BPackageName: "Brac General Practitioners",
                        B2BPackageFeeType: "FixedAmount",
                        B2BPackageFeeAmount: 0,
                        B2BPackageStartDate: "2023-05-01",
                        B2BPackageEndDate: "2023-07-31"
                    },
                    "gp-b2b-gold": {
                        B2BPackageId: "gp-b2b-gold",
                        B2BPackageName: "GP Star Gold",
                        B2BPackageFeeType: "FixedAmount",
                        B2BPackageFeeAmount: 95,
                        B2BPackageStartDate: "2024-08-24",
                        B2BPackageEndDate: "2027-07-31"
                    },
                    "gp-b2b-platinum": {
                        B2BPackageId: "gp-b2b-platinum",
                        B2BPackageName: "GP Star Platinum",
                        B2BPackageFeeType: "FixedAmount",
                        B2BPackageFeeAmount: 80,
                        B2BPackageStartDate: "2024-08-24",
                        B2BPackageEndDate: "2027-07-31"
                    },
                    "rohid-fixed-amount-0-bdt": {
                        B2BPackageId: "rohid-fixed-amount-0-bdt",
                        B2BPackageName: "Brac General Practitioners",
                        B2BPackageFeeType: "FixedAmount",
                        B2BPackageFeeAmount: 0,
                        B2BPackageStartDate: "2023-05-01",
                        B2BPackageEndDate: "2023-07-31"
                    },
                    "sunlife-gp-fixed-amount-0-bdt": {
                        B2BPackageId: "sunlife-gp-fixed-amount-0-bdt",
                        B2BPackageName: "Sunlife General Practitioners",
                        B2BPackageFeeType: "FixedAmount",
                        B2BPackageFeeAmount: 10,
                        B2BPackageStartDate: "2023-05-01",
                        B2BPackageEndDate: "2023-07-31"
                    },
                    "sunlife-gp-fixed-amount-0-bdt-2": {
                        B2BPackageId: "sunlife-gp-fixed-amount-0-bdt-2",
                        B2BPackageName: "Sunlife General Practitioners",
                        B2BPackageFeeType: "FixedAmount",
                        B2BPackageFeeAmount: 0,
                        B2BPackageStartDate: "2023-05-01",
                        B2BPackageEndDate: "2023-07-31"
                    }
                },
                Id: "dc6da771-7e49-41b6-a70c-af9b4c96fc18"
            },
            Patient: {
                Id: "f88b73ac-63b1-42e0-b668-093b1931f633",
                Name: "sourojit saha",
                Gender: "Male",
                Address: "Uttara, Dhaka, Bangladesh",
                Age: "24 years",
                BloodGroup: "A+"
            },
            Version: "v3-desktop"
        },
        prescriptionConfig: {
            investigationListStyle: "BULLET_POINT",
            medicineTitle: "Medicine (Rx)",
            signature: {
                type: "NOTE",
                note: "This is a computer-generated Prescription by doctor. No signature is required."
            },
            showClinicInfo: true,
            historyTitle: "History",
            onExaminationTitle: "On Examination",
            complaintTitle: "Chief Complaints",
            medicineNameType: "MEDICINE_WITH_GENERIC",
            complaintListStyle: "BULLET_POINT",
            historyListStyle: "BULLET_POINT",
            findingsListStyle: "NUMBER",
            adviceListStyle: "NUMBER",
            followupTitle: "Follow up",
            margin: {
                right: 1,
                top: 1,
                left: 1,
                bottom: 1
            },
            findingsTitle: "Findings",
            showTime: true,
            prescriptionSendType: ["email"],
            treatmentPlanTitle: "Treatment Plan",
            followupListStyle: "BULLET_POINT",
            baseFontSize: 12,
            showDateTime: true,
            version: "v3-desktop",
            adviceTitle: "Advice",
            diagnosisTitle: "Diagnosis",
            hideAge: false,
            onExaminationListStyle: "BULLET_POINT",
            hideBloodGroup: false,
            headerHeight: 200,
            investigationTitle: "Investigation",
            medicineListStyle: "NUMBER",
            hideGender: false,
            treatmentPlanListStyle: "NUMBER",
            diagnosisListStyle: "BULLET_POINT"
        },
        onTheFly: true
    }

    try {
        const pdfBuffer = await generatePrescriptionPdf(testData as any)

        // Ensure output directory exists
        const outputDir = path.join(__dirname, "./output")
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir)
        }

        const outputPath = path.join(outputDir, "prescription.pdf")

        // Write the Buffer to a PDF file
        fs.writeFileSync(outputPath, pdfBuffer as Buffer)

        console.log(`✅ PDF Generated Successfully!`)
        console.log(`📂 Location: ${outputPath}`)
        console.log(`💡 Tip: Right-click the file in VS Code and select "Reveal in Explorer" to open it.`)
    } catch (error) {
        console.error("❌ Error generating PDF:", error)
    }
}

runTest()
