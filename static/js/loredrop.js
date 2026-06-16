let selectedTheme = "dark_fantasy";

// Theme selector
document.querySelectorAll(".theme-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".theme-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedTheme = btn.dataset.theme;
    });
});

async function generate() {
    const entry = document.getElementById("entryBox").value.trim();
    if (!entry) return;

    document.getElementById("loading").style.display = "block";
    document.getElementById("output").style.display = "none";
    document.getElementById("generateBtn").disabled = true;

    const res = await fetch("/loredrop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entry, theme: selectedTheme })
    });

    const data = await res.json();

    document.getElementById("loading").style.display = "none";
    document.getElementById("generateBtn").disabled = false;

    const output = document.getElementById("output");
    output.style.display = "block";
    output.textContent = data.output;
}