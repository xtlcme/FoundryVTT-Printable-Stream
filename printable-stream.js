class PrintableStreamModule {
  static onRenderChatLog(chatLog, html, data) {
    let printTitle = window.game.i18n.localize("printable-stream.print-button");
    let button = $(`<a class="printable-stream" title=${printTitle}><i class="fas fa-print"></i></a> \
      `);
    button.on('click', (event) => PrintableStreamModule.onPrintButtonClicked())
    let element = html.find(".flexrow .control-buttons");
    element.prepend(button);
  }

  static onPrintButtonClicked() {
    if (navigator.userAgent.toLowerCase().indexOf(" electron/") !== -1) {
      let errorMessage = window.game.i18n.localize("printable-stream.electron-error-message");
      return ui.notifications.warn(errorMessage);
    }

    window.location.href = '/stream';
  }
}

Hooks.on('init', () => {
  const url = window.location.pathname;
  if (/\/stream/.test(url))
  {
    CONFIG.ChatMessage.batchSize = Number.MAX_SAFE_INTEGER;
  }
});
Hooks.on('renderChatLog', PrintableStreamModule.onRenderChatLog);