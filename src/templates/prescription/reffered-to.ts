import { Content } from "pdfmake/interfaces"
import { IGeneratePrescription } from "../../models/generate-prescription.model"

export const getReferredToSection = (data: IGeneratePrescription, baseSize: number): Content => {
    const { prescription } = data
    const ref = prescription.RefferedTo

    if (!ref || (!ref.division && !ref.referralType)) return ""

    const listItems: any[] = []

    // 1. Division Line
    if (ref.division) {
        listItems.push({
            text: [
                { text: "Division: ", style: "labelBold" },
                { text: ref.division, style: "valueNormal" }
            ]
        })
    }

    // 2. Referral Type Line
    if (ref.referralType) {
        listItems.push({
            text: [
                { text: "Referral Type: ", style: "labelBold" },
                { text: ref.referralType, style: "valueNormal" }
            ]
        })
    }

    // 3. Return section with casting to bypass 'ContentAttachment' error
    const section: any = {
        marginTop: 15,
        stack: [
            { text: "Referred To", style: "sectionHeaderBlack" },
            {
                ul: listItems,
                margin: [0, 5, 0, 0]
            }
        ].filter(Boolean)
    }

    return section as Content
}
