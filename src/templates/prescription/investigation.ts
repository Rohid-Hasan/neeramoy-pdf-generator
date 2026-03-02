import { Content } from "pdfmake/interfaces"
import { IGeneratePrescription } from "../../models/generate-prescription.model"
import { EPrescriptionListStyle } from "../../models/prescription.model"

export const getInvestigationSection = (data: IGeneratePrescription, baseSize: number): Content => {
    const { prescription, prescriptionConfig: pConfig } = data
    const investigations = prescription.Investigations || []

    if (investigations.length === 0) return ""

    // Explicitly type this as any[] to satisfy the OrderedList interface
    const listItems: any[] = investigations.map((item) => {
        const mainLineText: any[] = [{ text: item.label, style: "valueNormal" }]

        if (item.instruction) {
            mainLineText.push({
                text: ` (${item.instruction})`,
                style: "italicNote"
            })
        }

        const itemStack: any[] = [{ text: mainLineText }]

        if (item.result) {
            itemStack.push({
                text: [{ text: "Result: ", bold: true }, { text: item.result }],
                style: "subNote",
                marginLeft: 5,
                marginTop: 2
            })
        }

        return { stack: itemStack }
    })

    // Use a clean Content object return
    const sectionContent: any = {
        marginTop: 15,
        stack: [
            !pConfig.hideInvestigationTitle
                ? { text: pConfig.investigationTitle, style: "sectionHeaderBlack" }
                : undefined,
            pConfig.investigationListStyle === EPrescriptionListStyle.NUMBER
                ? { ol: listItems, margin: [0, 5, 0, 0] }
                : { ul: listItems, margin: [0, 5, 0, 0] }
        ].filter(Boolean)
    }

    return sectionContent as Content
}
