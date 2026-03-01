import * as ejs from "ejs"
import { IPrescriptionConfig } from "../models/prescription-config.model"
import { IPrescription } from "../models/prescription.model"
import { PrescriptionUtil } from "../utilities/prescription.util"
import { ASSET_REGISTRY, TEMPLATE_REGISTRY } from "../views/template-registry"

export const generatePrescriptionPDF = async (body: {
    datetime: string
    prescription: IPrescription
    prescriptionConfig: IPrescriptionConfig
    isPsychologist: boolean
    isBracEmployee: boolean
}) => {
    const prescription: any = body.prescription

    // ... (Keep your existing data transformation logic here) ...
    const util = new PrescriptionUtil()
    // (Prescription data processing stays exactly the same)

    const PrescriptionItemListStyleEnum = { NUMBER: "NUMBER", BULLET_POINT: "BULLET_POINT", NONE: "NONE" }
    const SignatureTypeEnum = { URL: "URL", TEXT: "TEXT", NOTE: "NOTE" }
    const PrescriptionVersionEnum = { V2: "v2-desktop", V3: "v3-desktop" }

    const mainTemplate = TEMPLATE_REGISTRY["prescription-pdf.ejs"]

    const options = {
        client: false,
        filename: "prescription-pdf.ejs", // Helps EJS track depth
        // The 'includer' is the key to bypassing the filesystem
        includer: (originalPath: string) => {
            // Normalize path: './prescription-pdf/doctor-clinic.ejs' -> 'prescription-pdf/doctor-clinic.ejs'
            const cleanName = originalPath.replace(/^\.\//, "").replace(/\.ejs$/, "") + ".ejs"

            const template = TEMPLATE_REGISTRY[cleanName]

            if (!template) {
                console.error(`❌ EJS Includer: Could not find [${cleanName}] in TEMPLATE_REGISTRY`)
                return { template: "" }
            }

            return { template }
        }
    }

    return ejs.render(
        mainTemplate,
        {
            ...body,
            // Images are now pre-converted strings from our registry
            image: ASSET_REGISTRY["neeramoy-qr.png"],
            imageTwo: ASSET_REGISTRY["logo-mini.svg"],
            imageThree: ASSET_REGISTRY["bullet-point.svg"],
            isPsychologist: body.isPsychologist,
            prescription: prescription,
            patientShortId: prescription.Patient.Id.split("-")[4],
            pConfig: body.prescriptionConfig,
            isBracEmployee: body.isBracEmployee,
            PILS: PrescriptionItemListStyleEnum,
            SignatureType: SignatureTypeEnum,
            isV2Prescription: prescription.Version === PrescriptionVersionEnum.V2
        },
        options
    )
}
