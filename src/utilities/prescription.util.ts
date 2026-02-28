import { parse, format } from "date-fns";

export interface OnExaminationItem {
    fullName: string;
    shortName?: string;
    modelAttributeName: string;
}

export const OnExaminationEnum: OnExaminationItem[] = [
    { fullName: "BMI", shortName: "BMI", modelAttributeName: "bmi" },
    {
        fullName: "Pregnancy Calendar and Due Date Calculator",
        modelAttributeName: "pregnancyCalendar"
    },
    { fullName: "Pulse", modelAttributeName: "pulse" },
    { fullName: "Temperature", modelAttributeName: "temperature" },
    {
        fullName: "Hypertension (HTN)",
        shortName: "HTN",
        modelAttributeName: "hypertension"
    },
    {
        fullName: "Diabetes Mellitus (DM)",
        shortName: "DM",
        modelAttributeName: "diabetesMellitus"
    },
    {
        fullName: "Kidney Disease (KD)",
        shortName: "KD",
        modelAttributeName: "kidneyDisease"
    },
    {
        fullName: "Heart Disease",
        shortName: "HD",
        modelAttributeName: "heartDisease"
    },
    {
        fullName: "Liver Disease",
        shortName: "LD",
        modelAttributeName: "liverDisease"
    },
    { fullName: "Asthma", modelAttributeName: "asthma" },
    { fullName: "Back-pain", modelAttributeName: "backPain" },
    { fullName: "Hyperlipidemia", modelAttributeName: "hyperlipidemia" },
    { fullName: "Cancer", modelAttributeName: "cancer" },
    { fullName: "Special Note", modelAttributeName: "extraNote" },
    { fullName: "Lactating", modelAttributeName: "lactating" },
    { fullName: "Pregnancy", modelAttributeName: "pregnancy" }
];

export class PrescriptionUtil {
    private fractionMap: Map<number, string>;
    // The format string matching your input: "YYYY-MM-DD-HH-mm-ss-SSS"
    private readonly DATE_FORMAT_STR: string = "yyyy-MM-dd-HH-mm-ss-SSS";

    constructor() {
        this.fractionMap = new Map([
            [0, "০"], // Fixed: mapping 0 to Bangla zero
            [1, "১"],
            [2, "২"],
            [3, "৩"],
            [4, "৪"],
            [5, "৫"],
            [6, "৬"],
            [7, "৭"],
            [8, "৮"],
            [9, "৯"]
        ]);
    }

    getFraction = (decimal: number): { numerator: number; denominator: number } => {
        let denominator = 1;
        for (denominator; (decimal * denominator) % 1 !== 0; denominator++);
        return { numerator: decimal * denominator, denominator: denominator };
    };

    fractionalTemplate(value: number | string | undefined): string {
        if (!value) return "";
        let before = "";
        let after = "";
        const arr = value.toString().split(".");

        if (arr[0] !== "0" && !!arr[0]) {
            before = this.toBangla(arr[0]);
        }

        if (!!arr[1]) {
            const fraction = this.getFraction(parseFloat(`0.${arr[1]}`));
            after = `<sup>${this.toBangla(
                fraction.numerator.toString()
            )}</sup>/<sub>${this.toBangla(
                fraction.denominator.toString()
            )}</sub>`;
        }
        return "<span>" + before + after + "</span>";
    }

    toBangla(str: string): string {
        return str
            .split("")
            .map((s) => this.fractionMap.get(+s) || s)
            .join("");
    }

    parseSchedules(schedules: string | undefined): string {
        if (!schedules || !schedules.trim()) return "";
        try {
            const values = schedules.split("+").map((s) => {
                const trimmed = s.trim();
                if (parseFloat(trimmed) === 0) return "০";
                else return this.fractionalTemplate(parseFloat(trimmed));
            });
            return values.join(" + ");
        } catch (e) {
            return schedules;
        }
    }

    getTime(dateTime: string): string {
        const dateObj = parse(dateTime, this.DATE_FORMAT_STR, new Date());
        // 'p' is the date-fns locale-aware time format (e.g., 12:00 PM)
        return format(dateObj, "p");
    }

    getDate(dateTime: string): string {
        const dateObj = parse(dateTime, this.DATE_FORMAT_STR, new Date());
        // 'd MMM, yyyy' matches your previous format (e.g., 26 Jan, 2026)
        return format(dateObj, "d MMM, yyyy");
    }

    getKeysOfOnExamination(prescription: any): string[] {
        if (prescription?.OnExamination) {
            const arr: string[] = [];
            const keys = Object.keys(prescription.OnExamination);

            for (const key of keys) {
                if (prescription.OnExamination[key] && key !== "extraFields") {
                    let pushFlag = false;
                    const nestedKeys = Object.keys(prescription.OnExamination[key]);

                    for (const nestedKey of nestedKeys) {
                        const val = prescription.OnExamination[key][nestedKey];
                        if (val !== null && val !== undefined) {
                            pushFlag = true;
                            break; // Optimization: stop looking if we found a value
                        }
                    }
                    if (pushFlag) {
                        arr.push(key);
                    }
                }
            }
            return arr;
        }
        return [];
    }

    getShortNameOfOnExaminationAttribute(modelAttributeName: string): string {
        const item = OnExaminationEnum.find(
            (el) => el.modelAttributeName === modelAttributeName
        );
        return item ? (item.shortName || item.fullName) : "";
    }
}

export const ModifyMedicineType = (type: string): string => {
    const value = type.toLowerCase();
    const mappings: Record<string, string> = {
        "tablet": "Tab",
        "capsule": "Cap",
        "syrup": "Syr",
        "injection": "Inj",
        "solution": "Sol",
        "gel": "Gel",
        "cream": "Cream",
        "ointment": "Oint",
        "drops": "Drops",
        "suspension": "Susp",
        "sustained release": "SR",
        "slow release": "SR",
        "topical": "Top",
        "suppository": "Supp"
    };

    for (const key in mappings) {
        if (value.includes(key)) return mappings[key];
    }

    return value;
};