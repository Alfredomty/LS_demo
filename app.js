function getTomorrowDateStr(){
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const date = String(tomorrow.getDate()).padStart(2, '0');

    return `${year}-${month}-${date}`;
}
    
function createShowCard(item){
    const show = item.show || {};
    const title = item.name || 'Untitled';
    
}





