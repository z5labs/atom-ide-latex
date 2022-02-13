const {AutoLanguageClient} = require('atom-languageclient')

class LaTexLanguageClient extends AutoLanguageClient {
  getGrammarScopes () { return [ 'source.tex' ] }
  getLanguageName () { return 'LaTex' }
  getServerName () { return 'LaTex Language Server' }

  startServerProcess (projectPath) {
    this.logger.debug('starting lsp-latex')
    const proc = cp.spawn('lsp-latex', [])
    this.captureServerErrors(proc)
    proc.on('exit', code => {
      if (!proc.killed) {
        atom.notifications.addError('atom-ide-latex: lsp-latex stopped unexpectedly', {
          dismissable: true,
          description: this.processStdErr ? `<code>${this.processStdErr}</code>` : `Exit code ${code}`
        })
      }
    })
    return proc
  }
}

module.exports = new LaTexLanguageClient()
