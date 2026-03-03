import { Content } from "pdfmake/interfaces"
import { IPrescriptionConfig } from "../../models/prescription-config.model"
import { IPrescription } from "../../models/prescription.model"
import { PrescriptionUtil } from "../../utilities/prescription.util"

const util = new PrescriptionUtil()

export const getDoctorClinicSection = (
    data: {
        datetime: string
        prescription: IPrescription
        prescriptionConfig: IPrescriptionConfig
        isPsychologist: boolean
        isBracEmployee: boolean
    },
    baseSize: number
): Content => {
    const pConfig = data.prescriptionConfig
    const { prescription } = data

    // Helper to format strings with proper commas and spaces
    const formatListString = (str: string[] | undefined) => {
        if (!str) return ""
        return str
            .map((s) => s.trim()) // Remove extra whitespace
            .filter((s) => s.length > 0) // Remove empty items
            .join(", ") // Join with comma and space
    }

    const formattedQualifications = formatListString(prescription.Doctor.EducationalQualification)
    const formattedSpecialties = formatListString(prescription.Doctor.Specialties)

    return {
        stack: [
            {
                columns: [
                    // Left Column: Doctor Info
                    {
                        width: "*",
                        stack: [
                            {
                                text: prescription.Doctor.Name,
                                fontSize: baseSize * 1.2,
                                color: "#357a7b",
                                bold: true,
                                font: "Poppins"
                            },
                            {
                                text: formattedQualifications,
                                fontSize: baseSize * 0.85,
                                margin: [0, 0, 0, 2],
                                font: "Poppins"
                            },
                            // Conditionals must return an empty object {} or null if not present
                            prescription.Doctor.Title || prescription.Doctor.Specialties
                                ? {
                                      stack: [
                                          prescription.Doctor.Title
                                              ? {
                                                    text: prescription.Doctor.Title,
                                                    color: "#357a7b",
                                                    bold: true,
                                                    font: "Poppins"
                                                }
                                              : [],
                                          formattedSpecialties
                                              ? {
                                                    text: formattedSpecialties,
                                                    color: "#357a7b",
                                                    bold: true,
                                                    font: "Poppins"
                                                }
                                              : []
                                      ]
                                  }
                                : [],
                            {
                                text: prescription.Doctor.Address,
                                fontSize: baseSize * 0.85,
                                color: "#64748b",
                                font: "Poppins"
                            },
                            prescription.Doctor.BMDC
                                ? {
                                      text: [
                                          { text: "BMDC: ", fontSize: baseSize * 0.85, font: "Poppins" },
                                          { text: prescription.Doctor.BMDC, bold: true, font: "Poppins" }
                                      ],
                                      margin: [0, 5, 0, 0]
                                  }
                                : []
                        ]
                    },
                    // Right Column: Clinic Info & Meta
                    {
                        width: "*",
                        alignment: "right",
                        stack: [
                            pConfig.showClinicInfo && prescription.Clinic
                                ? {
                                      stack: [
                                          {
                                              text: prescription.Clinic.Name || "",
                                              fontSize: baseSize * 1.2,
                                              bold: true,
                                              color: "#357a7b",
                                              font: "Poppins"
                                          },
                                          {
                                              text: prescription.Clinic.Address || "",
                                              fontSize: baseSize * 0.85,
                                              color: "#64748b",
                                              font: "Poppins"
                                          }
                                      ],
                                      marginBottom: 10
                                  }
                                : [],
                            {
                                text: [
                                    { text: "Date: ", fontSize: baseSize * 0.85, font: "Poppins" },
                                    { text: util.getDate(data.datetime), color: "#000000", font: "Poppins" }
                                ]
                            },
                            {
                                text: [
                                    { text: "Time: ", fontSize: baseSize * 0.85, font: "Poppins" },
                                    { text: util.getTime(data.datetime), color: "#000000", font: "Poppins" }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        marginBottom: 10
    }
}
