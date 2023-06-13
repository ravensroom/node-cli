class Command {
  constructor(instance) {
    if (!instance) {
      throw new Error('Command instance must not be null!');
    }
    this.program = instance;
    const command = this.program.command(this.command);

    command.description(this.description);

    command.hook('preAction', this.preAction);
    command.hook('postAction', this.postAction);

    if (this.options?.length > 0) {
      this.options.forEach((option) => {
        command.option(...option);
      });
    }

    command.action((...params) => this.action(params));
  }

  get command() {
    throw new Error('Command must be implemented');
  }

  get description() {
    throw new Error('Description must be implemented');
  }

  get options() {
    return [];
  }

  action() {
    throw new Error('Action must be implemented');
  }

  preAction() {}

  postAction() {}
}

module.exports = Command;
