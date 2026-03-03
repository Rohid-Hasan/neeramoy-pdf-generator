import { Content } from "pdfmake/interfaces"
import { IGeneratePrescription } from "../../models/generate-prescription.model"
import { EPrescriptionListStyle } from "../../models/prescription.model"

export const getFollowupSection = (data: IGeneratePrescription, baseSize: number): Content => {
    const { prescription, prescriptionConfig: pConfig } = data
    const followup = prescription.FollowupTag

    if (!followup || (!followup.date && (!followup.items || followup.items.length === 0))) return ""

    // 1. Prepare the list of instructions
    const listItems: any[] = (followup.items || []).map((item: string) => {
        return {
            text: item,
            style: "valueNormal",
            lineHeight: 1.2
        }
    })

    const section: any = {
        marginTop: baseSize * 0.6,
        stack: [
            // Section Title (e.g., "Follow-up")
            !pConfig.hideFollowupTitle
                ? { text: pConfig.followupTitle, style: "sectionHeaderBlack" }
                : undefined,

            // Follow-up Date (e.g., "25 March 2026")
            followup.date
                ? {
                      text: followup.date,
                      style: "labelBold",
                      marginTop: 5,
                      marginBottom: 5
                  }
                : undefined,

            // List of instructions
            pConfig.followupListStyle === EPrescriptionListStyle.NUMBER
                ? { ol: listItems, margin: [0, 2, 0, 0] }
                : { ul: listItems, margin: [0, 2, 0, 0] }
        ].filter(Boolean)
    }

    return section as Content
}
