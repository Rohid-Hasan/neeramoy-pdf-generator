import { TDocumentDefinitions } from "pdfmake/interfaces"
import { IGeneratePrescription } from "../../models/generate-prescription.model"
import { getAdviceSection } from "./advice"
import { getChiefComplaintSection } from "./chief-complaint"
import { getDiagnosisSection } from "./diagnosis"
import { getDistressLevelsSection } from "./distress-levels"
import { getDoctorClinicSection } from "./doctor-clinic"
import { getEscalationSection } from "./escalation"
import { getFindingsSection } from "./findings"
import { getFollowupSection } from "./follow-up"
import { getHistorySection } from "./history"
import { getInvestigationSection } from "./investigation"
import { getMedicineSection } from "./medicine"
import { getOnExaminationSection } from "./on-examination"
import { getPatientAreaSection } from "./patient-area"
import { getPatientSection } from "./patient-info"
import { getReferredToSection } from "./reffered-to"
import { getTreatmentPlanSection } from "./treatment-plan"
import { getWellBeingSection } from "./well-being"

export const buildPrescriptionDefinition = (data: IGeneratePrescription): TDocumentDefinitions => {
    const pConfig = data.prescriptionConfig
    const baseSize = pConfig.baseFontSize || 12

    return {
        pageSize: "A4",
        pageMargins: [
            (pConfig.margin?.left || 1) * 28.35, // cm to points
            (pConfig.margin?.top || 1) * 28.35,
            (pConfig.margin?.right || 1) * 28.35,
            (pConfig.margin?.bottom || 1) * 28.35
        ],
        defaultStyle: {
            font: "AnekBangla",
            fontSize: baseSize,
            color: "#334155" // slate-700 equivalent
        },
        content: [
            getDoctorClinicSection(data, baseSize),
            getPatientSection(data, baseSize),

            // The Main 5/7 Grid using a Table for the Vertical Line
            {
                marginTop: 10,
                table: {
                    // 41.6% for Left, 58.4% for Right
                    widths: ["40%", "60%"],
                    headerRows: 0,
                    body: [
                        [
                            // LEFT COLUMN
                            {
                                stack: [
                                    getPatientAreaSection(data, baseSize),
                                    getChiefComplaintSection(data, baseSize),
                                    getHistorySection(data, baseSize),
                                    getOnExaminationSection(data, baseSize),
                                    getDistressLevelsSection(data, baseSize),
                                    getFindingsSection(data, baseSize),
                                    getDiagnosisSection(data, baseSize),
                                    getInvestigationSection(data, baseSize)
                                ]
                            },
                            // RIGHT COLUMN
                            {
                                stack: [
                                    getMedicineSection(data, baseSize),
                                    getWellBeingSection(data, baseSize),
                                    getTreatmentPlanSection(data, baseSize),
                                    getAdviceSection(data, baseSize),
                                    getEscalationSection(data, baseSize),
                                    getFollowupSection(data, baseSize),
                                    getReferredToSection(data, baseSize)
                                ]
                            }
                        ]
                    ]
                },
                layout: {
                    // Remove all horizontal lines
                    hLineWidth: () => 0,
                    // Only show a vertical line between the two columns (index 1)
                    vLineWidth: (i) => (i === 1 ? 0.5 : 0),
                    vLineColor: () => "#cbd5e1", // Light slate gray
                    // Only add padding to the right of the first column
                    paddingRight: (i) => (i === 0 ? 30 : 0),
                    // Only add padding to the left of the second column
                    paddingLeft: (i) => (i === 1 ? 30 : 0),
                    paddingTop: () => 0,
                    paddingBottom: () => 0
                }
            }
        ],
        styles: {
            primaryText: { color: "#357a7b", bold: true },
            secondaryText: { color: "#64748b", fontSize: baseSize * 0.85 },
            label: { color: "#334155", bold: true, fontSize: baseSize }, // dark-light font-medium
            value: { color: "#475569", bold: false, fontSize: baseSize }, // dart-mid-dark font-normal
            sectionHeader: {
                fontSize: baseSize * 1.25, // text-xl
                color: "#357a7b",
                bold: true,
                marginBottom: 5
            },
            labelBold: {
                fontSize: baseSize,
                color: "#1f2937", // neutral-800
                bold: true
            },
            valueNormal: {
                fontSize: baseSize,
                color: "#4b5563", // gray-600
                bold: false
            },
            subNote: {
                fontSize: baseSize * 0.85,
                color: "#475569",
                preserveLeadingSpaces: true
            },
            drugName: {
                fontSize: baseSize + 1, // base-base
                bold: true,
                color: "#000000"
            },
            medicineSubText: {
                fontSize: baseSize * 0.9, // text-sm
                color: "#4b5563" // gray-600 (dark-light)
            },
            sectionHeaderBlack: {
                fontSize: baseSize * 1.25, // text-xl
                color: "#000000",
                bold: true,
                marginBottom: 5
            },
            italicNote: {
                fontSize: baseSize * 0.85, // text-sm
                italics: true,
                color: "#64748b" // dark
            }
        }
    }
}
