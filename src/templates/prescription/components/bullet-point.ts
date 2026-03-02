import { Column } from "pdfmake/interfaces"

/**
 * Reusable Bullet Point component
 * Mimics: w-1.5 h-1.5 rounded-full bg-primary
 */
export const BulletPoint: Column = {
    width: 12,
    marginTop: 5,
    canvas: [
        {
            type: "rect",
            x: 0,
            y: 0,
            w: 4,
            h: 4,
            r: 2, // Perfect circle
            color: "#357a7b" // Neeramoy Primary
        }
    ]
}
