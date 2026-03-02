import { Content } from "pdfmake/interfaces"
import { IGeneratePrescription } from "../../models/generate-prescription.model"
import { EPrescriptionListStyle } from "../../models/prescription.model"

export const getAdviceSection = (data: IGeneratePrescription, baseSize: number): Content => {
    const { prescription, prescriptionConfig: pConfig } = data
    const advices = prescription.Advices || []

    if (advices.length === 0) return ""

    // Explicit type to avoid the pdfmake 0.3.x 'ContentAttachment' error
    const listItems: any[] = advices.map((item) => {
        return {
            text: item.label,
            style: "valueNormal",
            font: "AnekBangla", // Ensures Bengali rendering for medical advice
            lineHeight: 1.2
        }
    })

    const section: any = {
        marginTop: 15,
        stack: [
            !pConfig.hideAdviceTitle ? { text: pConfig.adviceTitle, style: "sectionHeaderBlack" } : undefined,
            pConfig.adviceListStyle === EPrescriptionListStyle.NUMBER
                ? { ol: listItems, margin: [0, 5, 0, 0] }
                : { ul: listItems, margin: [0, 5, 0, 0] }
        ].filter(Boolean)
    }

    return section as Content
}
