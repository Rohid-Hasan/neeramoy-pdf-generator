import { Content } from "pdfmake"
import { DynamicContent } from "pdfmake/interfaces"
import { IGeneratePrescription } from "../../models/generate-prescription.model"
import { ASSET_REGISTRY } from "../../views/template-registry"

export const getFooterSection = (data: IGeneratePrescription, baseSize: number): DynamicContent => {
    return (currentPage: number, pageCount: number): Content => {
        const { prescriptionConfig: pConfig, isBracEmployee } = data
        const SignatureType = { NOTE: "NOTE", URL: "URL", TEXT: "TEXT" }

        let middleSection: Content = { text: "" }

        if (isBracEmployee) {
            middleSection = {
                text: [
                    { text: "Note: ", bold: true },
                    {
                        text: "This is a computer-generated prescription by the doctor. No signature is required. For emergencies, contact us or visit the nearest hospital. BRAC may access this Rx for service and insurance purposes.",
                        italics: true
                    }
                ],
                style: "footerNote"
            }
        } else if (pConfig.signature?.type === SignatureType.NOTE) {
            middleSection = {
                text: [
                    { text: "Note: ", bold: true },
                    {
                        text: "This prescription is generated electronically. No signature is required. Neeramoy acts solely as a platform provider and assumes no responsibility for the treatment.",
                        italics: true
                    }
                ],
                style: "footerNote"
            }
        } else if (pConfig.signature?.type === SignatureType.URL && pConfig.signature?.url) {
            middleSection = {
                image: pConfig.signature.url,
                width: 80,
                alignment: "right",
                marginBottom: 5
            }
        } else if (pConfig.signature?.type === SignatureType.TEXT && pConfig.signature?.text) {
            middleSection = {
                text: pConfig.signature.text,
                style: "signatureText",
                alignment: "right",
                marginBottom: 5
            }
        }

        return {
            margin: [40, 0, 40, 10],
            stack: [
                {
                    columns: [
                        { width: "15%", text: "" },

                        {
                            width: "60%",
                            stack: [middleSection],
                            alignment: "center"
                        },

                        // *** NEW *** Right section with stretch space pushing it to right edge
                        {
                            width: "25%",
                            columns: [
                                { width: "*", text: "" }, // stretchable spacer

                                // Logo
                                {
                                    width: 25,
                                    image: ASSET_REGISTRY["logo-mini.png"],
                                    alignment: "right"
                                },

                                // Spacer
                                { width: 6, text: "" },

                                // Text stack
                                {
                                    width: "*",
                                    stack: [
                                        {
                                            text: "neeramoy",
                                            fontSize: 10,
                                            bold: true,
                                            color: "#303030",
                                            alignment: "right",
                                            font: "Poppins"
                                        },
                                        {
                                            text: "www.neeramoy.com",
                                            fontSize: 5,
                                            color: "#767676",
                                            alignment: "right",
                                            font: "Poppins"
                                        }
                                    ],
                                    alignment: "right"
                                },

                                // Spacer
                                { width: 8, text: "" },

                                // QR
                                {
                                    width: 20,
                                    image: ASSET_REGISTRY["neeramoy-qr.png"],
                                    alignment: "right"
                                }
                            ]
                        }
                    ]
                },

                {
                    text: `Page ${currentPage} of ${pageCount}`,
                    alignment: "center",
                    fontSize: 8,
                    color: "#94a3b8",
                    marginTop: 5
                }
            ]
        }
    }
}
