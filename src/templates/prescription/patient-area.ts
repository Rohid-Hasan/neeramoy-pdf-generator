import { Content } from "pdfmake/interfaces"
import { IGeneratePrescription } from "../../models/generate-prescription.model"

export const getPatientAreaSection = (data: IGeneratePrescription, baseSize: number): Content => {
    const area = data.prescription.PatientArea

    // 1. Strict null check to prevent empty containers from adding margin
    if (!area || (!area.division && !area.district && !area.upazila && !area.details)) {
        return ""
    }

    // 2. Map existing data to list items
    const items = [
        { key: "Division", value: area.division },
        { key: "District", value: area.district },
        { key: "Upazila", value: area.upazila },
        { key: "Details", value: area.details }
    ].filter((item) => item.value)

    const listItems: any[] = items.map((item) => {
        return {
            text: [
                { text: `${item.key}: `, style: "labelBold" },
                { text: item.value as string, style: "valueNormal" }
            ]
        }
    })

    // 3. Return the section (Matching the structure of your other modules)
    const section: Content = {
        marginTop: baseSize * 0.6,
        stack: [
            { text: "Client Area", style: "sectionHeader" },
            {
                ul: listItems,
                margin: [0, baseSize * 0.4, 0, 0]
            }
        ]
    }

    return section
}
