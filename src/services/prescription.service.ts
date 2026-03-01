import * as ejs from "ejs"
import { IPrescriptionConfig } from "../models/prescription-config.model"
import { IMedicine, IPrescription } from "../models/prescription.model"
import { ModifyMedicineType, PrescriptionUtil } from "../utilities/prescription.util"
import { ASSET_REGISTRY, TEMPLATE_REGISTRY } from "../views/template-registry"

export const generatePrescriptionPDF = async (body: {
    datetime: string
    prescription: IPrescription
    prescriptionConfig: IPrescriptionConfig
    isPsychologist: boolean
    isBracEmployee: boolean
}) => {
    const prescription: any = body.prescription

    // 1. Medicine & Schedule Transformation
    prescription.MedicineTag?.items?.forEach((el: IMedicine) => {
        if (el.type) {
            el.type = ModifyMedicineType(el.type)
        }
    })

    const util = new PrescriptionUtil()
    for (const med of prescription.MedicineTag?.items || []) {
        med["parseSchedules"] = util.parseSchedules(med.schedules)
        med["fractionalTemplateQuantity"] = util.fractionalTemplate(med.quantity)
        med["fractionalTemplateDoseAmount"] = util.fractionalTemplate(med.doseAmount)
        med["fractionalTemplateSchedule"] = util.fractionalTemplate(med.schedule)
        med["fractionalTemplateDuration"] = util.fractionalTemplate(med.duration)
    }

    // 2. Examination & Metadata
    prescription.date = util.getDate(body.datetime)
    prescription.time = util.getTime(body.datetime)
    prescription.OnExaminationKeys = util.getKeysOfOnExamination(prescription)
    prescription.OnExaminationEnum = {}
    for (const key of prescription.OnExaminationKeys) {
        prescription.OnExaminationEnum[key] = util.getShortNameOfOnExaminationAttribute(key)
    }

    // 3. Enums & Config
    const PrescriptionItemListStyleEnum = { NUMBER: "NUMBER", BULLET_POINT: "BULLET_POINT", NONE: "NONE" }
    const SignatureTypeEnum = { URL: "URL", TEXT: "TEXT", NOTE: "NOTE" }
    const PrescriptionVersionEnum = { V2: "v2-desktop", V3: "v3-desktop" }

    const pConfig = body.prescriptionConfig
    // Default Base Font Size if not provided
    if (!pConfig.baseFontSize) {
        pConfig.baseFontSize = 12
    }

    const mainTemplate = TEMPLATE_REGISTRY["prescription-pdf.ejs"]

    const options = {
        client: false,
        includer: (originalPath: string) => {
            const cleanName = originalPath.replace(/^\.\//, "").replace(/\.ejs$/, "") + ".ejs"
            const template = TEMPLATE_REGISTRY[cleanName]
            if (!template) {
                console.warn(`⚠️ EJS Includer: [${cleanName}] not found in registry.`)
                return { template: "" }
            }
            return { template }
        }
    }

    // 4. Render HTML String
    return ejs.render(
        mainTemplate,
        {
            ...body,
            image: ASSET_REGISTRY["neeramoy-qr.png"],
            imageTwo: ASSET_REGISTRY["logo-mini.svg"],
            imageThree: ASSET_REGISTRY["bullet-point.svg"],
            prescription: prescription,
            patientShortId: prescription.Patient?.Id?.split("-")[4] || "N/A",
            pConfig: pConfig, // Injected into EJS for margin/font-size logic
            PILS: PrescriptionItemListStyleEnum,
            SignatureType: SignatureTypeEnum,
            isV2Prescription: prescription.Version === PrescriptionVersionEnum.V2
        },
        options
    )
}
