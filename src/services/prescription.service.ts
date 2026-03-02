import * as pdfMakeModule from "pdfmake/build/pdfmake"
import * as pdfFontsModule from "pdfmake/build/vfs_fonts"
import { TDocumentDefinitions, TFontDictionary } from "pdfmake/interfaces"
import { IGeneratePrescription } from "../models/generate-prescription.model"
import { buildPrescriptionDefinition } from "../templates/prescription/builder"
import { ASSET_REGISTRY } from "../views/template-registry"

/** * Type-safe casting: We tell TS that our interop object
 * matches the official pdfmake interface.
 */
const pdfMake = ((pdfMakeModule as any).default || pdfMakeModule) as typeof import("pdfmake")

// Clean VFS extraction
const vfs = (pdfFontsModule as any).pdfMake?.vfs || (pdfFontsModule as any).vfs
pdfMake.addVirtualFileSystem(vfs)

export const generatePrescriptionPdf = async (data: IGeneratePrescription) => {
    // 1. Add your custom font strings to the VFS
    // We strip the "data:font/ttf;base64," prefix if it exists
    const anekBase64 = ASSET_REGISTRY["font-anek-bangla"].split(",")[1]

    // This virtually "saves" the file so PDFMake can find it by name
    pdfMake.addVirtualFileSystem({
        ...vfs, // Keep Roboto
        "AnekBangla.ttf": anekBase64
    })

    const docDefinition: TDocumentDefinitions = buildPrescriptionDefinition(data)

    // 2. Map the font names to the VFS files
    const fonts: TFontDictionary = {
        Roboto: {
            normal: "Roboto-Regular.ttf",
            bold: "Roboto-Medium.ttf",
            italics: "Roboto-Italic.ttf",
            bolditalics: "Roboto-MediumItalic.ttf"
        },
        AnekBangla: {
            normal: "AnekBangla.ttf",
            bold: "AnekBangla.ttf", // Use same file if you don't have a separate Bold ttf
            italics: "AnekBangla.ttf",
            bolditalics: "AnekBangla.ttf"
        }
    }

    pdfMake.addFonts(fonts)

    try {
        const docGenerator = pdfMake.createPdf(docDefinition, {})
        return await docGenerator.getBuffer()
    } catch (error) {
        console.error("❌ PDF Generation failed:", error)
        throw error
    }
}
