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
    // Helper to strip prefix
    const getRawBase64 = (key: string) => ASSET_REGISTRY[key]?.split(",")[1]

    const anekBase = getRawBase64("font-anek-bangla")
    const popReg = getRawBase64("poppins-regular")
    const popBold = getRawBase64("poppins-bold")
    const popItalic = getRawBase64("poppins-italic")
    const notoSansBengali = getRawBase64("font-noto-sans-bengali")

    // 1. Add to Virtual File System
    pdfMake.addVirtualFileSystem({
        ...vfs,
        "AnekBangla.ttf": anekBase,
        "Poppins-Regular.ttf": popReg,
        "Poppins-Bold.ttf": popBold,
        "Poppins-Italic.ttf": popItalic,
        "NotoSansBengali.ttf": notoSansBengali
    })

    // 2. Map the font names
    const fonts: TFontDictionary = {
        Roboto: {
            normal: "Roboto-Regular.ttf",
            bold: "Roboto-Medium.ttf",
            italics: "Roboto-Italic.ttf",
            bolditalics: "Roboto-MediumItalic.ttf"
        },
        AnekBangla: {
            normal: "AnekBangla.ttf",
            bold: "AnekBangla.ttf",
            italics: "AnekBangla.ttf",
            bolditalics: "AnekBangla.ttf"
        },
        Poppins: {
            normal: "Poppins-Regular.ttf",
            bold: "Poppins-Bold.ttf",
            italics: "Poppins-Italic.ttf",
            bolditalics: "Poppins-Bold.ttf" // Fallback to bold if BoldItalic is missing
        },
        NotoSansBengali: {
            normal: "NotoSansBengali.ttf",
            bold: "NotoSansBengali.ttf",
            italics: "NotoSansBengali.ttf",
            bolditalics: "NotoSansBengali.ttf"
        }
    }

    pdfMake.addFonts(fonts)

    try {
        const docDefinition: TDocumentDefinitions = buildPrescriptionDefinition(data)
        const docGenerator = pdfMake.createPdf(docDefinition, {})
        return await docGenerator.getBuffer()
    } catch (error) {
        console.error("❌ PDF Generation failed:", error)
        throw error
    }
}
