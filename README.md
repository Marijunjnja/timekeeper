Master build status: ![TravisCI Build Status](https://travis-ci.org/revelrylabs/timekeeper.svg?branch=master)

# Timekeeper

A set of slash commands for integrating 10k Plans with Slack.

## Installation

```Shell
bundle install
npm install
bundle exec rake db:create db:migrate
```

## Configuration

There's a sample config file at `.env.sample`. Copy it to `.env` and fill in
your own API keys.

You will want to set up a custom slack slash command for it. When your app
is hosted with a public url, configure it like this:

1. The command can be anything you want, but we use `10k`
2. Your URL will be http://host-of-your-timekeeper/slack_slash_commands
3. Method should be POST
4. You will be given a token once you save that goes in your .env file and the
   environment variables on your host.
5. You can customize the display name, help message, icon, etc of your command.

## Usage

To start the server, do:

```
foreman start
```

Typically, you will want to host it somewhere public and use a custom slack
integration to use the commands from Slack. We use heroku and there is an
app.json file in the repo that you can use to set up your own.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/revelrylabs/timekeeper. Check out [CONTRIBUTING.md](https://github.com/revelrylabs/timekeeper/blob/master/CONTRIBUTING.md) for more info.

Everyone is welcome to participate in the project. We expect contributors to
adhere the Contributor Covenant Code of Conduct (see [CODE_OF_CONDUCT.md](https://github.com/revelrylabs/timekeeper/blob/master/CODE_OF_CONDUCT.md)).
