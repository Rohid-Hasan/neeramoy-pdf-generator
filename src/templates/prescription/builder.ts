import { TDocumentDefinitions } from "pdfmake/interfaces"
import { IPrescriptionConfig } from "../../models/prescription-config.model"
import { IPrescription } from "../../models/prescription.model"
import { getDoctorClinicSection } from "./doctor-clinic"

export const buildPrescriptionDefinition = (data: {
    datetime: string
    prescription: IPrescription
    prescriptionConfig: IPrescriptionConfig
    isPsychologist: boolean
    isBracEmployee: boolean
}): TDocumentDefinitions => {
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
            getDoctorClinicSection(data, baseSize)

            // Future sections will go here:
            // getPatientSection(data, baseSize),
            // getGridSection(data, baseSize),
        ],
        styles: {
            primaryText: { color: "#357a7b", bold: true },
            secondaryText: { color: "#64748b", fontSize: baseSize * 0.85 }
        }
    }
}
