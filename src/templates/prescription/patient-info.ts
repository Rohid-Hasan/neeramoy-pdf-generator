import { Content, TableCell } from "pdfmake/interfaces"
import { IGeneratePrescription } from "../../models/generate-prescription.model"
import { PrescriptionUtil } from "../../utilities/prescription.util"

const util = new PrescriptionUtil()

export const getPatientSection = (data: IGeneratePrescription, baseSize: number): Content => {
    const { prescription, prescriptionConfig: pConfig, isPsychologist } = data
    const p = prescription.Patient

    // 1. Create an array of "Grid Cells" based on your EJS logic
    const gridItems: TableCell[] = []

    // Patient/Client Name
    gridItems.push({
        text: [
            { text: isPsychologist ? "Client: " : "Patient: ", style: "label" },
            { text: p.Name, style: "value" }
        ]
    })

    // Age
    if (!pConfig.hideAge) {
        gridItems.push({
            text: [
                { text: "Age: ", style: "label" },
                { text: p.Age || "NA", style: "value" }
            ]
        })
    }

    // Gender
    if (!pConfig.hideGender) {
        gridItems.push({
            text: [
                { text: "Gender: ", style: "label" },
                { text: p.Gender, style: "value" }
            ]
        })
    }

    // Blood Group
    if (!pConfig.hideBloodGroup && p.BloodGroup) {
        gridItems.push({
            text: [
                { text: "BG: ", style: "label" },
                { text: p.BloodGroup, style: "value" }
            ]
        })
    }

    // Patient ID
    gridItems.push({
        text: [
            { text: "ID: ", style: "label" },
            { text: data.prescription.Patient.Id.split("-")[4], style: "value" }
        ]
    })

    // Employee ID
    if (p.EmployeeId) {
        gridItems.push({
            text: [
                { text: "EID: ", style: "label" },
                { text: p.EmployeeId, style: "value" }
            ]
        })
    }

    // Date & Time
    if (pConfig.showDateTime && pConfig.isHeaderBlank) {
        gridItems.push({
            text: [
                { text: "Date: ", style: "label" },
                { text: util.getDate(data.datetime) || "", style: "value" }
            ]
        })
        gridItems.push({
            text: [
                { text: "Time: ", style: "label" },
                { text: util.getTime(data.datetime) || "", style: "value" }
            ]
        })
    }

    // 2. Chunk the items into rows of 4 (Tailwind grid-cols-4)
    const rows: TableCell[][] = []
    for (let i = 0; i < gridItems.length; i += 4) {
        const row = gridItems.slice(i, i + 4)
        // Pad the row with empty objects if it has less than 4 items
        while (row.length < 4) {
            row.push({})
        }
        rows.push(row)
    }

    return {
        marginTop: baseSize * 0.4,
        marginBottom: baseSize * 0.4,
        table: {
            widths: ["*", "*", "*", "*"], // grid-cols-4
            body: rows
        },
        layout: {
            // Equivalent to border-b border-slate-700
            hLineWidth: (i, node) => (i === node.table.body.length - 1 ? 0 : 0.5),
            vLineWidth: () => 0,
            hLineColor: "#cbd5e1", // slate-700
            paddingTop: () => 0,
            paddingBottom: () => 0
        }
    }
}
