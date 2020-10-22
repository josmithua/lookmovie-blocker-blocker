let toggleChkbox = document.getElementById('toggleBlockerBlocker');

/** This one-liner script does all the work. The blocker can be disabled by simply
 * removing the 'wellcome-boy' class on the body. Pfft, it's not even spelled
 * right 🙄
 */
function toggleBlockerBlocker(enable) {
  chrome.tabs.executeScript({
    code: `document.body.classList.toggle("wellcome-boy", ${!enable})`,
  });
}

/** Will trigger a change to the 'enabled' boolean storage setting... */
toggleChkbox.addEventListener('change', function () {
  chrome.storage.sync.set({ enabled: toggleChkbox.checked });
});

/** ...which will toggle the blocker blocker */
chrome.storage.onChanged.addListener(function (changes, namespace) {
  if ('enabled' in changes) {
    toggleBlockerBlocker(changes.enabled.newValue);
  }
});

// Make sure everything's synced up when the script loads
chrome.storage.sync.get('enabled', function ({ enabled }) {
  toggleChkbox.toggleAttribute('checked', enabled);
  toggleBlockerBlocker(enabled);
});
