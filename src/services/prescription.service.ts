import * as ejs from "ejs"
import * as fs from "fs"
import Path from "path"
import { IPrescriptionConfig } from "../models/prescription-config.model"
import { IMedicine, IPrescription } from "../models/prescription.model"
import { ModifyMedicineType, PrescriptionUtil } from "../utilities/prescription.util"

export const generatePrescriptionPDF = async (body: {
    datetime: string
    prescription: IPrescription
    prescriptionConfig: IPrescriptionConfig
    isPsychologist: boolean
    isBracEmployee: boolean
}) => {
    const prescription: any = body.prescription
    prescription.MedicineTag?.items?.forEach((el: IMedicine) => {
        if (el.type) {
            el.type = ModifyMedicineType(el.type)
        }
    })

    const util = new PrescriptionUtil()
    for (const med of prescription.MedicineTag.items) {
        med["parseSchedules"] = util.parseSchedules(med.schedules)
        med["fractionalTemplateQuantity"] = util.fractionalTemplate(med.quantity)
        med["fractionalTemplateDoseAmount"] = util.fractionalTemplate(med.doseAmount)
        med["fractionalTemplateSchedule"] = util.fractionalTemplate(med.schedule)
        med["fractionalTemplateDuration"] = util.fractionalTemplate(med.duration)
    }

    prescription.date = util.getDate(body.datetime)
    prescription.time = util.getTime(body.datetime)
    prescription.OnExaminationKeys = util.getKeysOfOnExamination(prescription)
    prescription.OnExaminationEnum = {}
    for (const key of prescription.OnExaminationKeys) {
        prescription.OnExaminationEnum[key] = util.getShortNameOfOnExaminationAttribute(key)
    }

    const PrescriptionItemListStyleEnum = {
        NUMBER: "NUMBER",
        BULLET_POINT: "BULLET_POINT",
        NONE: "NONE"
    }
    const SignatureTypeEnum = {
        URL: "URL",
        TEXT: "TEXT",
        NOTE: "NOTE"
    }
    const pConfig = body.prescriptionConfig
    // pConfig.signature.type = "NOTE" //we are hardcoding the signature type here

    const PrescriptionVersionEnum = {
        V2: "v2-desktop",
        V3: "v3-desktop"
    }

    //modify our code

    const imageData = fs.readFileSync(Path.join(__dirname, "../assets/neeramoy-qr.png"))
    const imageDataTwo = fs.readFileSync(Path.join(__dirname, "../assets/logo-mini.svg"))
    const imageDataThree = fs.readFileSync(Path.join(__dirname, "../assets/bullet-point.svg"))
    // Convert the binary data to a base64-encoded string
    const base64Image = Buffer.from(imageData as any).toString("base64")
    const base64ImageTwo = Buffer.from(imageDataTwo as any).toString("base64")
    const base64ImageThree = Buffer.from(imageDataThree as any).toString("base64")

    return await ejs.renderFile(Path.join(__dirname, "../views/prescription-pdf.ejs"), {
        image: `data:image/png;base64,${base64Image}`,
        imageTwo: `data:image/svg+xml;base64,${base64ImageTwo}`,
        imageThree: `data:image/svg+xml;base64,${base64ImageThree}`,
        isPsychologist: body.isPsychologist,
        prescription: prescription,
        patientShortId: prescription.Patient.Id.split("-")[4],
        pConfig: pConfig,
        isBracEmployee: body.isBracEmployee,
        PILS: PrescriptionItemListStyleEnum,
        SignatureType: SignatureTypeEnum,
        isV2Prescription: prescription.Version == PrescriptionVersionEnum.V2
    })
}
