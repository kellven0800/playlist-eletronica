// Elementos principais
const addTrackForm = document.getElementById('addTrackForm');
const playlistContainer = document.getElementById('playlistContainer');

let playlist = {};

// Playlist representativa de vários estilos eletrônicos com músicas públicas
const predefinedTracks = {
  "Trance": [
    { name: "Trance Vibes", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { name: "Dreamscape", url: "https://archive.org/download/TranceDreamscape/TranceDreamscape.mp3" }
  ],
  "Techno": [
    { name: "Techno Pulse", url: "https://archive.org/download/TechnoPulse/TechnoPulse.mp3" },
    { name: "Future Beat", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" }
  ],
  "House": [
    { name: "Deep House Grooves", url: "https://archive.org/download/DeepHouseGrooves/DeepHouseGrooves.mp3" },
    { name: "Funky House", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
  ],
  "Drum & Bass": [
    { name: "DNB Rush", url: "https://archive.org/download/DrumAndBassRush/DrumAndBassRush.mp3" },
    { name: "Jungle Beat", url: "https://archive.org/download/JungleBeat/JungleBeat.mp3" }
  ],
  "Dubstep": [
    { name: "Dubstep Drop", url: "https://archive.org/download/DubstepDrop/DubstepDrop.mp3" },
    { name: "Wobble Bass", url: "https://archive.org/download/WobbleBass/WobbleBass.mp3" }
  ],
  "Lo-Fi": [
    { name: "Lo-Fi Beats", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { name: "Chillhop", url: "https://archive.org/download/ChillhopVibes/ChillhopVibes.mp3" },
    { name: "I'm a Pickle (Rick and Morty)", url: "https://archive.org/download/rick-and-morty-pickle-rick/Rick%20and%20Morty%20-%20Pickle%20Rick.mp3" }
  ],
  "Progressive Chill": [
    { name: "Progressive Chill", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
    { name: "Sunset Drive", url: "https://archive.org/download/SunsetDrive/SunsetDrive.mp3" }
  ],
  "Chillout": [
    { name: "Ambient Waves", url: "https://archive.org/download/AmbientWaves/AmbientWaves.mp3" },
    { name: "Relaxing Sound", url: "https://archive.org/download/RelaxingSound/RelaxingSound.mp3" }
  ],
  "Outros": []
};

// Cria container para categoria se não existir, e retorna o ul para lista
function createCategorySection(category) {
  const section = document.createElement('section');
  section.className = 'category-section';
  section.id = `category-${category}`;

  const title = document.createElement('h2');
  title.textContent = category;
  section.appendChild(title);

  const ul = document.createElement('ul');
  ul.className = 'playlist';
  section.appendChild(ul);

  playlistContainer.appendChild(section);

  return ul;
}

// Adiciona faixa à categoria na lista
function addTrackToCategory(category, track) {
  if (!playlist[category]) {
    playlist[category] = createCategorySection(category);
  }

  const ul = playlist[category];

  const li = document.createElement('li');
  li.className = 'track';

  const strong = document.createElement('strong');
  strong.textContent = track.name;
  li.appendChild(strong);

  const audio = document.createElement('audio');
  audio.controls = true;
  audio.src = track.url;
  audio.preload = 'none';
  li.appendChild(audio);

  ul.appendChild(li);
}

// Inicializa a playlist com faixas predefinidas
function initPlaylist() {
  playlistContainer.innerHTML = '';
  playlist = {};

  // Criar seções para todas as categorias primeiro (mesmo vazias)
  for (const category in predefinedTracks) {
    playlist[category] = createCategorySection(category);
  }

  // Agora adiciona as músicas em suas seções
  for (const category in predefinedTracks) {
    predefinedTracks[category].forEach(track => {
      addTrackToCategory(category, track);
    });
  }
}

// Lê arquivo local para adicionar na playlist
function readLocalFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      resolve({
        name: file.name,
        url: e.target.result
      });
    };

    reader.onerror = () => reject("Erro ao ler arquivo");

    reader.readAsDataURL(file);
  });
}

// Manipula o envio do form (upload da música)
addTrackForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const fileInput = document.getElementById('trackFile');
  const categorySelect = document.getElementById('categorySelect');

  if (fileInput.files.length === 0) {
    alert("Escolha um arquivo de música.");
    return;
  }

  if (!categorySelect.value) {
    alert("Escolha uma categoria.");
    return;
  }

  const file = fileInput.files[0];
  const category = categorySelect.value;

  try {
    const track = await readLocalFile(file);
    addTrackToCategory(category, track);
    fileInput.value = '';
    categorySelect.value = '';
  } catch (err) {
    alert(err);
  }
});

// Inicializa playlist na carga da página
window.addEventListener('load', initPlaylist);
