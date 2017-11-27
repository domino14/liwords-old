defmodule LIWords.Repo.Migrations.CreateBoards do
  use Ecto.Migration

  def change do
    create table(:boards) do
      add :board_repr, :string
      add :tiles_repr, :string
      add :hash, :string
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:boards, [:user_id])
  end
end
