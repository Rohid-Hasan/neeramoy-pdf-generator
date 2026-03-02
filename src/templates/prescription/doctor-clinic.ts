import { Content } from "pdfmake/interfaces"
import { IPrescriptionConfig } from "../../models/prescription-config.model"
import { IPrescription } from "../../models/prescription.model"

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

    return {
        stack: [
            {
                columnGap: 10,
                columns: [
                    // Left Column: Doctor Info
                    {
                        width: "*",
                        stack: [
                            {
                                text: prescription.Doctor.Name,
                                fontSize: baseSize * 1.2,
                                color: "#357a7b",
                                bold: true
                            },
                            {
                                text: prescription.Doctor.EducationalQualification,
                                fontSize: baseSize * 0.85,
                                margin: [0, 2, 0, 0]
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
                                                    marginTop: 5
                                                }
                                              : [],
                                          prescription.Doctor.Specialties
                                              ? {
                                                    text: prescription.Doctor.Specialties,
                                                    color: "#357a7b",
                                                    bold: true
                                                }
                                              : []
                                      ]
                                  }
                                : [],
                            {
                                text: prescription.Doctor.Address,
                                fontSize: baseSize * 0.85,
                                margin: [0, 5, 0, 0],
                                color: "#64748b"
                            },
                            prescription.Doctor.BMDC
                                ? {
                                      text: [
                                          { text: "BMDC: ", fontSize: baseSize * 0.85 },
                                          { text: prescription.Doctor.BMDC, bold: true }
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
                                              color: "#357a7b"
                                          },
                                          {
                                              text: prescription.Clinic.Address || "",
                                              fontSize: baseSize * 0.85,
                                              color: "#64748b"
                                          }
                                      ],
                                      marginBottom: 10
                                  }
                                : [],
                            {
                                text: [
                                    { text: "Date: ", fontSize: baseSize * 0.85 },
                                    { text: prescription.datetime, color: "#000000" }
                                ]
                            },
                            {
                                text: [
                                    { text: "Time: ", fontSize: baseSize * 0.85 },
                                    { text: prescription.datetime, color: "#000000" }
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
