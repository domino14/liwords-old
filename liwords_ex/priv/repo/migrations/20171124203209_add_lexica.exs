defmodule LIWords.Repo.Migrations.AddLexica do
  use Ecto.Migration

  def change do
    if Mix.env == :test do
      # This is a "fake" migration, as this is an Aerolith table already.
      create table(:base_lexicon) do
        add :lexiconName, :string
      end
    end
  end
end
