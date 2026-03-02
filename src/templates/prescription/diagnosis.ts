import { Content } from "pdfmake/interfaces"
import { IGeneratePrescription } from "../../models/generate-prescription.model"
import { EPrescriptionListStyle } from "../../models/prescription.model"

export const getDiagnosisSection = (data: IGeneratePrescription, baseSize: number): Content => {
    const { prescription, prescriptionConfig: pConfig } = data
    const diagnoses = prescription.Diagnosis || []

    if (diagnoses.length === 0) return ""

    const listItems = diagnoses.map((item) => {
        // Main Line Text: Label + Duration (italic)
        const mainLineText: any[] = [{ text: item.label, style: "valueNormal" }]

        if (item.for) {
            mainLineText.push({
                text: ` (for ${item.for} ${item.period})`,
                style: "italicNote"
            })
        }

        // Stack to handle the label and the note underneath
        const itemStack: any = [
            { text: mainLineText },
            item.note
                ? {
                      text: item.note,
                      style: "subNote",
                      margin: [0, 2, 0, 0]
                  }
                : undefined
        ].filter(Boolean)

        return { stack: itemStack }
    })

    return {
        marginTop: 15,
        stack: [
            !pConfig.hideDiagnosisTitle ? { text: pConfig.diagnosisTitle, style: "sectionHeaderBlack" } : "",
            pConfig.diagnosisListStyle === EPrescriptionListStyle.NUMBER
                ? { ol: listItems, margin: [0, 5, 0, 0] }
                : { ul: listItems, margin: [0, 5, 0, 0] }
        ]
    }
}
