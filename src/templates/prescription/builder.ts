import { TDocumentDefinitions } from "pdfmake/interfaces"
import { IGeneratePrescription } from "../../models/generate-prescription.model"
import { getDoctorClinicSection } from "./doctor-clinic"

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
