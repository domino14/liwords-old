defmodule LIWords.Repo.Migrations.AddGameUserNicks do
  use Ecto.Migration

  def change do
    alter table(:phx_crosswords_games) do
      add :user1_nick, :string, null: false, default: ""
      add :user2_nick, :string, null: false, default: ""
    end
  end
end
