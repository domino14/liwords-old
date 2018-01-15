use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :liwords, LIWordsWeb.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :liwords, LIWords.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "pass",
  database: "liwords_test",
  hostname: "pgdb",
  pool: Ecto.Adapters.SQL.Sandbox
