import { TDocumentDefinitions } from "pdfmake/interfaces"
import { IGeneratePrescription } from "../../models/generate-prescription.model"
import { getChiefComplaintSection } from "./chief-complaint"
import { getDoctorClinicSection } from "./doctor-clinic"
import { getPatientAreaSection } from "./patient-area"
import { getPatientSection } from "./patient-info"

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
            // Only Doctor/Clinic section for now
            getDoctorClinicSection(data, baseSize),
            getPatientSection(data, baseSize),
            // The Main 5/7 Grid
            {
                columnGap: 20,
                columns: [
                    // Left Column (col-span-5)
                    {
                        width: "41.6%", // (5/12 * 100)
                        stack: [
                            getPatientAreaSection(data, baseSize),
                            getChiefComplaintSection(data, baseSize)
                        ]
                    },
                    // Right Column (col-span-7)
                    {
                        width: "58.4%", // (7/12 * 100)
                        stack: [
                            // getMedicineSection(data, baseSize), etc...
                        ]
                    }
                ]
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
            }
        }
    }
}
