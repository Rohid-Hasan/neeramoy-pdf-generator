import { Content } from "pdfmake/interfaces"
import { IGeneratePrescription } from "../../models/generate-prescription.model"
import { ASSET_REGISTRY } from "../../views/template-registry"

export const getPatientAreaSection = (data: IGeneratePrescription, baseSize: number): Content => {
    const area = data.prescription.PatientArea

    // Check if we should render at all (Matching your EJS logic)
    if (!area || (!area.division && !area.details)) {
        return ""
    }

    const items = [
        { key: "Division", value: area.division },
        { key: "District", value: area.district },
        { key: "Upazila", value: area.upazila },
        { key: "Details", value: area.details }
    ]

    // Build the list of rows (EJS flex-col gap-2.5)
    const areaRows: Content[] = items
        .filter((item) => item.value) // Only show existing data
        .map((item) => ({
            columns: [
                {
                    // The Icon (imageThree)
                    image: ASSET_REGISTRY["imageThree"], // Ensure this is base64 in your registry
                    width: 8,
                    marginTop: 4 // Aligns icon with text line
                },
                {
                    // The Text (Key: Value)
                    width: "*",
                    text: [
                        { text: `${item.key}: `, style: "labelBold" },
                        { text: item.value as string, style: "valueNormal" }
                    ],
                    marginLeft: 8
                }
            ],
            marginBottom: 6 // Equivalent to gap-2.5
        }))

    return {
        marginTop: 15,
        stack: [{ text: "Client Area", style: "sectionHeader" }, ...areaRows]
    }
}
