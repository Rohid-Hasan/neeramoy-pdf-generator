import { Content } from "pdfmake/interfaces"
import { IGeneratePrescription } from "../../models/generate-prescription.model"
import { EPrescriptionListStyle } from "../../models/prescription.model"
import { BulletPoint } from "./components/bullet-point" // Import here

export const getChiefComplaintSection = (data: IGeneratePrescription, baseSize: number): Content => {
    const { prescription, prescriptionConfig: pConfig } = data
    const complaints = prescription.Complaints || []

    if (complaints.length === 0) return ""

    const complaintItems: Content[] = complaints.map((item, i) => {
        const mainLineText: any[] = [{ text: item.label, style: "valueNormal" }]

        if (item.for) {
            mainLineText.push({
                text: ` (for ${item.for} ${item.period})`,
                style: "italicNote"
            })
        }

        const rowContent: Content =
            pConfig.complaintListStyle === EPrescriptionListStyle.NUMBER
                ? {
                      columns: [
                          { text: `${i + 1}.`, width: 15, style: "valueNormal" },
                          { text: mainLineText, width: "*" }
                      ]
                  }
                : {
                      columns: [
                          BulletPoint, // Use the shared component
                          {
                              text: mainLineText,
                              width: "*",
                              marginLeft: 2
                          }
                      ]
                  }

        return {
            stack: [
                rowContent,
                item.note
                    ? {
                          text: item.note,
                          style: "subNote",
                          marginLeft: 14,
                          marginTop: 2
                      }
                    : ""
            ],
            marginBottom: 8
        }
    })

    return {
        marginTop: 15,
        stack: [
            !pConfig.hideComplaintTitle
                ? {
                      text: pConfig.complaintTitle,
                      style: "sectionHeaderBlack"
                  }
                : "",
            { stack: complaintItems }
        ]
    }
}
