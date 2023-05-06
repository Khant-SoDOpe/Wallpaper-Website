fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const wallpaperGroups = document.querySelector('.wallpaper-groups');
    const searchInput = document.querySelector('#search-input');
    
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase().trim();
      const filteredData = data.filter(group => group.title.toLowerCase().includes(searchTerm));
      renderWallpapers(filteredData);
    });
    
    function renderWallpapers(data) {
      wallpaperGroups.innerHTML = '';
      
      data.forEach(group => {
        const groupDiv = document.createElement('div');
        groupDiv.classList.add('wallpaper-group');
        
        const groupTitle = document.createElement('h2');
        groupTitle.textContent = group.title;
        groupDiv.appendChild(groupTitle);
        
        const wallpaperList = document.createElement('ul');
        wallpaperList.classList.add('wallpaper-list');
        
        group.wallpapers.forEach(wallpaper => {
          const wallpaperItem = document.createElement('li');
          wallpaperItem.classList.add('wallpaper-item');
          
          const wallpaperImg = document.createElement('img');
          wallpaperImg.src = wallpaper.image;
          wallpaperImg.alt = wallpaper.title;
          wallpaperItem.appendChild(wallpaperImg);
          
          const wallpaperTitle = document.createElement('span');
          wallpaperTitle.textContent = wallpaper.title;
          wallpaperItem.appendChild(wallpaperTitle);
          
          const wallpaperDownload = document.createElement('a');
          wallpaperDownload.textContent = 'Download';
          wallpaperDownload.href = wallpaper.download;
          wallpaperDownload.download = wallpaper.title;
          wallpaperItem.appendChild(wallpaperDownload);
          
          wallpaperList.appendChild(wallpaperItem);
        });
        
        groupDiv.appendChild(wallpaperList);
        wallpaperGroups.appendChild(groupDiv);
      });
    }
    
    renderWallpapers(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });