defmodule LIWords.Repo.Migrations.AddGames do
  use Ecto.Migration

  def change do
    create table(:phx_crosswords_games) do
      add :uuid, :uuid
      add :going, :boolean
      add :in_app, :boolean
      add :repr, :map
      add :realm, :string

      add :board_id, references(:phx_crosswords_boards)
      add :lexicon_id, references(:base_lexicon)
      add :creator_id, references(:auth_user)
      add :user1_id, references(:auth_user)
      add :user2_id, references(:auth_user)

      timestamps()
    end

    create index("phx_crosswords_games", [:uuid])
  end
end
