export function normalizeTranslation(text: string) {
    return text
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\p{Letter}\p{Number}\s]/gu, "")
        .replace(/\s+/g, " ");
}
