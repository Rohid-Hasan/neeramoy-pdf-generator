import { Content } from "pdfmake"
import { DynamicContent } from "pdfmake/interfaces"
import { IGeneratePrescription } from "../../models/generate-prescription.model"
import { ASSET_REGISTRY } from "../../views/template-registry"

export const getFooterSection = (data: IGeneratePrescription, baseSize: number): DynamicContent => {
    return (currentPage: number, pageCount: number): Content => {
        const { prescriptionConfig: pConfig, isBracEmployee } = data
        const leftDistance = (pConfig.margin?.left || 1) * 28.35
        const rightDistance = (pConfig.margin?.right || 1) * 28.35
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
            // [left, top, right, bottom]
            // We apply the page's left/right margin so it aligns with the content
            margin: [leftDistance, 0, rightDistance, 0],
            stack: [
                {
                    columns: [
                        { width: "15%", text: "" },
                        {
                            width: "60%", // Slightly reduced to give right side more room
                            stack: [middleSection],
                            alignment: "center"
                        },
                        {
                            width: "25%",
                            columns: [
                                { width: "*", text: "" },
                                {
                                    width: 25,
                                    image: ASSET_REGISTRY["logo-mini.png"],
                                    alignment: "right"
                                },
                                { width: 6, text: "" },
                                {
                                    width: "auto",
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
                                    ]
                                },
                                { width: 8, text: "" },
                                {
                                    width: 20,
                                    image: ASSET_REGISTRY["neeramoy-qr.png"],
                                    alignment: "right"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
}
