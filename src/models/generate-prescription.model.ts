import { IPrescriptionConfig } from "./prescription-config.model"
import { IPrescription } from "./prescription.model"

export interface IGeneratePrescription {
    datetime: string
    prescription: IPrescription
    prescriptionConfig: IPrescriptionConfig
    isPsychologist: boolean
    isBracEmployee: boolean
}
