const fs = require("fs")
const path = require("path")

const viewsDir = path.join(__dirname, "../src/views")
const assetsDir = path.join(__dirname, "../src/assets")
const outputFile = path.join(__dirname, "../src/views/template-registry.ts")

function getAssets() {
    const assetData = {}

    // 1. Regular Images
    const images = ["neeramoy-qr.png", "logo-mini.png"]
    images.forEach((asset) => {
        const filePath = path.join(assetsDir, asset)
        if (fs.existsSync(filePath)) {
            const prefix = "data:image/png;base64,"
            assetData[asset] =
                prefix + fs.readFileSync(filePath).toString("base64")
        }
    })

    // 2. Fonts
    const fontsToLoad = [
        { key: "poppins-regular", path: "fonts/Poppins/Poppins-Regular.ttf" },
        { key: "poppins-bold", path: "fonts/Poppins/Poppins-Bold.ttf" },
        { key: "poppins-italic", path: "fonts/Poppins/Poppins-Italic.ttf" },
        {
            key: "font-noto-sans-bengali",
            path: "fonts/Noto_Sans_Bengali/NotoSansBengali-VariableFont_wdth,wght.ttf"
        }
    ]

    fontsToLoad.forEach((font) => {
        const filePath = path.join(assetsDir, font.path)
        if (fs.existsSync(filePath)) {
            assetData[font.key] =
                "data:font/ttf;base64," +
                fs.readFileSync(filePath).toString("base64")
        } else {
            console.warn(`⚠️ Font file not found at: ${filePath}`)
        }
    })

    return assetData
}

const assets = getAssets()

const tsContent = `
export const TEMPLATE_REGISTRY: Record<string, string> = ${JSON.stringify(templates, null, 2)};
export const ASSET_REGISTRY: Record<string, string> = ${JSON.stringify(assets, null, 2)};
`

fs.writeFileSync(outputFile, tsContent)
console.log("✅ Template and Asset registry generated!")
