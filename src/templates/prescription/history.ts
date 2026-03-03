import { Content } from "pdfmake"
import { IGeneratePrescription } from "../../models/generate-prescription.model"
import { EPrescriptionListStyle } from "../../models/prescription.model"

export const getHistorySection = (data: IGeneratePrescription, baseSize: number): Content => {
    const { prescription, prescriptionConfig: pConfig } = data
    const histories = prescription.Histories || []

    if (histories.length === 0) return ""

    const listItems = histories.map((item, i) => {
        const mainLineText: any[] = [{ text: item.label, style: "valueNormal" }]

        if (item.for) {
            mainLineText.push({
                text: ` (for ${item.for} ${item.period})`,
                style: "italicNote"
            })
        }

        const itemStack: any = [
            { text: mainLineText },
            item.note ? { text: item.note, style: "subNote", margin: [0, 2, 0, 0] } : undefined
        ].filter(Boolean)

        return { stack: itemStack }
    })

    return {
        marginTop: baseSize * 0.6,
        stack: [
            !pConfig.hideHistoryTitle ? { text: pConfig.historyTitle, style: "sectionHeaderBlack" } : "",
            pConfig.historyListStyle === EPrescriptionListStyle.NUMBER ? { ol: listItems } : { ul: listItems }
        ]
    }
}
