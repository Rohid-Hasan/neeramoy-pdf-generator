import { Column } from "pdfmake/interfaces"

export const BulletPoint: Column = {
    width: 10,
    stack: [
        {
            canvas: [
                {
                    type: "ellipse",
                    x: 5, // center x
                    y: 8, // center y (tweak depending on baseline)
                    r1: 3, // radius X
                    r2: 3, // radius Y (same => circle)
                    color: "#357a7b",
                    fillOpacity: 1
                }
            ]
        }
    ],
    margin: [0, 2, 0, 0]
}
