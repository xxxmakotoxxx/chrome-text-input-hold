chrome.storage.local.get('hold_text_list', function(items) {
  if (Object.keys(items).length == 0) {
    chrome.storage.local.set({'hold_text_list': []}, function(items) {});
  }
});
