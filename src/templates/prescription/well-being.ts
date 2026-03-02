import { Content } from "pdfmake/interfaces"
import { IGeneratePrescription } from "../../models/generate-prescription.model"

export const getWellBeingSection = (data: IGeneratePrescription, baseSize: number): Content => {
    const { prescription } = data
    const wb = prescription.WellBeing

    if (!wb || (!wb.questionAndAnswers?.length && !wb.result)) return ""

    // 1. Explicitly type as any[] to bypass strict 'ContentAttachment' checks
    const listItems: any[] = (wb.questionAndAnswers || []).map((qa: any) => {
        return {
            stack: [
                { text: qa.question, style: "labelBold", marginBottom: 2 },
                { text: qa.answer, style: "valueNormal", color: "#374151" }
            ]
        }
    })

    const resultBlock =
        wb.result !== undefined
            ? {
                  marginTop: 10,
                  stack: [
                      {
                          text: "Result",
                          style: "primaryText",
                          decoration: "underline" as any
                      },
                      {
                          text: `ওয়েলবিং ${wb.result < 50 ? "খারাপ" : "ভাল"} (রেজাল্ট ৫০% এর ${wb.result < 50 ? "কম" : "অধিক"})`,
                          style: "subNote",
                          marginTop: 2
                      }
                  ]
              }
            : undefined

    // 2. Wrap the final result in a variable and cast to any before returning as Content
    const section: any = {
        marginTop: 15,
        stack: [
            { text: "Wellbeing Scale Score", style: "sectionHeader" },
            {
                ul: listItems,
                margin: [0, 5, 0, 0]
            },
            resultBlock
        ].filter(Boolean)
    }

    return section as Content
}
