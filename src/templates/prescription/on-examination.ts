import { Content } from "pdfmake/interfaces"
import { IGeneratePrescription } from "../../models/generate-prescription.model"
import { EPrescriptionListStyle } from "../../models/prescription.model"
import { PrescriptionUtil } from "../../utilities/prescription.util"

const util = new PrescriptionUtil()

export const getOnExaminationSection = (data: IGeneratePrescription, baseSize: number): Content => {
    const { prescription, prescriptionConfig: pConfig } = data
    const oe: any = prescription.OnExamination
    const keys = util.getKeysOfOnExamination(data.prescription)
    const enumMap: any = {}
    for (const key of keys) {
        enumMap[key] = util.getShortNameOfOnExaminationAttribute(key)
    }

    if (!oe || (keys.length === 0 && (!oe.extraFields || oe.extraFields.length === 0))) return ""

    const listItems: any[] = []

    // 1. Process Main Keys
    keys.forEach((key) => {
        let label = ""
        let value = ""
        let specialNote = oe[key]?.specialNote ? ` (${oe[key].specialNote})` : ""

        if (key === "bmi") {
            label = "BMI"
            value = oe[key]?.bmi || ""
        } else if (key === "pregnancyCalendar") {
            label = "Pregnancy"
            value = oe.pregnancyCalendar?.currently || ""
        } else if (key === "temperature" || key === "pulse") {
            label = enumMap[key] || key
            value = `${oe[key]?.value || ""} ${oe[key]?.type || ""}`
        } else if (
            [
                "hypertension",
                "heartDisease",
                "kidneyDisease",
                "asthma",
                "hyperlipidemia",
                "backPain",
                "cancer",
                "diabetesMellitus",
                "lactating",
                "pregnancy",
                "liverDisease"
            ].includes(key)
        ) {
            label = enumMap[key] || key
            value = oe[key]?.isActive ? "Yes" : "No"
        } else if (key === "extraNote") {
            label = "Special Note"
            value = oe.extraNote || ""
            specialNote = "" // Already handled in value
        }

        if (label) {
            listItems.push({
                text: [
                    { text: `${label}: `, style: "labelBold" },
                    { text: value, style: "valueNormal" },
                    { text: specialNote, style: "italicNote" }
                ]
            })
        }
    })

    // 2. Process Extra Fields
    if (oe.extraFields && oe.extraFields.length > 0) {
        oe.extraFields.forEach((field: any) => {
            listItems.push({
                text: [
                    { text: `${field.fieldName}: `, style: "labelBold" },
                    { text: field.fieldValue, style: "valueNormal" }
                ]
            })
        })
    }

    return {
        marginTop: baseSize * 0.6,
        stack: [
            !pConfig.hideOnExaminationTitle
                ? { text: pConfig.onExaminationTitle, style: "sectionHeaderBlack" }
                : "",
            pConfig.onExaminationListStyle === EPrescriptionListStyle.NUMBER
                ? { ol: listItems, margin: [0, 5, 0, 0] }
                : { ul: listItems, margin: [0, 5, 0, 0] }
        ]
    }
}
