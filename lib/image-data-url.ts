"use client"

const DEFAULT_MAX_DIMENSION = 1400
const DEFAULT_QUALITY = 0.82
const DEFAULT_MAX_DATA_URL_LENGTH = 1_400_000

type ToDataUrlOptions = {
  maxDimension?: number
  quality?: number
  maxDataUrlLength?: number
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error("No se pudo leer el archivo."))
    reader.onload = () => resolve(String(reader.result ?? ""))
    reader.readAsDataURL(file)
  })
}

function loadImage(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onerror = () => reject(new Error("No se pudo procesar la imagen."))
    img.onload = () => resolve(img)
    img.src = dataUrl
  })
}

export async function fileToCompressedDataUrl(file: File, options: ToDataUrlOptions = {}): Promise<string> {
  const maxDimension = options.maxDimension ?? DEFAULT_MAX_DIMENSION
  const quality = options.quality ?? DEFAULT_QUALITY
  const maxDataUrlLength = options.maxDataUrlLength ?? DEFAULT_MAX_DATA_URL_LENGTH

  const original = await readAsDataUrl(file)
  const image = await loadImage(original)

  const longestSide = Math.max(image.width, image.height)
  const scale = longestSide > maxDimension ? maxDimension / longestSide : 1
  const width = Math.max(1, Math.round(image.width * scale))
  const height = Math.max(1, Math.round(image.height * scale))

  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height

  const context = canvas.getContext("2d")
  if (!context) {
    throw new Error("No se pudo inicializar el procesador de imagen.")
  }

  context.drawImage(image, 0, 0, width, height)
  const result = canvas.toDataURL("image/webp", quality)

  if (result.length > maxDataUrlLength) {
    throw new Error("La imagen es demasiado pesada. Usa una foto mas liviana.")
  }

  return result
}
