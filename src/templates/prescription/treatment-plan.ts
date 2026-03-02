import { Content } from "pdfmake/interfaces"
import { IGeneratePrescription } from "../../models/generate-prescription.model"
import { EPrescriptionListStyle } from "../../models/prescription.model"

export const getTreatmentPlanSection = (data: IGeneratePrescription, baseSize: number): Content => {
    const { prescription, prescriptionConfig: pConfig } = data
    const plans = prescription.TreatmentPlans || []

    if (plans.length === 0) return ""

    // Cast as any[] to avoid the pdfmake 0.3.x 'ContentAttachment' type error
    const listItems: any[] = plans.map((item) => {
        const mainLineText: any[] = [{ text: item.label, style: "valueNormal" }]

        if (item.for) {
            mainLineText.push({
                text: ` (for ${item.for} ${item.period})`,
                style: "italicNote"
            })
        }

        const itemStack: any[] = [
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

    const section: any = {
        marginTop: 15,
        stack: [
            !pConfig.hideTreatmentPlanTitle
                ? { text: pConfig.treatmentPlanTitle, style: "sectionHeaderBlack" }
                : undefined,
            pConfig.treatmentPlanListStyle === EPrescriptionListStyle.NUMBER
                ? { ol: listItems, margin: [0, 5, 0, 0] }
                : { ul: listItems, margin: [0, 5, 0, 0] }
        ].filter(Boolean)
    }

    return section as Content
}
