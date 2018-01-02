defmodule LIWords.Repo.Migrations.CreateBoards do
  use Ecto.Migration

  def change do
    create table(:phx_crosswords_boards) do
      add :board_repr, :text
      add :tiles_repr, :text
      add :hash, :string
      add :user_id, references(:auth_user)

      timestamps(type: :timestamptz)
    end

  end
end
