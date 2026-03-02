import { Content } from "pdfmake/interfaces"
import { IGeneratePrescription } from "../../models/generate-prescription.model"
import { EPrescriptionListStyle } from "../../models/prescription.model"

export const getFindingsSection = (data: IGeneratePrescription, baseSize: number): Content => {
    const { prescription, prescriptionConfig: pConfig } = data
    const findings = prescription.Findings || []

    if (findings.length === 0) return ""

    const listItems = findings.map((item, i) => {
        // Prepare the Main Label row
        const mainLine = { text: item.label, style: "valueNormal" }

        // Handle the Note with the "Query:" prefix logic
        let noteContent: any = null
        if (item.note) {
            noteContent = {
                text: [item.query ? { text: "Query: ", bold: true } : "", { text: item.note }],
                style: "subNote",
                marginLeft: baseSize * 0.4,
                marginTop: baseSize * 0.15,
                preserveLeadingSpaces: true // Equivalent to whitespace-pre-line
            }
        }

        return {
            stack: [mainLine, noteContent].filter(Boolean)
        }
    })

    return {
        marginTop: baseSize * 0.6,
        stack: [
            !pConfig.hideFindingsTitle ? { text: pConfig.findingsTitle, style: "sectionHeaderBlack" } : "",
            pConfig.findingsListStyle === EPrescriptionListStyle.NUMBER
                ? { ol: listItems, margin: [0, baseSize * 0.4, 0, 0] }
                : { ul: listItems, margin: [0, baseSize * 0.4, 0, 0] }
        ]
    }
}
