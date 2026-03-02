import { Content } from "pdfmake/interfaces"
import { PrescriptionVersionEnum } from "../../enums/prescription.enum"
import { IGeneratePrescription } from "../../models/generate-prescription.model"
import { EPrescriptionListStyle } from "../../models/prescription.model"
import { PrescriptionUtil } from "../../utilities/prescription.util"

const util = new PrescriptionUtil()

export const getMedicineSection = (data: IGeneratePrescription, baseSize: number): Content => {
    const { prescription, prescriptionConfig: pConfig } = data
    const medicineTag = prescription.MedicineTag
    const items = medicineTag?.items || []

    if (items.length === 0) return ""

    const medicineList: any[] = items.map((med, i) => {
        // 1. TOP LINE: Type + Drug Name ------- Quantity
        const topLine: any[] = [
            med.type ? { text: `${med.type}. `, style: "valueNormal" } : "",
            { text: med.drug, style: "drugName" }
        ]

        if (med.quantity) {
            topLine.push({ text: "  -------  ", color: "#cbd5e1" }) // slate-300 spacer
            topLine.push({
                text: `${util.fractionalTemplate(med.quantity) || ""} ${med.quantityType || ""}`,
                style: "valueNormal"
            })
        }

        // 2. MIDDLE LINE: Dose x Schedule / Duration / Remark
        const middleLine: any[] = []

        // Dose & Schedule logic (V2)
        if (prescription.Version == PrescriptionVersionEnum.V2) {
            if (med.doseAmount) {
                middleLine.push({
                    text: `${util.fractionalTemplate(med.doseAmount) || ""} ${med.doseType || ""} `
                })
            }

            if (med.doseAmount && med.schedule) {
                middleLine.push({ text: "x ", color: "#94a3b8" })
            }

            if (med.schedule) {
                middleLine.push({
                    text: `${util.fractionalTemplate(med.schedule) || ""} ${med.scheduleType || ""}`
                })
            }
        } else {
            //v3
            if (med.schedules) {
                middleLine.push({
                    text: `${util.parseSchedules(med.schedules) || ""} ${med.doseType ? "(" + med.doseType + ")" : ""}`
                })
            }
        }

        // Remark
        if (med.remark) {
            middleLine.push({ text: "  -------  ", color: "#cbd5e1" })
            middleLine.push({ text: med.remark })
        }

        // Duration / Continuous
        if (med.duration) {
            middleLine.push({ text: "  -------  ", color: "#cbd5e1" })
            middleLine.push({
                text: `${util.fractionalTemplate(med.duration) || ""} ${med.durationType || ""}`
            })
        } else if (med.continuousDuration) {
            middleLine.push({ text: "  -------  ", color: "#cbd5e1" })
            middleLine.push({ text: "চলবে" })
        }

        // 3. NOTE LINE
        const noteLine = med.note
            ? {
                  text: [
                      { text: "Note: ", italics: true, fontSize: baseSize * 0.8 },
                      { text: med.note, fontSize: baseSize * 0.85 }
                  ],
                  marginTop: 2
              }
            : undefined

        // Build the medicine block
        return {
            stack: [
                { text: topLine, lineHeight: 1.2 },
                { text: middleLine, style: "medicineSubText", marginTop: 2 },
                noteLine
            ].filter(Boolean),
            marginBottom: 12 // Equivalent to gap-4
        }
    })

    // Handle "Continue Previous" footer
    if (medicineTag.continuePrevious) {
        medicineList.push({
            text: "আগের ওষুধ চলবে...",
            style: "primaryText",
            marginTop: 10
        })
    }

    return {
        marginTop: 15,
        stack: [
            !pConfig.hideMedicineTitle ? { text: pConfig.medicineTitle, style: "sectionHeaderBlack" } : "",
            // Use built-in list logic to handle Bullets/Numbers automatically
            pConfig.medicineListStyle === EPrescriptionListStyle.NUMBER
                ? { ol: medicineList }
                : { ul: medicineList }
        ]
    }
}
