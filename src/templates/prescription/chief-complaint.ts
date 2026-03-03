import { Content } from "pdfmake/interfaces"
import { IGeneratePrescription } from "../../models/generate-prescription.model"
import { EPrescriptionListStyle } from "../../models/prescription.model"

export const getChiefComplaintSection = (data: IGeneratePrescription, baseSize: number): Content => {
    const { prescription, prescriptionConfig: pConfig } = data
    const complaints = prescription.Complaints || []

    if (complaints.length === 0) return ""

    // 1. Build the items for the list
    const listItems = complaints.map((item) => {
        const mainLineText: any[] = [{ text: item.label, style: "valueNormal" }]

        if (item.for) {
            mainLineText.push({
                text: ` (for ${item.for} ${item.period})`,
                style: "italicNote"
            })
        }

        // Using a stack for the label + note ensures they stay together
        const itemStack: any = [
            { text: mainLineText },
            item.note
                ? {
                      text: item.note,
                      style: "subNote",
                      margin: [0, baseSize * 0.15, 0, 0]
                  }
                : undefined
        ].filter(Boolean)

        return { stack: itemStack }
    })

    // 2. Return the section with the title and the dynamic list
    return {
        marginTop: baseSize * 0.6,
        stack: [
            !pConfig.hideComplaintTitle ? { text: pConfig.complaintTitle, style: "sectionHeaderBlack" } : "",
            // Use built-in 'ol' for numbers or 'ul' for bullets
            pConfig.complaintListStyle === EPrescriptionListStyle.NUMBER
                ? { ol: listItems, margin: [0, baseSize * 0.4, 0, 0] }
                : { ul: listItems, margin: [0, baseSize * 0.4, 0, 0] }
        ]
    }
}
