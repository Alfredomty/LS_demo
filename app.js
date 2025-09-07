function getTomorrowDateStr(){
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const date = String(tomorrow.getDate()).padStart(2, '0');

    console.log(`${year}-${month}-${date}`);
    return `${year}-${month}-${date}`;
}
    
function createShowCard(item){
    const show = item.show || {};
    const title = item.name || 'Untitled';
    const time = item.airtime || item.airdate || '—';
    const network = (show.network && show.network.name)
        || (show.webChannel && show.webChannel.name) || '—';
    const img = (show.image && (show.image.medium || show.image.original)) ||
        (item.image && (item.image.medium || item.image.original)) ||
        'https://placehold.co/400x400?text=No\n Image'
    
    const card = document.createElement('article');
    card.className = 'sch-card';
    card.dataset.time = time;
    card.dataset.network = network
    card.innerHTML = `
        <img class="thumbnail" src="${img}" alt="Poster for ${title}" 
        width="600" height="900"/>
        `;
    return card;
}

$(function(){
    const dateStr = getTomorrowDateStr();
    const $row = $('.schedule_scroller');

    $.ajax({
        url: `https://api.tvmaze.com/schedule`,
        method: 'GET',
        data: { country: 'US', date: dateStr },
        dataType: 'json'
    }).done(function(data){
        const list = Array.isArray(data)? data.slice(0,24) : [];
        if(list.length === 0){
          const empty = $('<div/>').css({padding:'8px', color:'#d7c7de'}).text('No schedule items available.');
          $row.append(empty);
          return;
        }
        list.forEach(item => $row.append(createShowCard(item)));
    }).fail(function(xhr,status){
        const err = $('<div/>').css({padding:'8px', color:'#d7c7de'}).text('Failed to load schedule. Please try again later.');
        $row.append(err);
        console.error('TVmaze schedule error:', status, xhr?.status, xhr?.responseText);
    });
});






