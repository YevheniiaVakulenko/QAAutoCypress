export function formatDate(date){
    return date.toLocaleDateString("en-GB").replace(/\//g, ".");
}

export function formatAPIDate(date){
    return date.toISOString().split('T')[0];
}