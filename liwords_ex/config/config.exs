# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :liwords,
  namespace: LIWords,
  ecto_repos: [LIWords.Repo]

# Configures the endpoint
config :liwords, LIWordsWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "u4cphMtcCFPtARGBZdRhf+QvShxWvWreMYX4mPvEuea+DE5AM6poHUd0//BOjJbG",
  render_errors: [view: LIWordsWeb.ErrorView, accepts: ~w(json), format: "json"],
  pubsub: [name: LIWords.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :liwords,
  jwt_secret: System.get_env("DJANGO_SECRET_KEY")

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
