class Listener {
  constructor(notesService, mailSender) {
    this._notesService = notesService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    const { userId, targetEmail } = JSON.parse(message.content.toString());

    const notes = await this._notesService.findByUserId(userId);
    const result = await this._mailSender.sendEmail(
      targetEmail,
      JSON.stringify(notes)
    );
    console.log(result);
  }
}

module.exports = Listener;
