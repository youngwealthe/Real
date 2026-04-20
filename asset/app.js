const params = new URLSearchParams(window.location.search);
const isPublicView = params.get('view') === 'public';
const sharedData = params.get('data');

function loadData() {
  if (isPublicView && sharedData) {
    try {
      const decoded = JSON.parse(atob(sharedData));
      if (decoded.bio) {
        document.getElementById('bioText').textContent = decoded.bio;
      }
    } catch(e) {}
  }
  if (isPublicView) disableEditing();
}

function disableEditing() {
  const bioControls = document.getElementById('bioControls');
  if (bioControls) bioControls.style.display = 'none';
}

function generateShareLink() {
  const data = {
    bio: localStorage.getItem('bio')
  };
  const encoded = btoa(JSON.stringify(data));
  const url = `${window.location.origin}?view=public&data=${encoded}`;
  navigator.clipboard.writeText(url);
  alert("Share link copied!");
}

function exportData() {
  const data = {
    bio: localStorage.getItem('bio')
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "bovisync-data.json";
  a.click();
}

document.querySelectorAll('.nav-item[data-page]').forEach(item => {
  item.onclick = () => {
    const page = item.dataset.page;
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    item.classList.add('active');
    document.getElementById(page).classList.add('active');
  };
});

loadData();
