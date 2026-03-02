import { Content } from "pdfmake/interfaces"
import { IGeneratePrescription } from "../../models/generate-prescription.model"

export const getDistressLevelsSection = (data: IGeneratePrescription, baseSize: number): Content => {
    const { prescription } = data
    const dl = prescription.DistressLevels

    // Matching your EJS logic: check if object exists and has either start or end (including 0)
    const hasStart = dl?.start !== undefined && dl?.start !== null
    const hasEnd = dl?.end !== undefined && dl?.end !== null

    if (!dl || (!hasStart && !hasEnd)) return ""

    const listItems: any[] = []

    if (hasStart) {
        listItems.push({
            text: [
                { text: "Start: ", style: "labelBold" },
                { text: dl.start.toString(), style: "valueNormal" }
            ]
        })
    }

    if (hasEnd) {
        listItems.push({
            text: [
                { text: "End: ", style: "labelBold" },
                { text: dl.end.toString(), style: "valueNormal" }
            ]
        })
    }

    return {
        marginTop: 15,
        stack: [
            { text: "Distress Level", style: "sectionHeader" },
            {
                ul: listItems,
                margin: [0, 5, 0, 0]
            }
        ]
    }
}
