import { Content } from "pdfmake/interfaces"
import { IGeneratePrescription } from "../../models/generate-prescription.model"

export const getEscalationSection = (data: IGeneratePrescription, baseSize: number): Content => {
    const { prescription } = data
    const esc = prescription.Escalation

    if (!esc || (!esc.issues?.length && !esc.details)) return ""

    // 1. Build list items for both issues and details
    const listItems: any[] = []

    // Add individual issues
    if (esc.issues && esc.issues.length > 0) {
        esc.issues.forEach((issue: string) => {
            listItems.push({
                text: issue,
                style: "labelBold"
            })
        })
    }

    // Add details as a separate bullet point if it exists
    if (esc.details) {
        listItems.push({
            text: [
                { text: "Details: ", style: "labelBold" },
                { text: esc.details, style: "valueNormal" }
            ]
        })
    }

    // 2. Wrap in a typed object to bypass 'ContentAttachment' errors
    const section: any = {
        marginTop: 15,
        stack: [
            { text: "Escalation", style: "sectionHeader" },
            {
                ul: listItems,
                margin: [0, 5, 0, 0]
            }
        ].filter(Boolean)
    }

    return section as Content
}
