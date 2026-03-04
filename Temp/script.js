(function () {
  "use strict";

  var legacyScript = document.getElementById("legacy-inline-script");
  if (!legacyScript) {
    console.error("Dashboard bootstrap failed: legacy script block not found.");
    return;
  }

  var source = legacyScript.textContent || "";
  if (!source.trim()) {
    console.error("Dashboard bootstrap failed: legacy script block is empty.");
    return;
  }

  try {
    // Evaluate the existing dashboard logic from the disabled inline block.
    (0, eval)(source);
  } catch (error) {
    console.error("Dashboard bootstrap failed while executing script.js source.", error);
  }
})();
