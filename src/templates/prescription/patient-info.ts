import { Content, TableCell } from "pdfmake/interfaces"
import { IGeneratePrescription } from "../../models/generate-prescription.model"

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
            { text: "Patient_SHORT_ID", style: "value" }
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
    if (pConfig.showDateTime) {
        gridItems.push({
            text: [
                { text: "Date: ", style: "label" },
                { text: prescription.datetime || "", style: "value" }
            ]
        })
        gridItems.push({
            text: [
                { text: "Time: ", style: "label" },
                { text: prescription.datetime || "", style: "value" }
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
        marginTop: 10,
        marginBottom: 10,
        table: {
            widths: ["*", "*", "*", "*"], // grid-cols-4
            body: rows
        },
        layout: {
            // Equivalent to border-b border-slate-700
            hLineWidth: (i, node) => (i === node.table.body.length ? 1 : 0),
            vLineWidth: () => 0,
            hLineColor: "#334155", // slate-700
            paddingTop: () => 5,
            paddingBottom: () => 5
        }
    }
}
