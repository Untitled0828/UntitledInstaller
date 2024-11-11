document.getElementById("addMod").addEventListener("click", addModEntry);
document.getElementById("addDependency").addEventListener("click", addDependencyEntry);

document.getElementById("modpackForm").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const modpack = {
    type: "modpack",
    name: document.getElementById("name").value,
    author: document.getElementById("author").value,
    Description: document.getElementById("description").value,
    ModList: {},
    Dependencies: {}
  };

  // 모드 리스트 가져오기
  const modEntries = document.querySelectorAll(".mod-entry");
  modEntries.forEach(entry => {
    const modName = entry.querySelector(".mod-name").value;
    const modUrl = entry.querySelector(".mod-url").value;
    modpack.ModList[modName] = modUrl;

    // 종속성 가져오기
    const depEntries = entry.querySelectorAll(".dependency-entry");
    depEntries.forEach(dep => {
      const depName = dep.querySelector(".dep-name").value;
      const depUrl = dep.querySelector(".dep-url").value;
      modpack.Dependencies[depName] = depUrl;
    });
  });

  // 생성된 JSON 출력
  document.getElementById("jsonOutput").textContent = JSON.stringify(modpack, null, 2);
});

function addModEntry() {
  const modList = document.getElementById("modList");
  const modEntry = document.createElement("div");
  modEntry.classList.add("mod-entry");

  modEntry.innerHTML = `
    <input type="text" class="mod-name" placeholder="모드 이름" required>
    <input type="text" class="mod-url" placeholder="모드 URL" required>
    <button type="button" class="remove-mod">제거</button>
    <div class="dependency-entry">
      <input type="text" class="dep-name" placeholder="종속성 이름" required>
      <input type="text" class="dep-url" placeholder="종속성 URL" required>
      <button type="button" class="remove-dependency">제거</button>
    </div>
  `;
  
  modEntry.querySelector(".remove-mod").addEventListener("click", () => modEntry.remove());
  modEntry.querySelector(".remove-dependency").addEventListener("click", () => modEntry.querySelector(".dependency-entry").remove());
  modList.appendChild(modEntry);
}

function addDependencyEntry() {
  const dependencyEntry = document.createElement("div");
  dependencyEntry.classList.add("dependency-entry");

  dependencyEntry.innerHTML = `
    <input type="text" class="dep-name" placeholder="종속성 이름" required>
    <input type="text" class="dep-url" placeholder="종속성 URL" required>
    <button type="button" class="remove-dependency">제거</button>
  `;

  dependencyEntry.querySelector(".remove-dependency").addEventListener("click", () => dependencyEntry.remove());
  document.getElementById("dependencies").appendChild(dependencyEntry);
}
