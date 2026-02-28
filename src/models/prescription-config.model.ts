import {
    MedicineNameTypeEnum,
    PrescriptionItemListStyleEnum,
    PrescriptionVersionEnum,
    SignatureTypeEnum
} from "../enums/prescription.enum"

export class IPrescriptionConfig {
    isHeaderBlank: boolean = false
    headerHeight: number
    showClinicInfo: boolean

    hideAge: boolean = false
    hideGender: boolean = false
    hideBloodGroup: boolean = false
    showDateTime: boolean = false
    showTime: boolean = false

    hideComplaintTitle: boolean = false
    hideHistoryTitle: boolean = false
    hideFindingsTitle: boolean = false
    hideInvestigationTitle: boolean = false
    hideMedicineTitle: boolean = false
    hideAdviceTitle: boolean = false
    hideFollowupTitle: boolean = false
    hideTreatmentPlanTitle: boolean = false
    hideDiagnosisTitle: boolean = false
    hideOnExaminationTitle: boolean = false

    complaintTitle: string
    historyTitle: string
    findingsTitle: string
    investigationTitle: string
    medicineTitle: string
    adviceTitle: string
    followupTitle: string
    treatmentPlanTitle: string
    diagnosisTitle: string
    onExaminationTitle: string

    complaintListStyle: string
    historyListStyle: string
    findingsListStyle: string
    investigationListStyle: string
    medicineListStyle: string
    adviceListStyle: string
    followupListStyle: string
    treatmentPlanListStyle: string
    diagnosisListStyle: string
    onExaminationListStyle: string

    medicineNameType: string

    signature: Signature

    prescriptionSendType: string[]

    version: string

    baseFontSize: number
    margin: { top: number; bottom: number; left: number; right: number }

    constructor() {
        this.headerHeight = 200
        this.showClinicInfo = true

        this.complaintTitle = "Chief Complaints"
        this.historyTitle = "History"
        this.findingsTitle = "Findings"
        this.investigationTitle = "Investigation"
        this.medicineTitle = "Medicine (Rx)"
        this.adviceTitle = "Advice"

        this.followupTitle = "Follow up"
        this.treatmentPlanTitle = "Treatment Plan"
        this.diagnosisTitle = "Diagnosis"
        this.onExaminationTitle = "On Examination"

        this.complaintListStyle = PrescriptionItemListStyleEnum.BULLET_POINT
        this.historyListStyle = PrescriptionItemListStyleEnum.BULLET_POINT
        this.findingsListStyle = PrescriptionItemListStyleEnum.NUMBER
        this.investigationListStyle = PrescriptionItemListStyleEnum.BULLET_POINT
        this.medicineListStyle = PrescriptionItemListStyleEnum.NUMBER
        this.adviceListStyle = PrescriptionItemListStyleEnum.NUMBER
        this.followupListStyle = PrescriptionItemListStyleEnum.BULLET_POINT
        this.treatmentPlanListStyle = PrescriptionItemListStyleEnum.NUMBER
        this.diagnosisListStyle = PrescriptionItemListStyleEnum.BULLET_POINT
        this.onExaminationListStyle = PrescriptionItemListStyleEnum.BULLET_POINT

        this.medicineNameType = MedicineNameTypeEnum.MEDICINE
        this.version = PrescriptionVersionEnum.V2
        this.signature = new Signature()
        this.prescriptionSendType = []

        this.baseFontSize = 12
        this.margin = { top: 1, bottom: 1, left: 1, right: 1 }
    }

    static prepare(pConfig: IPrescriptionConfig) {
        if (!pConfig.complaintTitle) pConfig.complaintTitle = "Chief Complaints"
        if (!pConfig.historyTitle) pConfig.historyTitle = "History"
        if (!pConfig.onExaminationTitle) pConfig.onExaminationTitle = "On Examination"
        if (!pConfig.findingsTitle) pConfig.findingsTitle = "Findings"
        if (!pConfig.investigationTitle) pConfig.investigationTitle = "Investigation"
        if (!pConfig.medicineTitle) pConfig.medicineTitle = "Medicine (Rx)"
        if (!pConfig.adviceTitle) pConfig.adviceTitle = "Advice"
        if (!pConfig.followupTitle) pConfig.followupTitle = "Follow up"
        if (!pConfig.treatmentPlanTitle) pConfig.treatmentPlanTitle = "Treatment Plan"
        if (!pConfig.diagnosisTitle) pConfig.diagnosisTitle = "Diagnosis"

        if (!pConfig.complaintListStyle)
            pConfig.complaintListStyle = PrescriptionItemListStyleEnum.BULLET_POINT

        if (!pConfig.historyListStyle) pConfig.historyListStyle = PrescriptionItemListStyleEnum.BULLET_POINT

        if (!pConfig.findingsListStyle) pConfig.findingsListStyle = PrescriptionItemListStyleEnum.BULLET_POINT

        if (!pConfig.investigationListStyle)
            pConfig.investigationListStyle = PrescriptionItemListStyleEnum.BULLET_POINT

        if (!pConfig.medicineListStyle) pConfig.medicineListStyle = PrescriptionItemListStyleEnum.NUMBER

        if (!pConfig.adviceListStyle) pConfig.adviceListStyle = PrescriptionItemListStyleEnum.NUMBER

        if (!pConfig.followupListStyle) pConfig.followupListStyle = PrescriptionItemListStyleEnum.BULLET_POINT

        if (!pConfig.treatmentPlanListStyle)
            pConfig.treatmentPlanListStyle = PrescriptionItemListStyleEnum.NUMBER

        if (!pConfig.diagnosisListStyle)
            pConfig.diagnosisListStyle = PrescriptionItemListStyleEnum.BULLET_POINT

        if (!pConfig.onExaminationListStyle)
            pConfig.onExaminationListStyle = PrescriptionItemListStyleEnum.BULLET_POINT

        if (!pConfig.medicineNameType) pConfig.medicineNameType = MedicineNameTypeEnum.MEDICINE

        if (pConfig.signature == null) pConfig.signature = new Signature()

        if (!pConfig.prescriptionSendType) pConfig.prescriptionSendType = []

        if (!pConfig.version) pConfig.version = PrescriptionVersionEnum.V2

        if (!pConfig.baseFontSize) pConfig.baseFontSize = 12

        if (!pConfig.margin) pConfig.margin = { top: 1, bottom: 1, left: 1, right: 1 }

        return pConfig
    }
}

export class Signature {
    type: string
    url: string | undefined
    text: string | undefined
    note: string

    constructor() {
        this.type = SignatureTypeEnum.URL
        this.note = "This is a computer-generated Prescription by doctor. No signature is required."
    }
}
