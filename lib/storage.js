const fs = require("fs").promises
const path = require("path")
const sharp = require("sharp")

class StorageService {
  constructor() {
    this.uploadsPath = process.env.UPLOADS_PATH || path.join(process.cwd(), "data", "uploads")
    this.contractsPath = process.env.CONTRACTS_PATH || path.join(process.cwd(), "data", "contracts")
    this.receiptsPath = process.env.RECEIPTS_PATH || path.join(process.cwd(), "data", "receipts")

    this.initDirectories()
  }

  async initDirectories() {
    const dirs = [this.uploadsPath, this.contractsPath, this.receiptsPath]

    for (const dir of dirs) {
      try {
        await fs.mkdir(dir, { recursive: true })
      } catch (error) {
        console.error(`Failed to create directory ${dir}:`, error)
      }
    }
  }

  async saveFile(buffer, filename, type = "upload") {
    let targetPath

    switch (type) {
      case "contract":
        targetPath = this.contractsPath
        break
      case "receipt":
        targetPath = this.receiptsPath
        break
      default:
        targetPath = this.uploadsPath
    }

    const filePath = path.join(targetPath, filename)
    await fs.writeFile(filePath, buffer)

    return filePath
  }

  async saveImage(buffer, filename, options = {}) {
    const { width = 1200, height = 800, quality = 80 } = options

    // Process image with Sharp
    const processedBuffer = await sharp(buffer)
      .resize(width, height, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality })
      .toBuffer()

    const filePath = path.join(this.uploadsPath, filename)
    await fs.writeFile(filePath, processedBuffer)

    // Create thumbnail
    const thumbnailBuffer = await sharp(buffer).resize(300, 200, { fit: "cover" }).jpeg({ quality: 70 }).toBuffer()

    const thumbnailPath = path.join(this.uploadsPath, `thumb_${filename}`)
    await fs.writeFile(thumbnailPath, thumbnailBuffer)

    return { filePath, thumbnailPath }
  }

  async deleteFile(filePath) {
    try {
      await fs.unlink(filePath)
      return true
    } catch (error) {
      console.error("Failed to delete file:", error)
      return false
    }
  }

  async getFile(filePath) {
    try {
      return await fs.readFile(filePath)
    } catch (error) {
      console.error("Failed to read file:", error)
      return null
    }
  }

  getPublicUrl(filePath) {
    // Return relative path for serving files
    const relativePath = path.relative(process.cwd(), filePath)
    return `/${relativePath.replace(/\\/g, "/")}`
  }
}

module.exports = new StorageService()
