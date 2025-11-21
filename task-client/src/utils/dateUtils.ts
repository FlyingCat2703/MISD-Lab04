export function formatDate(isoDate: string, includeTime: boolean = false): string {
    if (!isoDate) return "—";
    const date = new Date(isoDate);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    
    if (!includeTime) return `${dd}/${mm}/${yyyy}`;
    
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
}

export function toDateInputValue(dateStr?: string | null): string {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toISOString().split("T")[0];
};