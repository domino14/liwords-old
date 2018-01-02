defmodule LIWords.Repo.Migrations.CreateComments do
  use Ecto.Migration

  def change do
    create table(:phx_crosswords_comments) do
      add :uuid, :uuid
      add :comment, :text
      add :turn_num, :integer
      add :user_id, references(:auth_user)
      add :game_id, references(:phx_crosswords_games)

      timestamps()
    end

    create index("phx_crosswords_comments", [:uuid])
  end
end



