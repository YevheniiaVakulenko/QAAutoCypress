export function formatDate(date){
    return date.toLocaleDateString("en-GB").replace(/\//g, ".");
}