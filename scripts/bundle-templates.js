const fs = require("fs")
const path = require("path")

const viewsDir = path.join(__dirname, "../src/views")
const assetsDir = path.join(__dirname, "../src/assets")
const outputFile = path.join(__dirname, "../src/views/template-registry.ts")

function getFiles(dir, allFiles = {}) {
    const files = fs.readdirSync(dir)
    files.forEach((file) => {
        const name = path.join(dir, file)
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, allFiles)
        } else if (file.endsWith(".ejs")) {
            const relativePath = path
                .relative(viewsDir, name)
                .replace(/\\/g, "/")
            allFiles[relativePath] = fs.readFileSync(name, "utf8")
        }
    })
    return allFiles
}

// Convert images to Base64 at build time
function getAssets() {
    const assets = ["neeramoy-qr.png", "logo-mini.svg", "bullet-point.svg"]
    const assetData = {}
    assets.forEach((asset) => {
        const filePath = path.join(assetsDir, asset)
        if (fs.existsSync(filePath)) {
            const ext = path.extname(asset).substring(1)
            const prefix =
                ext === "svg"
                    ? "data:image/svg+xml;base64,"
                    : "data:image/png;base64,"
            assetData[asset] =
                prefix + fs.readFileSync(filePath).toString("base64")
        }
    })
    return assetData
}

const templates = getFiles(viewsDir)
const assets = getAssets()

const tsContent = `
export const TEMPLATE_REGISTRY: Record<string, string> = ${JSON.stringify(templates, null, 2)};
  export const ASSET_REGISTRY: Record<string, string> = ${JSON.stringify(assets, null, 2)};
    `

fs.writeFileSync(outputFile, tsContent)
console.log("✅ Template and Asset registry generated!")
