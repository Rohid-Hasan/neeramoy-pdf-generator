export interface IPrescription {
    Clinic: PClinic
    Doctor: PDoctor
    Patient: PPatient
    Advices: CommonTag[]
    Escalation: IEscalation
    RefferedTo: IPrescriptionRefferedTo
    Complaints: CommonTag[]
    Histories: CommonTag[]
    OnExamination: OnExaminationModel
    Findings: FindingTag[]
    Diagnosis: CommonTag[]
    TreatmentPlans: CommonTag[]
    FollowupTag: FollowupTag
    Investigations: InvestigationTag[]
    MedicineTag: MedicineTag
    Version: string
    datetime: string //this is needed when I need to fetch the
    createdAt: Date
    PatientArea: IPatientArea
    WellBeing: IWellBeing
    DistressLevels: IDistressLevel
    id?: string //firebase id
    isDoctorPrescription?: boolean //this will not be pressent in prevous data //will be true for doctor prescription
}

interface IPatientArea {
    district: string
    division: string
    details: string | null
    upazila: string
}

interface IWellBeing {
    questionAndAnswers: { question: string; answer: string }[]
    result: number
}

interface IDistressLevel {
    start: number
    end: number
}
interface PClinic {
    Id: string
    Name: string
    Address: string
}

interface PDoctor {
    Id: string
    Name: string
    Specialties: string[]
    EducationalQualification: string[]
    Title: string
    Address: string
    Email: string
    Phone: string
    BMDC: string
}

export interface PPatient {
    Id: string
    Name: string
    Age: string
    Address: string
    Gender: string
    BloodGroup: string
    EmployeeId?: string
    Phone: string
}

interface CommonTag {
    label: string
    for: number
    period: string
    note: string
}

interface IEscalation {
    issues: string[]
    details: string | null
}

interface IPrescriptionRefferedTo {
    division?: string
    referralType?: "Govt organisation" | "Pvt organisation" | "Govt & pvt both"
    email?: string
}

interface OnExaminationModel {
    bmi?: {
        age: string
        gender: string
        height: string
        weight: string
        bmi: string
        specialNote: string
    }
    pregnancyCalendar?: {
        calculateBasedOn: string
        lastMenstrualPeriod: Date
        cycleLength: string
        currently: string
        dueDate: Date
        specialNote: string
    }
    pulse?: { type: "PM"; value: string; specialNote: string }
    temperature?: { type: "C" | "F"; value: string; specialNote: string }
    hypertension?: YesNoModel
    heartDisease?: YesNoModel
    liverDisease?: YesNoModel
    kidneyDisease?: YesNoModel
    asthma?: YesNoModel
    backPain?: YesNoModel
    hyperlipidemia?: YesNoModel
    lactating?: YesNoModel
    pregnancy?: YesNoModel
    cancer?: YesNoModel
    diabetesMellitus?: YesNoModel
    extraNote?: string
    extraFields?: { fieldName: string; fieldValue: string }[]
}

interface YesNoModel {
    isActive: boolean
    specialNote?: string
}

interface FindingTag {
    label: string
    query: boolean
    note: string
}

interface FollowupTag {
    date: string
    duration: number
    unit: string
    items: string[]
}

interface InvestigationTag {
    label: string
    instruction: string
    result: string
}

interface MedicineTag {
    continuePrevious: boolean
    items: IMedicine[]
}

export interface IMedicine {
    drug: string
    type: string
    generic: string
    doseAmount: number
    doseType: string
    duration: number
    durationType: string
    continuousDuration: boolean
    schedule: number // for v2
    scheduleType: string // for v2
    schedules: string // for v3
    quantity: number
    quantityType: string
    remark: string
    note: string
}
