import * as pdfMakeModule from "pdfmake/build/pdfmake"
import * as pdfFontsModule from "pdfmake/build/vfs_fonts"
import { BufferOptions, TDocumentDefinitions, TFontDictionary } from "pdfmake/interfaces"

/** * Type-safe casting: We tell TS that our interop object
 * matches the official pdfmake interface.
 */
const pdfMake = ((pdfMakeModule as any).default || pdfMakeModule) as typeof import("pdfmake")

// Clean VFS extraction
const vfs = (pdfFontsModule as any).pdfMake?.vfs || (pdfFontsModule as any).vfs
pdfMake.addVirtualFileSystem(vfs)

export const generateUniversalPdf = async () => {
    console.log("🛠️  Generating Type-Safe PDF...")

    // Now you get autocomplete for content, styles, etc.
    const docDefinition: TDocumentDefinitions = {
        content: [
            { text: "Hello World", fontSize: 25, bold: true, color: "#357a7b" },
            { text: "Type-safe Neeramoy PDF Engine", marginTop: 10 }
        ],
        defaultStyle: {
            font: "Roboto"
        }
    }

    /**
     * Correct 0.3.5 Font Handling
     * If createPdf doesn't take 3 args in your version's types,
     * use addFonts() or setFonts() before creating the PDF.
     */
    const fonts: TFontDictionary = {
        Roboto: {
            normal: "Roboto-Regular.ttf",
            bold: "Roboto-Medium.ttf",
            italics: "Roboto-Italic.ttf",
            bolditalics: "Roboto-MediumItalic.ttf"
        }
    }

    // Register fonts globally to the instance so createPdf knows them
    pdfMake.addFonts(fonts)

    try {
        // Now you get suggestions for the 2nd argument (BufferOptions)
        const options: BufferOptions = {}
        const docGenerator = pdfMake.createPdf(docDefinition, options)

        const buffer = await docGenerator.getBuffer()
        return buffer
    } catch (error) {
        console.error("❌ PDF Generation failed:", error)
        throw error
    }
}
