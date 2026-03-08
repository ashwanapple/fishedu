export type CatalogueEntry = {
    id: string
    name: string
    species: string
    zone: string
    description: string
    image: string
}

const STORAGE_KEY = "sea-catalogue"

export function getCatalogue(): CatalogueEntry[] {
    const raw = localStorage.getItem(STORAGE_KEY)

    if (!raw) return []

    try {
        return JSON.parse(raw) as CatalogueEntry[]
    } catch {
        return []
    }
}

export function addFishToCatalogue(entry: CatalogueEntry): boolean {
    const catalogue = getCatalogue()

    const alreadyExists = catalogue.some((item) => item.id === entry.id)
    if (alreadyExists) return false

    catalogue.push(entry)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(catalogue))
    return true
}